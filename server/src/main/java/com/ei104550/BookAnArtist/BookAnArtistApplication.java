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
import java.nio.file.Files;
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

				File fileImage = new File("src/main/resources/profile-icon.png");
				File fileImage2 = new File("src/main/resources/test-image.png");
				File fileVideo = new File("src/main/resources/small.mp4");

				byte[] bImageFile = null;
				byte[] bImageFile2 = null;
				byte[] bVideoFile = null;

				ArrayList<Long> artistImageList = new ArrayList<>();
                ArrayList<Long> artistVideoList = new ArrayList<>();
                ArtistImage image1 = new ArtistImage();
				ArtistImage image2 = new ArtistImage();
				ArtistVideo video1 = new ArtistVideo();
                try{
					bImageFile = Files.readAllBytes(fileImage.toPath());
					bImageFile2 = Files.readAllBytes(fileImage2.toPath());
					bVideoFile = Files.readAllBytes(fileVideo.toPath());

                    image1.setImage(bImageFile);
                    image2.setImage(bImageFile2);
                    video1.setVideo(bVideoFile);
                }catch (Exception ex){
					ex.printStackTrace();
				}
                imageRepository.save(image1);
				imageRepository.save(image2);
				videoRepository.save(video1);
                artistImageList.add(image1.getId());
                artistImageList.add(image2.getId());
                artistVideoList.add(video1.getId());
				user.setImage(bImageFile);
                user.setImages(artistImageList);
				user.setVideos(artistVideoList);
				repository.save(user);
			});
			repository.findAll().forEach(System.out::println);
		};
	}

}
