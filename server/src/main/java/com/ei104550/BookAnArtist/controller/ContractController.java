package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.enums.ContractState;
import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.Contract;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ContractRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("art-contract-list/{username}")
    public List<Contract> getArtistContracts(@PathVariable("username") String username){
        Date currentDate = new Date();
        List<Contract> contractList = this.contractRepository.findAll().stream().filter(contract -> contract.getArtisticUsername().equals(username))
                .collect(Collectors.toList());
        contractList.forEach(contract -> {
            if (contract.getLimitDate() < currentDate.getTime())
                contract.setState(ContractState.CANCELLED);
        });
        return contractList;
    }

    @GetMapping("org-contract-list/{username}")
    public List<Contract> getOrganizerContracts(@PathVariable("username") String username){
        Date currentDate = new Date();
        List<Contract> contractList = this.contractRepository.findAll().stream().filter(contract -> contract.getOrganizerUsername().equals(username))
                .collect(Collectors.toList());
        contractList.forEach(contract -> {
            if (contract.getState() != ContractState.CANCELLED && contract.getLimitDate() < currentDate.getTime())
                contract.setState(ContractState.CANCELLED);
        });
        return contractList;
    }

    @PutMapping("contract/accept/{id}")
    public boolean acceptContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.ACCEPTED);
        this.contractRepository.save(c);
        return true;
    }

    @PutMapping("contract/decline/{id}")
    public boolean declineContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.REJECTED);
        this.contractRepository.save(c);
        return true;
    }

    @PutMapping("contract/cancel/{id}")
    public boolean cancelContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.CANCELLED);
        this.contractRepository.save(c);
        return true;
    }
}
