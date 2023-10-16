package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.ConductorDaoImp;
import com.agustin.taxi.dao.ServicioDaoImp;
import com.agustin.taxi.dto.DtoConductorVehiculo;
import com.agustin.taxi.dto.DtoMulta;
import com.agustin.taxi.models.Conductor;
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
    @GetMapping("api/multas/{id}")
    public List<Servicio> getMultasXId(@PathVariable Byte id){
        return servicioDaoImp.getMultasXid(id);
    }
}
