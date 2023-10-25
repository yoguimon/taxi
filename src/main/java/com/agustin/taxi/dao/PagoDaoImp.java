package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoPagar;
import com.agustin.taxi.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class PagoDaoImp {
    @PersistenceContext
    EntityManager entityManager;

    public void registrarPago(DtoPagar dtoPagar) {
        Pago pago = new Pago();
        pago.setFecha(LocalDate.now());
        pago.setMonto(dtoPagar.getTotal());
        pago.setMetodo("metodo");
        Usuario usuario = entityManager.find(Usuario.class,dtoPagar.getIdUsuario());
        Conductor conductor = entityManager.find(Conductor.class,dtoPagar.getIdConductor());
        pago.setUsuario(usuario);
        pago.setConductor(conductor);
        entityManager.persist(pago);

        List<Servicio> servicios = new ArrayList<>();
        for (int i=0;i<dtoPagar.getServicios().size();i++){
            Servicio servicio = entityManager.find(Servicio.class,dtoPagar.getServicios().get(i));
            servicio.setEstado((byte) 0);
            servicios.add(servicio);
        }
        for (int j=0;j<servicios.size();j++){
            Detalle detalle = new Detalle();
            detalle.setPago(pago);
            detalle.setServicio(servicios.get(j));
            detalle.setCantidad(1);
            detalle.setPrecioUnitario(dtoPagar.getCostos().get(j));
            entityManager.persist(detalle);
        }

    }
}
