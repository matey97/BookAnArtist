package com.ei104550.BookAnArtist.model;

import com.ei104550.BookAnArtist.enums.PaymentCause;

public class Payment {

    String usuario;
    float qty;
    PaymentCause cause;

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public float getQty() {
        return qty;
    }

    public void setQty(float cantidad) {
        this.qty = cantidad;
    }

    public PaymentCause getCause() {
        return cause;
    }

    public void setCause(PaymentCause cause) {
        this.cause = cause;
    }
    @Override
    public String toString(){
        return "Payment{" +
                "usuario=" + usuario +
                ", cantidad='" + qty + '\'' +
                ", cause=" + cause +
                '}';
    }

}
