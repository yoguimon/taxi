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
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idUsuario")
    private byte idUsuario;
    @Column(name="correo")
    private String correo;
    @Column(name="password")
    private String password;
    @Column(name="rol")
    private String rol;
    @Column(name="idConductor")
    private Long idConductor;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fechaRegistro")
    private LocalDateTime fechaRegistro;
    @UpdateTimestamp
    @Column(name="fechaActualizacion")
    private LocalDateTime fechaActualizacion;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "usuario")
    private List<Pago> pagos;
    public Usuario() {
    }

    public Usuario(String correo, String password, String rol, byte estado) {
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.estado = estado;
    }

    public Usuario(byte idUsuario, String correo, String password, String rol, byte estado) {
        this.idUsuario = idUsuario;
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.estado = estado;
    }

    public Usuario(byte idUsuario, String correo, String password) {
        this.idUsuario = idUsuario;
        this.correo = correo;
        this.password = password;
    }
}
