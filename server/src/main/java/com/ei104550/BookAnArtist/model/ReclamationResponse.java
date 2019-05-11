package com.ei104550.BookAnArtist.model;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ReclamationResponse {

    @Id @GeneratedValue
    private Long id;
    @Column(length=2048)
    private String response;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<ArtistImage> images;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<ArtistVideo> videos;

    public ReclamationResponse(){
        this.images = new ArrayList<>();
        this.videos = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
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
}
