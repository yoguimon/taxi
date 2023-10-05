package com.agustin.taxi.dto;

import com.agustin.taxi.models.Conductor;
import lombok.Data;

@Data
public class DtoVehiculo {
    private Conductor conductor;
    private  String placa;
    private String marca;
    private String color;
    private String tipo;

    public DtoVehiculo(Conductor conductor, String placa, String marca, String color, String tipo) {
        this.conductor = conductor;
        this.placa = placa;
        this.marca = marca;
        this.color = color;
        this.tipo = tipo;
    }
}
