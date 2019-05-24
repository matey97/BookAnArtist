package com.ei104550.BookAnArtist.services;


import com.ei104550.BookAnArtist.enums.PaymentCause;
import com.ei104550.BookAnArtist.model.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentService {

    public boolean realizarPago(Payment payment){

        // Simular el trabajo del sps
        return (payment.getCause() == PaymentCause.PAYMENT && payment.getQty()> 0);

    }

    public boolean realizarCobro(Payment payment){

        // Simular el trabajo del sps
        return (payment.getCause() == PaymentCause.RECEIPT && payment.getQty()> 0);

    }

    public boolean realizarDevolucion(Payment payment){
        // Simular el trabajo del sps
        return (payment.getCause() == PaymentCause.DEVOLUTION && payment.getQty()> 0);

    }
}
