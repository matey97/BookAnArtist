package com.ei104550.BookAnArtist.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Notification {

    @Id
    @GeneratedValue
    private Long id;
    private String destinationUser;
    private String subject;
    @Column(length=1024)
    private String message;
    private Long date;
    private boolean seen;

    public Notification(){
        this.seen = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDestinationUser() {
        return destinationUser;
    }

    public void setDestinationUser(String destinationUser) {
        this.destinationUser = destinationUser;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }
}
