package com.ei104550.BookAnArtist.model;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.util.List;
import java.util.Map;

public class ProfileData {

    private Artist artist;
    private Map<String, String>[] images;
    private Map<String, String>[] videos;

    public ProfileData(){}

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Map<String, String>[] getImages() {
        return images;
    }

    public void setImages(Map<String, String>[] images) {
        this.images = images;

    }

    public Map<String, String>[] getVideos() {
        return videos;
    }

    public void setVideos(Map<String, String>[] videos) {
        this.videos = videos;
    }
}
