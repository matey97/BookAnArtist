package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.ArtistImage;
import com.ei104550.BookAnArtist.model.ArtistVideo;
import com.ei104550.BookAnArtist.model.Valoracion;
import com.ei104550.BookAnArtist.repositories.ArtistImageRepository;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ArtistValorationRepository;
import com.ei104550.BookAnArtist.repositories.ArtistVideoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/")
public class ArtistController {

    private ArtistRepository artistRepository;
    private ArtistImageRepository imageRepository;
    private ArtistVideoRepository videoRepository;
    private ArtistValorationRepository valorationRepository;

    public ArtistController(ArtistRepository artistRepository,
                            ArtistImageRepository imageRepository,
                            ArtistValorationRepository valorationRepository,
                            ArtistVideoRepository videoRepository){
        this.artistRepository = artistRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
        this.valorationRepository = valorationRepository;
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
                                    @RequestBody Artist artist){

        List<ArtistImage> images = artist.getImages();
        for (ArtistImage image : images){
            if (image.getId() == -1){
                image.setId(null);
            }
            imageRepository.save(image);
        }

        List<ArtistVideo> videos = artist.getVideos();
        for (ArtistVideo video : videos){
            if (video.getId() == -1){
                video.setId(null);
            }
            videoRepository.save(video);
        }

        artistRepository.save(artist);
        System.out.println(artist);
    }

    @PostMapping("artista/{username}/valoration")
    public void saveArtistValoration(@PathVariable String username,
                                     @RequestBody Valoracion valoration){

        if(artistRepository.findById(username).isPresent()){
            Artist artist = artistRepository.findById(username).get();
            artist.addValoracion(valoration);
            artist.setPuntuation(artist.getPuntuation());
            valorationRepository.save(valoration);
            artistRepository.save(artist);
        }

    }

    @DeleteMapping("artista/valoration/{id}")
    public void deleteArtistValoration(@PathVariable String id){

        if(valorationRepository.findById(Long.parseLong(id)).isPresent()){
            valorationRepository.deleteById(Long.parseLong(id));
        }
    }
}
