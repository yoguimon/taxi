package com.agustin.taxi.controllers;

import com.agustin.taxi.dao.PagoDaoImp;
import com.agustin.taxi.dao.ServicioDaoImp;
import com.agustin.taxi.dto.DtoPagar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PagoController {
    @Autowired
    private PagoDaoImp pagoDaoImp;
    @PostMapping("/pagar")
    public void agregarPago(@RequestBody DtoPagar dtoPagar){
        pagoDaoImp.registrarPago(dtoPagar);
    }

}
