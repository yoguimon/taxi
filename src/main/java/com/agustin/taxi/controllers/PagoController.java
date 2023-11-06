package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.PagoDaoImp;
import com.agustin.taxi.dao.ServicioDaoImp;
import com.agustin.taxi.dto.DtoPagar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PagoController {
    @Autowired
    private PagoDaoImp pagoDaoImp;
    @PostMapping("/pagar")
    public int agregarPago(@RequestBody DtoPagar dtoPagar){
        return pagoDaoImp.registrarPago(dtoPagar);
    }
    @GetMapping("/pagar/reporte/{id}")
    public ResponseEntity<Resource> getReportrPdf(@PathVariable int id){
        return pagoDaoImp.reportePdf(id);
    }

    @GetMapping("/pagar/prueba")
    public ResponseEntity<Resource> prueba(){
        return pagoDaoImp.reportePdf(6);
    }
}
