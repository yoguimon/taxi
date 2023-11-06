package com.agustin.taxi.dao;

import com.agustin.taxi.dto.DtoPagar;
import com.agustin.taxi.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.List;

@Repository
@Transactional
public class PagoDaoImp {
    @PersistenceContext
    EntityManager entityManager;

    public int registrarPago(DtoPagar dtoPagar) {
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
        return pago.getIdPago();

    }
    public List<Object[]> serviciosPagados(int id){
        String query = "SELECT S.idServicio,S.nombre,S.tipo, CASE \n" +
                "        WHEN S.nombre = 'frecuencia' THEN CONCAT(S.fechaInicio, ' a ', S.fechaFin)\n" +
                "        ELSE S.fechaCreacion\n" +
                "    END AS fecha,S.costo,P.fecha\n" +
                "FROM servicio S\n" +
                "\tINNER JOIN detalle D ON S.idServicio=D.idServicio\n" +
                "    INNER JOIN pago P ON D.idPago=P.idPago\n" +
                "WHERE P.idPago=:id";

        List<Object[]> resultado = entityManager.createNativeQuery(query)
                .setParameter("id", id)
                .getResultList();

        return resultado;
    }
    public Object[] datosConductor(int id){
        String query = "SELECT P.idPago,CONCAT(C.nombre,' ',C.primerApellido,' ',C.segundoApellido),\n" +
                "\t\tC.numLicencia,CONCAT('Admin',P.idUsuario),DATE(P.fecha)\n" +
                "FROM pago P\n" +
                "\tINNER JOIN conductor C ON P.idConductor=C.idConductor\n" +
                "WHERE P.idPago=:id";
        List<Object[]> resultado = entityManager.createNativeQuery(query)
                .setParameter("id", id)
                .getResultList();
        return resultado.get(0);
    }

    public ResponseEntity<Resource> reportePdf(int id) {
        List<Object[]> pagados = serviciosPagados(id);
        Object[] datosConductor=datosConductor(id);
        double total=0;
        try {
            final File file = ResourceUtils.getFile("classpath:reportes/reportePagoServicios.jasper");
            final File imgLogo = ResourceUtils.getFile("classpath:imagenes/LOGO JAIME ZUDAÑES.png");
            final JasperReport report = (JasperReport) JRLoader.loadObject(file);

            HashMap<String, Object> parameters = new HashMap<>();
            parameters.put("logo", new FileInputStream(imgLogo));

            List<Map<String, Object>> dataServiciosPagados = new ArrayList<>();
            int cont=1;
            for (Object[] pagado : pagados) {
                Map<String, Object> map = new HashMap<>();
                map.put("cont", cont);
                map.put("servicio", pagado[1]+"");
                map.put("descripcion", pagado[2]+"");
                map.put("fecha", pagado[3]+"");
                map.put("costo", pagado[4]+"");
                total = total+ Double.parseDouble(pagado[4]+"");
                dataServiciosPagados.add(map);
                cont++;
            }
            JRBeanCollectionDataSource dataSourcePagados = new JRBeanCollectionDataSource(dataServiciosPagados);
            parameters.put("dsTablaPagos", dataSourcePagados);

            Date fechaA = new Date();
            SimpleDateFormat formato = new SimpleDateFormat("d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
            String fechaActual = formato.format(fechaA);
            Date fechaP = (Date) datosConductor[4];
            String fechaPago = formato.format(fechaP);

            parameters.put("nombre",datosConductor[1]+"");
            parameters.put("nrolicencia",datosConductor[2]+"");
            parameters.put("nro",datosConductor[0]+"");
            parameters.put("fechaactual",fechaActual);
            parameters.put("fechapago", fechaPago);
            parameters.put("usuario",datosConductor[3]+"");
            parameters.put("total",total+"");

            JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
            byte[] reporte = JasperExportManager.exportReportToPdf(jasperPrint);
            String sdf = (new SimpleDateFormat("dd/MM/yyyy")).format(new Date());//para la fecha
            StringBuilder stringBuilder = new StringBuilder().append("InvoicePDF:");
            ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                    .filename(stringBuilder.append((1))
                            .append("generateDate:")
                            .append(sdf)
                            .append(".pdf")
                            .toString())
                    .build();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(contentDisposition);
            return ResponseEntity.ok().contentLength((long)reporte.length)
                    .contentType(MediaType.APPLICATION_PDF)
                    .headers(headers).body(new ByteArrayResource(reporte));
        }catch (Exception ex){
            ex.printStackTrace();
        }
        //ResponseEntity.noContent().build();
        return null;
    }
}
