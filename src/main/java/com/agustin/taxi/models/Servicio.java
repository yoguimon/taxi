package com.agustin.taxi.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    @Column(name="placa")
    private String placa;
    @Column(name="fechaInicio")
    private LocalDate fechaInicio;
    @Column(name="fechaFin")
    private LocalDate fechaFin;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fechaCreacion")
    private LocalDateTime fechaCreacion;
    @UpdateTimestamp
    @Column(name="fechaActualizacion")
    private LocalDateTime fechaActualizacion;
    @ManyToMany
    @JoinTable(
            name = "detalle",
            joinColumns = @JoinColumn(name = "idServicio"),
            inverseJoinColumns = @JoinColumn(name = "idPago")
    )
    private List<Pago> pagos;
    public Servicio() {
    }

    public Servicio(Long idServicio, Conductor conductor, String nombre, double costo, String tipo, String placa, byte estado, LocalDateTime fechaCreacion, LocalDateTime fechaActualizacion) {
        this.idServicio = idServicio;
        this.conductor = conductor;
        this.nombre = nombre;
        this.costo = costo;
        this.tipo = tipo;
        this.placa = placa;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public Servicio(Long idServicio, Conductor conductor, String nombre, double costo, String tipo, String placa, byte estado) {
        this.idServicio = idServicio;
        this.conductor = conductor;
        this.nombre = nombre;
        this.costo = costo;
        this.tipo = tipo;
        this.placa = placa;
        this.estado = estado;
    }

    public Servicio(Long idServicio, String nombre, double costo, String tipo, String placa) {
        this.idServicio = idServicio;
        this.nombre = nombre;
        this.costo = costo;
        this.tipo = tipo;
        this.placa = placa;
    }
}
