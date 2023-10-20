package com.agustin.taxi.dto;

import lombok.Data;

@Data
public class DtoMulta {
    private int idServicio;
    private int idConductor;
    private String nombre;
    private double costo;
    private String tipo;
    private String placa;

    public DtoMulta() {
    }

    public DtoMulta(int idConductor, String nombre, double costo, String tipo, String placa) {
        this.idConductor = idConductor;
        this.nombre = nombre;
        this.costo = costo;
        this.tipo = tipo;
        this.placa=placa;
    }

    public DtoMulta(int idServicio, int idConductor) {
        this.idServicio = idServicio;
        this.idConductor = idConductor;
    }

    public DtoMulta(int idServicio, int idConductor, String nombre, double costo, String tipo,String placa) {
        this.idServicio = idServicio;
        this.idConductor = idConductor;
        this.nombre = nombre;
        this.costo = costo;
        this.tipo = tipo;
        this.placa=placa;
    }
}
