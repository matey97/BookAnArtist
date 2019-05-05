package com.ei104550.BookAnArtist.model;

import com.ei104550.BookAnArtist.enums.ReclamationState;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Reclamation {

    @Id @GeneratedValue
    private Long id;
    private String reclamingUser;
    private String reclamedUser;
    @Column(length=2048)
    private String reclamation;
    private Long creationDate;
    private Long updateDate;
    private ReclamationState state;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<ArtistImage> images;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<ArtistVideo> videos;

    public Reclamation() {
        this.images = new LinkedList<>();
        this.videos = new LinkedList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReclamingUser() {
        return reclamingUser;
    }

    public void setReclamingUser(String reclamingUser) {
        this.reclamingUser = reclamingUser;
    }

    public String getReclamedUser() {
        return reclamedUser;
    }

    public void setReclamedUser(String reclamedUser) {
        this.reclamedUser = reclamedUser;
    }

    public String getReclamation() {
        return reclamation;
    }

    public void setReclamation(String reclamation) {
        this.reclamation = reclamation;
    }

    public Long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Long creationDate) {
        this.creationDate = creationDate;
    }

    public Long getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Long updateDate) {
        this.updateDate = updateDate;
    }

    public ReclamationState getState() {
        return state;
    }

    public void setState(ReclamationState state) {
        this.state = state;
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
