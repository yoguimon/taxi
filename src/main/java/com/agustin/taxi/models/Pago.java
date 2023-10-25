package com.agustin.taxi.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name="pago")
public class Pago {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idPago")
    private Long idPago;
    @Column(name="fecha")
    private LocalDate fecha;
    @Column(name="monto")
    private double monto;
    @Column(name="metodo")
    private String metodo;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    private Usuario usuario;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idConductor", referencedColumnName = "idConductor")
    private Conductor conductor;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "detalle",
            joinColumns = @JoinColumn(name = "idPago"),
            inverseJoinColumns = @JoinColumn(name = "idServicio")
    )
    private List<Servicio> servicios;
}
