package com.ei104550.BookAnArtist;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.ArtistImage;
import com.ei104550.BookAnArtist.model.ArtistVideo;
import com.ei104550.BookAnArtist.repositories.ArtistImageRepository;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ArtistVideoRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.stream.Stream;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
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
				ArtistImage auxImage2 = new ArtistImage();
				ArtistVideo auxVideo = new ArtistVideo();
                try{
					new FileInputStream(file).read(bFile);
					new FileInputStream(fileVideo).read(vFile);
                    auxImage.setImage(bFile);
                    auxImage2.setImage(bFile);
                    auxVideo.setVideo(vFile);
                }catch (Exception ex){
					ex.printStackTrace();
				}
                imageRepository.save(auxImage);
				imageRepository.save(auxImage2);
				videoRepository.save(auxVideo);
                auxImg.add(auxImage.getId());
                auxImg.add(auxImage2.getId());
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
