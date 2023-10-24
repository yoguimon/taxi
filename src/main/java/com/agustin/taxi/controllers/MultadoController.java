package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.ServicioDaoImp;
import com.agustin.taxi.dto.DtoFrecuencia;
import com.agustin.taxi.dto.DtoJsonFrecuencia;
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
    @GetMapping("api/multas/pagar/{id}")
    public List<Servicio> getMultasDelConductor(@PathVariable Long id){
        return servicioDaoImp.getMultasDelConductor(id);
    }
    @GetMapping("api/frecuencias/pagar/{id}")
    public List<Servicio> getFrecuenciasDelConductor(@PathVariable Long id){
        return servicioDaoImp.getFrecuenciasDelConductor(id);
    }
    @PostMapping("api/multados")
    public void registrarMulta(@RequestBody DtoMulta request){
        servicioDaoImp.crearMulta(request);
    }
    @PostMapping("api/frecuencias")
    public void registrarFrecuencia(@RequestBody DtoFrecuencia request){
        servicioDaoImp.crearFrecuencia(request);
    }
    @PostMapping("api/multas/conductor")//idConductor
    public List<Servicio> getMultasXId(@RequestBody DtoJsonFrecuencia json){
        return servicioDaoImp.getMultasXid(json);
    }
    @PostMapping("api/frecuencias/conductor")//idConductor
    public List<Servicio> getFrecuenciasXId(@RequestBody DtoJsonFrecuencia json){
        return servicioDaoImp.getFrecuenciasXid(json);
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
