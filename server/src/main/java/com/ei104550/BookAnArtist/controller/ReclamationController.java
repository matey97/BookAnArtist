package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.Services.EmailService;
import com.ei104550.BookAnArtist.enums.ContractState;
import com.ei104550.BookAnArtist.enums.ReclamationState;
import com.ei104550.BookAnArtist.model.Contract;
import com.ei104550.BookAnArtist.model.Reclamation;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/")
public class ReclamationController {

    private ReclamationRepository reclamationRepository;
    private UserRepository userRepository;
    private ArtistImageRepository imageRepository;
    private ArtistVideoRepository videoRepository;
    private ContractRepository contractRepository;
    private EmailService emailService;

    public ReclamationController(ReclamationRepository reclamationRepository, UserRepository userRepository, ArtistImageRepository imageRepository, ArtistVideoRepository videoRepository, ContractRepository contractRepository, EmailService emailService) {
        this.reclamationRepository = reclamationRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
        this.contractRepository = contractRepository;
        this.emailService = emailService;
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
}
