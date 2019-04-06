package com.ei104550.BookAnArtist.model;

import com.ei104550.BookAnArtist.enums.ContractState;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Contract {

    @Id @GeneratedValue
    private Long id;
    private String artisticUsername;
    private String organizerUsername;
    private String zone;
    private String location;
    private String comments;
    private Long date;
    private Long limitDate;
    private ContractState state;

    public Contract(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArtisticUsername() {
        return artisticUsername;
    }

    public void setArtisticUsername(String artisticUsername) {
        this.artisticUsername = artisticUsername;
    }

    public String getOrganizerUsername() {
        return organizerUsername;
    }

    public void setOrganizerUsername(String organizerUsername) {
        this.organizerUsername = organizerUsername;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public Long getLimitDate() {
        return limitDate;
    }

    public void setLimitDate(Long limitDate) {
        this.limitDate = limitDate;
    }

    public ContractState getState() {
        return state;
    }

    public void setState(ContractState state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "id=" + id +
                ", artisticUsername='" + artisticUsername + '\'' +
                ", organizerUsername='" + organizerUsername + '\'' +
                ", zone='" + zone + '\'' +
                ", location='" + location + '\'' +
                ", comments='" + comments + '\'' +
                ", date=" + date +
                ", state=" + state +
                '}';
    }
}
