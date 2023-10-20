package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.ServicioDaoImp;
import com.agustin.taxi.dto.DtoMulta;
import com.agustin.taxi.models.MultaResponse;
import com.agustin.taxi.models.ConductorAux;
import com.agustin.taxi.models.Servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class MultadoController {
    @Autowired
    private ServicioDaoImp servicioDaoImp;
    @GetMapping("api/multados")
    public List<ConductorAux> getConductoresMultados(){
        return servicioDaoImp.getTodosMultados();
    }
    @PostMapping("api/multados")
    public void registrarMulta(@RequestBody DtoMulta request){
        servicioDaoImp.crearMulta(request);
    }
    @GetMapping("api/multas/{id}")//idConductor
    public List<Servicio> getMultasXId(@PathVariable Byte id){
        return servicioDaoImp.getMultasXid(id);
    }
    @GetMapping("api/multados/nombre/{nombre}")
    public List<Servicio> getMultadoXNombre(@PathVariable String nombre){
        return servicioDaoImp.getMultadoXNombre(nombre);
    }
    @GetMapping("api/multa/{id}")//idServicio
    public MultaResponse getMulta(@PathVariable byte id){
        MultaResponse mr=servicioDaoImp.getMulta(id);
        System.out.println("RES:"+mr);
        return mr;
    }
    @PutMapping("api/multas")
    public void setMulta(@RequestBody DtoMulta request){
        servicioDaoImp.editarMulta(request);
    }
    @DeleteMapping("api/multas/{id}")
    public void eliminarMulta(@PathVariable byte id){
        servicioDaoImp.deleteMulta(id);
    }
}
