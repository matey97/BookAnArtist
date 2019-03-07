package com.ei104550.BookAnArtist.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class ArtistVideo {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Lob
    private byte[] video;

    public ArtistVideo(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getVideo() {
        return video;
    }

    public void setVideo(byte[] image) {
        this.video = image;
    }
}
