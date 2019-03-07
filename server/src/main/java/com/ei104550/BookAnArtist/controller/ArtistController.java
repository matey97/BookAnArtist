package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.ArtistImage;
import com.ei104550.BookAnArtist.model.ArtistVideo;
import com.ei104550.BookAnArtist.model.ProfileData;
import com.ei104550.BookAnArtist.repositories.ArtistImageRepository;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ArtistVideoRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/")
public class ArtistController {

    private ArtistRepository artistRepository;
    private ArtistImageRepository imageRepository;
    private ArtistVideoRepository videoRepository;

    public ArtistController(ArtistRepository artistRepository,
                            ArtistImageRepository imageRepository,
                            ArtistVideoRepository videoRepository){
        this.artistRepository = artistRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
    }

    @GetMapping("artistas")
    //@CrossOrigin("http://localhost:4200")
    public Collection<Artist> artists(){
        return artistRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("artista/{username}")
    public Artist artistByUsername(@PathVariable String username){
        return artistRepository.findById(username).orElse(new Artist());
    }

    @PostMapping("artista/{username}")
    public void saveArtistProfile(@PathVariable String username,
                                    @RequestBody ProfileData artistProfile){
        Artist artist = artistProfile.getArtist();
        Map<String, String>[] images = artistProfile.getImages();
        Map<String, String>[] videos = artistProfile.getVideos();

        ArtistImage auxImage;
        List<Long> imageList = new ArrayList<>();
        for (Map<String, String> image : images){
            auxImage = new ArtistImage();
            auxImage.setName(image.get("name"));
            auxImage.setImage(Base64.getDecoder().decode(image.get("base64")));
            imageRepository.save(auxImage);
            imageList.add(auxImage.getId());
        }
        artist.setImages(imageList);

        ArtistVideo auxVideo;
        List<Long> videoList = artist.getVideos();
        for (Map<String, String> video : videos){
            auxVideo = new ArtistVideo();
            auxVideo.setName(video.get("name"));
            auxVideo.setVideo(Base64.getDecoder().decode(video.get("base64")));
            videoRepository.save(auxVideo);
            videoList.add(auxVideo.getId());
        }
        artist.setVideos(videoList);

        artistRepository.save(artist);
        System.out.println(artist);
    }
}
