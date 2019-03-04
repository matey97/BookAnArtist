package com.ei104550.BookAnArtist.model;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.type.BlobType;

import javax.persistence.*;
import java.util.List;

@Entity
public class Artist{

    @Id
    private String username;
    private String artisticName;
    private String description;
    private Double price;
    private Double puntuation;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Long> images;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Long> videos;

    public Artist(){}

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

    public List<Long> getImages() {
        return images;
    }

    public void setImages(List<Long> images) {
        this.images = images;
    }

    public List<Long> getVideos() {
        return videos;
    }

    public void setVideos(List<Long> videos) {
        this.videos = videos;
    }

    @Override
    public String toString() {
        return "Artist{" +
                "artisticName='" + artisticName + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", puntuation=" + puntuation +
                ", images=" + images +
                ", videos=" + videos +
                '}';
    }
}
