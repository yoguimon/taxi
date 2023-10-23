package com.agustin.taxi.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DtoFrecuencia {
    private int idConductor;
    private String nombre;
    private double costo;
    private String tipo;
    private String placa;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
