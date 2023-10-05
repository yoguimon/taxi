package com.agustin.taxi.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="vehiculo")
public class Vehiculo {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idVehiculo")
    private Long idVehiculo;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idConductor", referencedColumnName = "idConductor")
    private Conductor conductor;
    @Column(name="placa")
    private String placa;
    @Column(name="marca")
    private String marca;
    @Column(name="color")
    private String color;
    @Column(name="tipo")
    private String tipo;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fechaRegistro")
    private LocalDateTime fechaRegistro;
    @UpdateTimestamp
    @Column(name="fechaActualizacion")
    private LocalDateTime fechaActualizacion;

}
