package com.agustin.taxi.dto;

import lombok.Data;

@Data
public class DtoConductorVehiculo {
    private String nombre;
    private String primerApellido;
    private String segundoApellido;
    private String telefono;
    private String numLicencia;
    private String rol;
    private String placa;
    private String marca;
    private String color;
    private String tipo;

    public DtoConductorVehiculo() {
    }

    public DtoConductorVehiculo(String nombre, String primerApellido, String segundoApellido, String telefono, String numLicencia, String rol, String placa, String marca, String color, String tipo) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.telefono = telefono;
        this.numLicencia = numLicencia;
        this.rol = rol;
        this.placa = placa;
        this.marca = marca;
        this.color = color;
        this.tipo = tipo;
    }
}
