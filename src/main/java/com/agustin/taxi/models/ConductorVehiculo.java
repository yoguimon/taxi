package com.agustin.taxi.models;

import lombok.Data;

@Data
public class ConductorVehiculo {
    private byte idVehiculo;
    private byte idConductor;
    private String placa;
    private String marca;
    private String color;
    private String tipo;

    public ConductorVehiculo(byte idVehiculo, byte idConductor, String placa, String marca, String color, String tipo) {
        this.idVehiculo = idVehiculo;
        this.idConductor = idConductor;
        this.placa = placa;
        this.marca = marca;
        this.color = color;
        this.tipo = tipo;
    }
}
