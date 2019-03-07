package com.ei104550.BookAnArtist;

import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.ArtistImage;
import com.ei104550.BookAnArtist.model.ArtistVideo;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistImageRepository;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ArtistVideoRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
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
import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
public class BookAnArtistApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookAnArtistApplication.class, args);
	}

	@Bean
	ApplicationRunner init(ArtistRepository repository,
						   UserRepository userRepository,
						   ArtistImageRepository imageRepository,
						   ArtistVideoRepository videoRepository){

		User user1 = new User();
		user1.setUsername("Pepe");
		user1.setUserType(User.ARTIST);

		Artist artista1 = new Artist();
		artista1.setUsername(user1.getUsername());
		artista1.setArtisticName("El Pepas");
		artista1.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
        List<String> habilidades = Arrays.asList("Bailar", "Cantar", "Reir");
		artista1.setHabilities(habilidades);
		artista1.setPrice((double) 5000);
		artista1.setPuntuation((double) 67);
		artista1.setnPuntuations(10);


		User user2 = new User();
		user2.setUsername("Tomas");

		Artist artista2 = new Artist();
		artista2.setUsername(user2.getUsername());
		artista2.setArtisticName("El Broncas");
		artista2.setDescription("Descripcion aleatoria que describe como sera la desripcion no aleatoria de este artista");
		artista2.setPrice((double) 5000);
		artista2.setPuntuation((double) 78);
		artista2.setnPuntuations(10);

		User user3 = new User();
		user3.setUsername("Fermín");

		Artist artista3 = new Artist();
		artista3.setUsername(user3.getUsername());
		artista3.setArtisticName("El Pirulin");
		artista3.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
		artista3.setPrice((double) 5000);
		artista3.setPuntuation((double) 34);
		artista3.setnPuntuations(10);

		User user4 = new User();
		user4.setUsername("Agapito");

		Artist artista4 = new Artist();
		artista4.setUsername(user4.getUsername());
		artista4.setArtisticName("Te lo Repito");
		artista4.setDescription("Descripcion aleatoria que describe como sera la desripcion no aleatoria de este artista");
		artista4.setPrice((double) 5000);
		artista4.setPuntuation((double) 56);
		artista4.setnPuntuations(10);

		User user5 = new User();
		user5.setUsername("Javier");

		Artist artista5 = new Artist();
		artista5.setUsername(user5.getUsername());
		artista5.setArtisticName("Er Javi");
		artista5.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
		artista5.setPrice((double) 5000);
		artista5.setPuntuation((double) 8);

		User user6 = new User();
		user6.setUsername("Juan");
		user6.setUserType(User.ARTIST);

		return args -> {
			Stream.of(user1, user2, user3, user4, user5, user6).forEach((user) -> {
				File fileImage = new File("src/main/resources/profile-icon.png");
				try{
					byte[] bImageFile = Files.readAllBytes(fileImage.toPath());
					user.setImage(bImageFile);
				}catch (Exception ex){

				}
				userRepository.save(user);
			});
			userRepository.findAll().forEach(System.out::println);
			Stream.of(artista1,artista2,artista3,artista4,artista5).forEach((artist) -> {

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

				artist.setImages(artistImageList);
				artist.setVideos(artistVideoList);
				repository.save(artist);
			});
			repository.findAll().forEach(System.out::println);
		};
	}

}
