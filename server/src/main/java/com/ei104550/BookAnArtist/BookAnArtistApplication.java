package com.ei104550.BookAnArtist;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class BookAnArtistApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookAnArtistApplication.class, args);
	}

	@Bean
	ApplicationRunner init(ArtistRepository repository){
		return args -> {
			Stream.of("Julio Rodriguez", "DJ YokSe", "Jordi Hurtado").forEach(name -> {
				Artist a = new Artist();
				a.setName(name);
				repository.save(a);
			});
			repository.findAll().forEach(System.out::println);
		};
	}
}
