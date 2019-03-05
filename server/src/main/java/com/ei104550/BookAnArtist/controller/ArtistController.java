package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/")
public class ArtistController {

    private ArtistRepository repository;

    public ArtistController(ArtistRepository repository){
        this.repository = repository;
    }

    @GetMapping("artistas")
    //@CrossOrigin("http://localhost:4200")
    public Collection<Artist> artists(){
        return repository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("artista/{username}")
    public Artist artistByUsername(@PathVariable String username){
        return repository.findById(username).get();
    }
}
