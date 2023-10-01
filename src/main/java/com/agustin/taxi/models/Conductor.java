package com.agustin.taxi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="conductor")
public class Conductor {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idConductor")
    private Long idConductor;
    @Column(name="nombre")
    private String nombre;
    @Column(name="primerApellido")
    private String primerApellido;
    @Column(name="segundoApellido")
    private String segundoApellido;
    @Column(name="telefono")
    private String telefono;
    @Column(name="numLicencia")
    private String numLicencia;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fechaCreacion")
    private LocalDateTime fechaCreacion;
    @UpdateTimestamp
    @Column(name="fechaActualizacion")
    private LocalDateTime fechaActualizacion;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "conductor") //importante, mapea con lugar PONE TODOS LOS DATOS DEL lugar DE ESTE CLIENTE
    private List<Vehiculo> vehiculos;


}
