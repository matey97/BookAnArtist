package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.enums.PaymentCause;
import com.ei104550.BookAnArtist.services.EmailService;
import com.ei104550.BookAnArtist.enums.ContractState;
import com.ei104550.BookAnArtist.enums.ReclamationState;
import com.ei104550.BookAnArtist.model.*;
import com.ei104550.BookAnArtist.repositories.*;
import com.ei104550.BookAnArtist.services.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/")
public class ReclamationController {

    private ReclamationRepository reclamationRepository;
    private UserRepository userRepository;
    private ArtistImageRepository imageRepository;
    private ArtistVideoRepository videoRepository;
    private ContractRepository contractRepository;
    private ReclamationResponseRepository reclamationResponseRepository;
    private EmailService emailService;
    private PaymentService paymentService;

    public ReclamationController(ReclamationRepository reclamationRepository, UserRepository userRepository, ArtistImageRepository imageRepository, ArtistVideoRepository videoRepository, ContractRepository contractRepository, ReclamationResponseRepository reclamationResponseRepository, EmailService emailService, PaymentService paymentService) {
        this.reclamationRepository = reclamationRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
        this.contractRepository = contractRepository;
        this.reclamationResponseRepository = reclamationResponseRepository;
        this.emailService = emailService;
        this.paymentService = paymentService;
    }

    @PostMapping("reclamation")
    public boolean postReclamation(@RequestBody Reclamation reclamation){
        reclamation.setId(null);
        reclamation.setState(ReclamationState.OPEN);

        Contract contract = contractRepository.findById(reclamation.getContractId()).get();
        contract.setState(ContractState.RECLAMATION);
        contractRepository.save(contract);

        reclamation.getImages().forEach(image -> image.setId(null));
        reclamation.getVideos().forEach(video -> video.setId(null));
        imageRepository.saveAll(reclamation.getImages());
        videoRepository.saveAll(reclamation.getVideos());
        reclamationRepository.save(reclamation);

        User reclamed = userRepository.findById(reclamation.getReclamedUser()).get();
        reclamed.addReclamationReceived(reclamation);
        User reclaming = userRepository.findById(reclamation.getReclamingUser()).get();
        reclaming.addReclamationDone(reclamation);
        userRepository.save(reclamed);
        userRepository.save(reclaming);

        emailService.sendReclamationEmail(reclamation);
        return true;
    }

    @GetMapping("reclamation/user/{username}")
    public Map<String, List<Reclamation>> getReclamationsByUsername(@PathVariable("username") String username){
        User user = this.userRepository.findById(username).get();
        Map<String, List<Reclamation>> map = new HashMap<>();
        map.put("done", user.getReclamationsDone());
        map.put("received", user.getReclamationsReceived());
        return map;
    }

    @GetMapping("reclamation/all")
    public Map<String, List<Reclamation>> getAllReclamations(){
        List<Reclamation> reclamations = this.reclamationRepository.findAll();
        Map<String, List<Reclamation>> map = new HashMap<>();
        map.put("open", reclamations.stream().filter(reclamation -> reclamation.getState() == ReclamationState.OPEN).collect(Collectors.toList()));
        map.put("closed", reclamations.stream().filter(reclamation -> reclamation.getState() != ReclamationState.OPEN).collect(Collectors.toList()));
        return map;
    }

    @PutMapping("reclamation/{id}/cancel")
    public boolean cancelReclamation(@PathVariable("id") String id){
        Reclamation reclamation = this.reclamationRepository.findById(Long.parseLong(id)).get();
        reclamation.setState(ReclamationState.CANCELLED);
        reclamation.setUpdateDate(new Date().getTime());
        this.reclamationRepository.save(reclamation);
        this.emailService.sendUpdateReclamationEmail(reclamation);
        return true;
    }

    @PutMapping("reclamation/{id}/archive")
    public boolean archiveReclamation(@PathVariable("id") String id){
        Reclamation reclamation = this.reclamationRepository.findById(Long.parseLong(id)).get();
        reclamation.setState(ReclamationState.CLOSED);
        reclamation.setUpdateDate(new Date().getTime());
        this.reclamationRepository.save(reclamation);
        this.emailService.sendUpdateReclamationEmail(reclamation);
        return true;
    }

    @PutMapping("reclamation/{id}/accept")
    public boolean acceptReclamation(@PathVariable("id") String id){
        Reclamation reclamation = this.reclamationRepository.findById(Long.parseLong(id)).get();
        reclamation.setState(ReclamationState.ACCEPTED);
        reclamation.setUpdateDate(new Date().getTime());
        this.reclamationRepository.save(reclamation);
        this.emailService.sendUpdateReclamationEmail(reclamation);

        //Tan solo simula el SPS
        Payment payment = new Payment();
        payment.setCause(PaymentCause.DEVOLUTION);
        payment.setUsuario(reclamation.getReclamingUser());
        paymentService.realizarDevolucion(payment);
        this.emailService.sendPayBackEmail(reclamation);
        return true;
    }

    @PutMapping("reclamation/{id}/update")
    public boolean updateReclamation(@RequestBody Reclamation reclamation){
        checkImages(reclamation.getImages());
        checkVideos(reclamation.getVideos());
        if (reclamation.getReclamationResponse() != null){
            ReclamationResponse reclamationResponse = reclamation.getReclamationResponse();
            if (reclamationResponse.getId() == -1){
                reclamationResponse.setId(null);
            }
            checkImages(reclamationResponse.getImages());
            checkVideos(reclamationResponse.getVideos());
            this.reclamationResponseRepository.save(reclamationResponse);
        }

        this.reclamationRepository.save(reclamation);
        return true;
    }

    private void checkImages(List<ArtistImage> images){
        images.forEach(image -> {
            if (image.getId() == -1){
                image.setId(null);
                this.imageRepository.save(image);
            }
        });
    }

    private void checkVideos(List<ArtistVideo> videos){
        videos.forEach(video -> {
            if (video.getId() == -1){
                video.setId(null);
                this.videoRepository.save(video);
            }
        });
    }
}
