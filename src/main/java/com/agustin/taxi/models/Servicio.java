package com.agustin.taxi.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="servicio")
public class Servicio {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idServicio")
    private Long idServicio;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idConductor", referencedColumnName = "idConductor")
    private Conductor conductor;
    @Column(name="nombre")
    private String nombre;
    @Column(name="costo")
    private double costo;
    @Column(name="tipo")
    private String tipo;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fechaCreacion")
    private LocalDateTime fechaCreacion;
    @UpdateTimestamp
    @Column(name="fechaActualizacion")
    private LocalDateTime fechaActualizacion;
}
