package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController

public class ArtistController {

    private ArtistRepository repository;

    public ArtistController(ArtistRepository repository){
        this.repository = repository;
    }

    @GetMapping("/artistas")
    @CrossOrigin("http://localhost:4200")
    public Collection<Artist> artists(){
        return repository.findAll().stream().collect(Collectors.toList());
    }
}
