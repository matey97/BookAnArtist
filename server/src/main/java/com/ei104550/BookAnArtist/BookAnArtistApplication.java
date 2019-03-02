package com.ei104550.BookAnArtist;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.ArtistImage;
import com.ei104550.BookAnArtist.model.ArtistVideo;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistImageRepository;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ArtistVideoRepository;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.engine.spi.SessionDelegatorBaseImpl;
import org.hibernate.internal.SessionImpl;
import org.hibernate.type.BlobType;
import org.hibernate.type.ClobType;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Stream;

@SpringBootApplication
public class BookAnArtistApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookAnArtistApplication.class, args);
	}

	@Bean
	ApplicationRunner init(ArtistRepository repository, ArtistImageRepository imageRepository, ArtistVideoRepository videoRepository){
		return args -> {
			Stream.of("Serz", "Dj. X").forEach((name) -> {
				Artist user = new Artist();
				user.setUsername(name);
				user.setArtisticName(name);
				user.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
				user.setPrice((double) 5000);
				user.setPuntuation((double) 8);

				File file = new File("src/main/resources/profile-icon.png");
                File fileVideo = new File("src/main/resources/sample720_1mb.mp4");

				byte[] bFile = new byte[(int) file.length()];
				byte[] vFile = new byte[(int) file.length()];
				ArrayList<Long> auxImg = new ArrayList<>();
                ArrayList<Long> auxVid = new ArrayList<>();
                ArtistImage auxImage = new ArtistImage();
                ArtistVideo auxVideo = new ArtistVideo();
                try{
					new FileInputStream(file).read(bFile);
					new FileInputStream(fileVideo).read(vFile);
                    auxImage.setImage(bFile);
                    auxVideo.setVideo(vFile);
                }catch (Exception ex){
					ex.printStackTrace();
				}
                imageRepository.save(auxImage);
                videoRepository.save(auxVideo);
                auxImg.add(auxImage.getId());
                auxVid.add(auxVideo.getId());
				user.setImage(bFile);
                user.setImages(auxImg);
				user.setVideos(auxVid);
				repository.save(user);
			});
			repository.findAll().forEach(System.out::println);
		};
	}

}
