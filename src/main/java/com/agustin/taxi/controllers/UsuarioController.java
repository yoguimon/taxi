package com.agustin.taxi.controllers;
import com.agustin.taxi.dao.UsuarioDaoImp;
import com.agustin.taxi.models.Usuario;
import com.agustin.taxi.util.EmailUtil;
import com.agustin.taxi.util.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDaoImp usuarioDaoImp;
    @Autowired
    private EmailUtil emailUtil;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)//revisar si el metodo es util
    public List<String> login(@RequestBody Usuario usuario){
        List<String> res = new ArrayList<>();
        Usuario usuarioLogeado= usuarioDaoImp.verificarUsuario(usuario);

        if(usuarioLogeado!=null){
            String id = usuarioLogeado.getIdUsuario()+"";
            String tokenJwt = jwtUtil.create(id,usuarioLogeado.getCorreo());
            res.add(tokenJwt);
            String rol = usuarioLogeado.getRol();
            res.add(rol);
            res.add(usuarioLogeado.getIdConductor()+"");
            return res;
        }
        return res;
    }
    @PostMapping("api/usuarios")
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDaoImp.crear(usuario);
    }
    @PostMapping("api/usuarios/verificar")
    public String getRespuestaUsuario(@RequestBody Usuario usuario){
        if(usuarioDaoImp.getEmp(usuario)){
            return "nuevo";
        }else{
            return "viejo";
        }

    }
    @PostMapping(value = "api/usuarios/password")
    public String insertPassword(@RequestBody Usuario usuario){
        String pass = usuario.getPassword().toString().trim();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,pass);

        usuario.setPassword(hash);
        if(usuarioDaoImp.insertPass(usuario)){
            return "exito";
        }else{
            return "fail";
        }
    }
    @PostMapping("api/usuarios/verificarEmail")
    public String existeCorreo(@RequestBody Map<String, String> requestData) throws MessagingException {
        String email=requestData.get("email");
        if(usuarioDaoImp.verificarSiExiste(email)){
            emailUtil.sendPasswordEmail(email);
            return "existe";
        }else{
            return "fail";
        }
    }

    @PostMapping(value = "api/usuarios/passwordXcorreo")//inserto la pass nuevo que lo realize con envio de email
    public String insertPasswordXCorreo(@RequestBody Usuario usuario){
        String pass = usuario.getPassword().toString().trim();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,pass);

        usuario.setPassword(hash);
        if(usuarioDaoImp.insertPass(usuario)){
            return "exito";
        }else{
            return "fail";
        }
    }
}
