package com.agustin.taxi.models;

import lombok.Data;

@Data
public class MultaResponse {
    private byte idServicio;
    private short idConductor;
    private String nombre;
    private double costo;
    private String tipo;
    private String placa;
}
