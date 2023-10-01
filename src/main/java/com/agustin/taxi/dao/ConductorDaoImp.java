package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoConductorVehiculo;
import com.agustin.taxi.models.ConductorVehiculo;
import com.agustin.taxi.models.Usuario;
import com.agustin.taxi.models.Vehiculo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import com.agustin.taxi.models.Conductor;
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
                "FROM conductor";
        List<Conductor> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {

    }

    @Override
    public void crear(Conductor conductor) {

    }

    @Override
    public Conductor getPersona(Long id) {
        return null;
    }

    @Override
    public void modificar(Conductor conductor) {

    }

    public List<ConductorVehiculo> getTodosVehiculosXID(Byte id) {
        String query = "SELECT V.idVehiculo,V.idConductor,V.placa,V.marca,V.color,V.tipo\n" +
                "FROM vehiculo V\n" +
                "WHERE V.idConductor=:id";
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
        usuario.setLogin(request.getNumLicencia());
        usuario.setPassword(request.getNumLicencia());
        usuario.setRol(request.getRol());
        usuario.setEstado((byte)1);
        entityManager.persist(usuario);
    }
}
