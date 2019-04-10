package com.ei104550.BookAnArtist.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Valoracion {

    @Id @GeneratedValue
    private Long id;
    String valorador;
    String valorado;
    int puntuacion;
    String comentario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValorador() {
        return valorador;
    }

    public void setValorador(String valorador) {
        this.valorador = valorador;
    }

    public String getValorado() {
        return valorado;
    }

    public void setValorado(String valorado) {
        this.valorado = valorado;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }



}
