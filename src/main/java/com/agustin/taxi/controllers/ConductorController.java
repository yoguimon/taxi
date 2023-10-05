package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.ConductorDaoImp;
import com.agustin.taxi.dto.DtoConductorVehiculo;
import com.agustin.taxi.models.Conductor;
import com.agustin.taxi.models.ConductorVehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConductorController {
    @Autowired
    private ConductorDaoImp conductorDaoImp;
    @GetMapping("api/conductores")
    public List<Conductor> obtenerConductores(){
        return conductorDaoImp.getTodos();
    }
    @GetMapping("api/conductores/vehiculos/{id}")
    public List<ConductorVehiculo> obtenerVehiculosDeConductores(@PathVariable Byte id){
        return conductorDaoImp.getTodosVehiculosXID(id);
    }
    @PostMapping("api/conductores")
    public void registrarConductor(@RequestBody DtoConductorVehiculo request){
        conductorDaoImp.crearConductor(request);
    }
    @GetMapping("api/conductores/{id}")
    public Conductor getConductor(@PathVariable Long id){
        return conductorDaoImp.getPersona(id);
    }
    @PutMapping("api/conductores")
    public void setConductor(@RequestBody Conductor conductor){
        conductorDaoImp.modificar(conductor);
    }
    @DeleteMapping("api/conductores/{id}")
    public void deleteConductor(@PathVariable Long id){
        conductorDaoImp.eliminar(id);
    }
}
