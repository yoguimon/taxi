package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoConductorVehiculo;
import com.agustin.taxi.dto.DtoMulta;
import com.agustin.taxi.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class ConductorDaoImp implements CrudDao<Conductor>{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Conductor> getTodos() {
        String query = "SELECT idConductor,nombre,primerApellido,segundoApellido,telefono,numLicencia\n" +
                "FROM conductor WHERE estado=1;";
        List<Conductor> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Conductor conductor = entityManager.find(Conductor.class,id);
        conductor.setEstado((byte)0);
        entityManager.merge(conductor);
    }

    @Override
    public void crear(Conductor conductor) {

    }

    @Override
    public Conductor getPersona(Long id) {
        Conductor conductor = entityManager.find(Conductor.class,id);
        return conductor;
    }

    @Override
    public void modificar(Conductor conductor) {
        Conductor viejo = entityManager.find(Conductor.class,conductor.getIdConductor());
        viejo.setNombre(conductor.getNombre());
        viejo.setPrimerApellido(conductor.getPrimerApellido());
        viejo.setSegundoApellido(conductor.getSegundoApellido());
        viejo.setTelefono(conductor.getTelefono());
        viejo.setNumLicencia(conductor.getNumLicencia());
        //viejo.setCorreo(conductor.getCorreo());
        viejo.setEstado((byte)1);
        entityManager.merge(viejo);
    }

    public List<ConductorVehiculo> getTodosVehiculosXID(Byte id) {
        String query = "SELECT V.idVehiculo,V.idConductor,V.placa,V.marca,V.color,V.tipo\n" +
                "FROM vehiculo V\n" +
                "WHERE V.idConductor=:id AND V.estado=1;";
        List<ConductorVehiculo> resultado = entityManager.createNativeQuery(query)
                .setParameter("id",id)
                .getResultList();
        return resultado;
    }

    public void crearConductor(DtoConductorVehiculo request) {
        Conductor conductor = new Conductor();
        conductor.setNombre(request.getNombre());
        conductor.setPrimerApellido(request.getPrimerApellido());
        conductor.setSegundoApellido(request.getSegundoApellido());
        conductor.setTelefono(request.getTelefono());
        conductor.setNumLicencia(request.getNumLicencia());
        conductor.setCorreo(request.getCorreo());
        conductor.setEstado((byte)1);
        entityManager.persist(conductor);
        String query ="INSERT INTO vehiculo(idConductor,placa,marca,color,tipo,estado)\n" +
                "\tVALUES(:idConductor,:placa,:marca,:color,:tipo,:estado);";
        Query insertQuery = entityManager.createNativeQuery(query)
                .setParameter("idConductor",conductor.getIdConductor())
                .setParameter("placa",request.getPlaca())
                .setParameter("marca",request.getMarca())
                .setParameter("color",request.getColor())
                .setParameter("tipo",request.getTipo())
                .setParameter("estado",1);

        insertQuery.executeUpdate();
        Usuario usuario = new Usuario();
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(request.getNumLicencia());
        usuario.setRol(request.getRol());
        usuario.setIdConductor(conductor.getIdConductor());
        usuario.setEstado((byte)1);
        entityManager.persist(usuario);
    }


    public List<Conductor> getConductorXNombre(String nombre) {
        String query = "SELECT idConductor,CONCAT(nombre,' ',primerApellido,' ',segundoApellido),telefono,numLicencia\n" +
                "FROM conductor WHERE CONCAT(nombre,' ',primerApellido,' ',segundoApellido) LIKE :nombre AND estado=1;";
        List<Conductor> resultado = entityManager.createNativeQuery(query)
                .setParameter("nombre","%" + nombre + "%")
                .getResultList();
        return resultado;
    }
}
