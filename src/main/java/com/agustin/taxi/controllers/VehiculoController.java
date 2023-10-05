package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.VehiculoDaoImp;
import com.agustin.taxi.dto.DtoConductorVehiculo;
import com.agustin.taxi.dto.DtoVehiculo;
import com.agustin.taxi.models.Conductor;
import com.agustin.taxi.models.Vehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class VehiculoController {
    @Autowired
    private VehiculoDaoImp vehiculoDaoImp;
    @PostMapping("api/vehiculos")
    public void registrarVehiculo(@RequestBody DtoVehiculo request){
        vehiculoDaoImp.crearVehiculo(request);
    }
    @GetMapping("api/vehiculos/{id}")
    public Vehiculo getVehiculo(@PathVariable Long id){
        return vehiculoDaoImp.getPersona(id);
    }
    @DeleteMapping("api/vehiculos/{id}")
    public void deleteVehiculo(@PathVariable Long id){
        vehiculoDaoImp.eliminar(id);
    }
    @PutMapping("api/vehiculos")
    public void setVehiculo(@RequestBody Vehiculo vehiculo){
        vehiculoDaoImp.modificar(vehiculo);
    }
}
