package com.ei104550.BookAnArtist.repositories;

import com.ei104550.BookAnArtist.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
//@CrossOrigin(origins = "http://localhost:4200")
public interface ArtistRepository extends JpaRepository<Artist, Long> {
}
