package com.ei104550.BookAnArtist;

import com.ei104550.BookAnArtist.services.EmailService;
import com.ei104550.BookAnArtist.repositories.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@SpringBootApplication
@EnableAsync
public class BookAnArtistApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BookAnArtistApplication.class, args);
	}

	@Bean(name = "asyncExecutor")
	public Executor taskExecutor(){
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(8);
		executor.setMaxPoolSize(8);
		executor.setQueueCapacity(50);
		executor.setThreadNamePrefix("BNA-");
		executor.initialize();
		return executor;
	}

	@Bean
	ApplicationRunner init(ArtistRepository repository,
						   UserRepository userRepository,
						   ArtistImageRepository imageRepository,
						   ArtistVideoRepository videoRepository,
						   ContractRepository contractRepository,
						   EmailService emailService){

		/*User user1 = new User();
		user1.setUsername("Pepe");
		user1.setPassword("pepe");
		user1.setEmail("pepe@gmail.com");
		user1.setUsertype(UserType.ARTIST.toString());

		Artist artista1 = new Artist();
		artista1.setUsername(user1.getUsername());
		artista1.setArtisticName("El Pepas");
		artista1.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
        List<String> habilidades = Arrays.asList("Bailar", "Cantar", "Reir");
		List<String> zones = Arrays.asList("Madrid", "Valencia", "Alicante");
		List<String> schedules = Arrays.asList("Mañana", "Tarde");

		artista1.setHabilities(habilidades);
		artista1.setZones(zones);
		artista1.setSchedules(schedules);

		artista1.setPrice((double) 5000);
		artista1.setPuntuation((double) 67);
		artista1.setnPuntuations(10);


		User user2 = new User();
		user2.setUsername("Tomas");
		user2.setPassword("tomas");
		user2.setEmail("tomas@gmail.com");
		user2.setUsertype(UserType.ARTIST.toString());

		Artist artista2 = new Artist();
		artista2.setUsername(user2.getUsername());
		artista2.setArtisticName("El Broncas");
		artista2.setDescription("Descripcion aleatoria que describe como sera la desripcion no aleatoria de este artista");
		artista2.setPrice((double) 5000);
		artista2.setPuntuation((double) 78);
		artista2.setnPuntuations(10);

		User user3 = new User();
		user3.setUsername("Fermín");
		user3.setPassword("fermin");
		user3.setEmail("fermin@gmail.com");
		user3.setUsertype(UserType.ARTIST.toString());

		Artist artista3 = new Artist();
		artista3.setUsername(user3.getUsername());
		artista3.setArtisticName("El Pirulin");
		artista3.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
		artista3.setPrice((double) 5000);
		artista3.setPuntuation((double) 34);
		artista3.setnPuntuations(10);

		User user4 = new User();
		user4.setUsername("Agapito");
		user4.setPassword("agapito");
		user4.setEmail("agapito@gmail.com");
		user4.setUsertype(UserType.ARTIST.toString());

		Artist artista4 = new Artist();
		artista4.setUsername(user4.getUsername());
		artista4.setArtisticName("Te lo Repito");
		artista4.setDescription("Descripcion aleatoria que describe como sera la desripcion no aleatoria de este artista");
		artista4.setPrice((double) 5000);
		artista4.setPuntuation((double) 56);
		artista4.setnPuntuations(10);

		User user5 = new User();
		user5.setUsername("Javier");
		user5.setPassword("javier");
		user5.setEmail("javier@gmail.com");
		user5.setUsertype(UserType.ARTIST.toString());

		Artist artista5 = new Artist();
		artista5.setUsername(user5.getUsername());
		artista5.setArtisticName("Er Javi");
		artista5.setDescription("Es un tio muy majo que solo quiere ganarse la vida disfrutando del musicote");
		artista5.setPrice((double) 5000);
		artista5.setPuntuation((double) 8);

		User user6 = new User();
		user6.setUsername("Juan");
		user6.setPassword("juan");
		user6.setEmail("juan@gmail.com");
		user6.setUsertype(UserType.ARTIST.toString());*/

		return args -> {
			/*Contract c = contractRepository.findById(35L).get();
			emailService.sendNewContractEmail("sergio",c);
			emailService.sendAcceptRejectContractEmail("org1", c, true);
			emailService.sendAcceptRejectContractEmail("org1", c, false);
			emailService.sendPayEmail("org1", c);
			emailService.sendIncomeEmail("sergio", c);
			emailService.sendPayBackEmail("org1", c);
			/*Stream.of(user1, user2, user3, user4, user5, user6).forEach((user) -> {
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

				ArrayList<ArtistImage> artistImageList = new ArrayList<>();
                ArrayList<ArtistVideo> artistVideoList = new ArrayList<>();
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
                artistImageList.add(image1);
                artistImageList.add(image2);
                artistVideoList.add(video1);

				artist.setImages(artistImageList);
				artist.setVideos(artistVideoList);
				repository.save(artist);
			});
			repository.findAll().forEach(System.out::println);
			userRepository.findAll().forEach(System.out::println);*/
		};

	}

}
