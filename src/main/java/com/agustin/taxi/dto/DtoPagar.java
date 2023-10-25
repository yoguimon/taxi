package com.agustin.taxi.dto;

import lombok.Data;

import java.util.List;

@Data
public class DtoPagar {
    private int idConductor;
    private int idUsuario;
    private List<String> servicios;
    private List<Double> costos;
    private double total;
    private String metodo;

}
