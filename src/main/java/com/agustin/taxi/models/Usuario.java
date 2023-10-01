package com.agustin.taxi.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idUsuario")
    private byte idUsuario;
    @Column(name="login")
    private String login;
    @Column(name="password")
    private String password;
    @Column(name="rol")
    private String rol;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fechaRegistro")
    private LocalDateTime fechaRegistro;
    @UpdateTimestamp
    @Column(name="fechaActualizacion")
    private LocalDateTime fechaActualizacion;
}
