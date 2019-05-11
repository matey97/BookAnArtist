package com.ei104550.BookAnArtist.controller;
import com.ei104550.BookAnArtist.Services.PaymentService;
import com.ei104550.BookAnArtist.enums.PaymentCause;
import com.ei104550.BookAnArtist.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/")
public class SPSController {

    @Autowired
    PaymentService paymentService;


    @PostMapping("payment/pay")
    public boolean realizarPago(@RequestBody Payment payment){

        return (paymentService.realizarPago(payment));

    }

    @PostMapping("payment/receipt")
    public boolean realizarCobro(@RequestBody Payment payment){

        return (paymentService.realizarCobro(payment));

    }

    @PostMapping("payment/devolution")
    public boolean realizarDevolucion(@RequestBody Payment payment){

        return (paymentService.realizarDevolucion(payment));

    }

}
