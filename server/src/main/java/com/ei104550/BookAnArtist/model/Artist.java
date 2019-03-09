package com.ei104550.BookAnArtist.model;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.type.BlobType;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Artist{

    @Id
    private String username;
    private String artisticName;
    private String description;
    private Double price;
    private Double puntuation;
    private int nPuntuations;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<String> habilities;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<ArtistImage> images;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<ArtistVideo> videos;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<String> zones;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<String> schedules;


    public Artist(){
        this.puntuation = 0.0;
        this.images = new LinkedList<>();
        this.videos = new LinkedList<>();
        this.zones = new LinkedList<>();
        this.schedules = new LinkedList<>();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getArtisticName() {
        return artisticName;
    }

    public void setArtisticName(String artisticName) {
        this.artisticName = artisticName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getPuntuation() {
        return puntuation;
    }

    public void setPuntuation(Double puntuation) {
        this.puntuation = puntuation;
    }

    public List<String> getHabilities() {
        return habilities;
    }

    public void setHabilities(List<String> habilities) {
        this.habilities = habilities;
    }

    public List<ArtistImage> getImages() {
        return images;
    }

    public void setImages(List<ArtistImage> images) {
        this.images = images;
    }

    public List<ArtistVideo> getVideos() {
        return videos;
    }

    public void setVideos(List<ArtistVideo> videos) {
        this.videos = videos;
    }

    public int getnPuntuations() { return nPuntuations; }

    public void setnPuntuations(int nPuntuations) { this.nPuntuations = nPuntuations; }

    public List<String> getZones() {
        return zones;
    }

    public void setZones(List<String> zones) {
        this.zones = zones;
    }

    public List<String> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<String> schedules) {
        this.schedules = schedules;
    }

    @Override
    public String toString() {
        return "Artist{" +
                "username='" + username + '\'' +
                ", artisticName='" + artisticName + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", puntuation=" + puntuation +
                ", nPuntuations=" + nPuntuations +
                ", habilities=" + habilities +
                ", images=" + images +
                ", videos=" + videos +
                ", zones=" + zones +
                ", schedules=" + schedules +
                '}';
    }
}
