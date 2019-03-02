package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.ArtistImage;
import com.ei104550.BookAnArtist.model.ArtistVideo;
import com.ei104550.BookAnArtist.repositories.ArtistImageRepository;
import com.ei104550.BookAnArtist.repositories.ArtistVideoRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("resources/")
public class MultimediaController {

    private ArtistImageRepository imageRepository;
    private ArtistVideoRepository videoRepository;

    public MultimediaController(ArtistImageRepository imageRepository,
                                ArtistVideoRepository videoRepository){
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
    }

    @GetMapping("image/{id}")
    //@CrossOrigin("http://localhost:4200")
    public ArtistImage image(@PathVariable Long id){
        return imageRepository.findById(id).get();
    }

    @GetMapping("video/{id}")
    //@CrossOrigin("http://localhost:4200")
    public ArtistVideo video(@PathVariable Long id){
        return videoRepository.findById(id).get();
    }
}
