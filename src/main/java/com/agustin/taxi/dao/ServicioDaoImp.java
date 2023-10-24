package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoFrecuencia;
import com.agustin.taxi.dto.DtoJsonFrecuencia;
import com.agustin.taxi.dto.DtoMulta;
import com.agustin.taxi.models.MultaResponse;
import com.agustin.taxi.models.Conductor;
import com.agustin.taxi.models.ConductorAux;
import com.agustin.taxi.models.Servicio;
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
        servicio.setPlaca(request.getPlaca());
        servicio.setEstado((byte)1);
        entityManager.persist(servicio);
    }

    public List<Servicio> getMultasXid(DtoJsonFrecuencia json) {
        Conductor conductor =entityManager.find(Conductor.class,json.getIdConductor());
        String placa=json.getPlaca();
        String query = "FROM Servicio WHERE conductor = :conductor AND nombre='multa' AND placa=:placa AND estado=1";
        List<Servicio> lista = entityManager.createQuery(query)
                .setParameter("conductor",conductor)
                .setParameter("placa",placa)
                .getResultList();
        return lista;
    }

    public List<Servicio> getMultadoXNombre(String nombre) {
        String query = "SELECT C.idConductor,CONCAT(C.nombre,' ',C.primerApellido,' ',C.segundoApellido),V.placa\n" +
                "FROM conductor C \n" +
                "\tINNER JOIN vehiculo V ON C.idConductor=V.idConductor\n" +
                "WHERE CONCAT(C.nombre,' ',C.primerApellido,' ',C.segundoApellido) LIKE :nombre AND C.estado=1";
        List<Servicio> resultado = entityManager.createNativeQuery(query)
                .setParameter("nombre","%" + nombre + "%")
                .getResultList();
        return resultado;
    }

    public MultaResponse getMulta(byte id) {
        String query="SELECT S.idServicio, S.idConductor, CONCAT(C.nombre,' ',C.primerApellido,' ',C.segundoApellido), " +
                "S.costo, S.tipo, S.placa " +
                "FROM servicio S " +
                "INNER JOIN conductor C ON S.idConductor=C.idConductor " +
                "WHERE S.idServicio=:idServicio AND S.nombre='multa'";

        List<Object[]> resultList = entityManager.createNativeQuery(query)
                .setParameter("idServicio", id)
                .getResultList();

        if (resultList.isEmpty()) {
            return null;
        }

        Object[] row = resultList.get(0);

        MultaResponse multaResponse = new MultaResponse();
        multaResponse.setIdServicio(((byte) row[0]));
        multaResponse.setIdConductor(((short) row[1]));
        multaResponse.setNombre((String) row[2]);
        multaResponse.setCosto(((double) row[3]));
        multaResponse.setTipo((String) row[4]);
        multaResponse.setPlaca((String) row[5]);

        return multaResponse;
    }

    public void editarMulta(DtoMulta request) {
        Servicio ser = entityManager.find(Servicio.class,request.getIdServicio());
        ser.setTipo(request.getTipo());
        ser.setCosto(request.getCosto());
        entityManager.merge(ser);
    }

    public void deleteMulta(byte id) {
        Servicio servicio=entityManager.find(Servicio.class,id);
        servicio.setEstado((byte)0);
        entityManager.merge(servicio);
    }

    public void crearFrecuencia(DtoFrecuencia request) {
        Servicio servicio = new Servicio();
        Conductor conductor = entityManager.find(Conductor.class,request.getIdConductor());
        servicio.setConductor(conductor);
        servicio.setNombre(request.getNombre());
        servicio.setCosto(request.getCosto());
        servicio.setTipo(request.getTipo());
        servicio.setPlaca(request.getPlaca());
        servicio.setFechaInicio(request.getFechaInicio());
        servicio.setFechaFin(request.getFechaFin());
        servicio.setEstado((byte)1);
        entityManager.persist(servicio);
    }

    public List<Servicio> getFrecuenciasXid(DtoJsonFrecuencia json) {
        Conductor conductor =entityManager.find(Conductor.class,json.getIdConductor());
        String placa=json.getPlaca();
        String query = "FROM Servicio WHERE conductor = :conductor AND nombre='frecuencia' AND placa=:placa AND estado=1";
        List<Servicio> lista = entityManager.createQuery(query)
                .setParameter("conductor",conductor)
                .setParameter("placa",placa)
                .getResultList();
        return lista;
    }

    public List<Servicio> getMultasDelConductor(Long id) {
        Conductor conductor = entityManager.find(Conductor.class,id);
        String query = "FROM Servicio WHERE conductor = :conductor AND nombre='multa' AND estado=1";
        List<Servicio> lista = entityManager.createQuery(query)
                .setParameter("conductor",conductor)
                .getResultList();
        return lista;
    }

    public List<Servicio> getFrecuenciasDelConductor(Long id) {
        Conductor conductor = entityManager.find(Conductor.class,id);
        String query = "FROM Servicio WHERE conductor = :conductor AND nombre='frecuencia' AND estado=1";
        List<Servicio> lista = entityManager.createQuery(query)
                .setParameter("conductor",conductor)
                .getResultList();
        return lista;
    }
}
