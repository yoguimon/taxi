package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoVehiculo;
import com.agustin.taxi.models.Conductor;
import com.agustin.taxi.models.Vehiculo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class VehiculoDaoImp implements CrudDao<Vehiculo>{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Vehiculo> getTodos() {
        return null;
    }

    @Override
    public void eliminar(Long id) {
        Vehiculo vehiculo = entityManager.find(Vehiculo.class,id);
        vehiculo.setEstado((byte)0);
        entityManager.merge(vehiculo);
    }

    @Override
    public void crear(Vehiculo vehiculo) {

    }

    @Override
    public Vehiculo getPersona(Long id) {
        return entityManager.find(Vehiculo.class,id);
    }

    @Override
    public void modificar(Vehiculo vehiculo) {
        entityManager.merge(vehiculo);
    }

    public void crearVehiculo(DtoVehiculo request) {
        Conductor conductor=request.getConductor();
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setConductor(conductor);
        vehiculo.setPlaca(request.getPlaca());
        vehiculo.setMarca(request.getMarca());
        vehiculo.setColor(request.getColor());
        vehiculo.setTipo(request.getTipo());
        vehiculo.setEstado((byte) 1);
        entityManager.persist(vehiculo);
    }
}
