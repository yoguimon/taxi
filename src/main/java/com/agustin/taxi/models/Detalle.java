package com.agustin.taxi.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name="detalle")
public class Detalle {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idDetalle")
    private Long idDetalle;
    @ManyToOne
    @JoinColumn(name = "idPago")
    private Pago pago;
    @ManyToOne
    @JoinColumn(name = "idServicio")
    private Servicio servicio;
    @Column(name="cantidad")
    private int cantidad;
    @Column(name="precioUnitario")
    private double precioUnitario;
}
