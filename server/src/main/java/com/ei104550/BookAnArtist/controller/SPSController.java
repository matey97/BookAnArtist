package com.ei104550.BookAnArtist.controller;
import com.ei104550.BookAnArtist.enums.PaymentCause;
import com.ei104550.BookAnArtist.model.Payment;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/")
public class SPSController {


    @PostMapping("payment/pay")
    public boolean realizarPago(@RequestBody Payment payment){

        // Simular el trabajo del sps

        return (payment.getCause() == PaymentCause.PAYMENT && payment.getQty()> 0);

    }

    @PostMapping("payment/receipt")
    public boolean realizarCobro(@RequestBody Payment payment){

        // Simular el trabajo del sps

        return (payment.getCause() == PaymentCause.RECEIPT && payment.getQty()> 0);

    }

    @PostMapping("payment/devolution")
    public boolean realizarDevolucion(@RequestBody Payment payment){

        // Simular el trabajo del sps

        return (payment.getCause() == PaymentCause.DEVOLUTION && payment.getQty()> 0);

    }

}
