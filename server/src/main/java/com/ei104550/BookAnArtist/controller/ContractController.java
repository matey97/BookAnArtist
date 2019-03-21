package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.enums.ContractState;
import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.Contract;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ContractRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class ContractController {

    private ContractRepository contractRepository;
    private UserRepository userRepository;
    private ArtistRepository artistRepository;

    public ContractController(ContractRepository contractRepository, UserRepository userRepository, ArtistRepository artistRepository) {
        this.contractRepository = contractRepository;
        this.userRepository = userRepository;
        this.artistRepository = artistRepository;
    }

    @PostMapping("contract/{artistUsername}_{organizatorUsername}")
    public boolean postNewContract(@PathVariable("artistUsername") String artistUsername,
            @PathVariable("organizatorUsername") String organizatorUsername,
            @RequestBody Contract contract){
        contract.setId(null);
        contract.setState(ContractState.ACCEPTANCE_PENDING);
        contractRepository.save(contract);
        User user = userRepository.findById(organizatorUsername).get();
        user.addContract(contract);
        Artist artist = artistRepository.findById(artistUsername).get();
        artist.addContract(contract);
        userRepository.save(user);
        artistRepository.save(artist);
        return true;
    }
}
