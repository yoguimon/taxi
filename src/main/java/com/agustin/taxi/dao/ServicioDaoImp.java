package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoMulta;
import com.agustin.taxi.models.Conductor;
import com.agustin.taxi.models.ConductorAux;
import com.agustin.taxi.models.Servicio;
import com.agustin.taxi.models.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class ServicioDaoImp {
    @PersistenceContext
    EntityManager entityManager;
    public List<ConductorAux> getTodosMultados() {
        String query = "SELECT C.idConductor,CONCAT(C.nombre,' ',C.primerApellido,' ',C.segundoApellido),V.placa\n" +
                "FROM conductor C \n" +
                "\tINNER JOIN vehiculo V ON C.idConductor=V.idConductor\n" +
                "WHERE C.estado=1;";
        List<ConductorAux> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    public void crearMulta(DtoMulta request) {
        Servicio servicio = new Servicio();
        Conductor conductor = entityManager.find(Conductor.class,request.getIdConductor());
        servicio.setConductor(conductor);
        servicio.setNombre(request.getNombre());
        servicio.setCosto(request.getCosto());
        servicio.setTipo(request.getTipo());
        servicio.setEstado((byte)1);
        entityManager.persist(servicio);
    }

    public List<Servicio> getMultasXid(Byte id) {
        Conductor conductor =entityManager.find(Conductor.class,id);
        String query = "FROM Servicio WHERE conductor = :conductor";
        List<Servicio> lista = entityManager.createQuery(query)
                .setParameter("conductor",conductor)
                .getResultList();
        return lista;
    }
}
