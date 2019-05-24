package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.enums.PaymentCause;
import com.ei104550.BookAnArtist.model.Payment;
import com.ei104550.BookAnArtist.services.EmailService;
import com.ei104550.BookAnArtist.enums.ContractState;
import com.ei104550.BookAnArtist.model.Artist;
import com.ei104550.BookAnArtist.model.Contract;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.ArtistRepository;
import com.ei104550.BookAnArtist.repositories.ContractRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import com.ei104550.BookAnArtist.services.PaymentService;
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
    private EmailService emailService;
    private PaymentService paymentService;

    public ContractController(ContractRepository contractRepository, UserRepository userRepository, ArtistRepository artistRepository, EmailService emailService, PaymentService paymentService) {
        this.contractRepository = contractRepository;
        this.userRepository = userRepository;
        this.artistRepository = artistRepository;
        this.emailService = emailService;
        this.paymentService = paymentService;
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
        emailService.sendNewContractEmail(artistUsername, contract);
        return true;
    }

    @GetMapping("art-contract-list/{username}")
    public List<Contract> getArtistContracts(@PathVariable("username") String username){
        Date currentDate = new Date();
        List<Contract> contractList = this.contractRepository.findAll().stream().filter(contract -> contract.getArtisticUsername().equals(username))
                .collect(Collectors.toList());
        contractList.forEach(contract -> {
            if (contract.getState() == ContractState.ACCEPTANCE_PENDING && contract.getLimitDate() < currentDate.getTime())
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
            if (contract.getState() == ContractState.ACCEPTANCE_PENDING && contract.getLimitDate() < currentDate.getTime()) {
                contract.setState(ContractState.CANCELLED);
                contractRepository.save(contract);
            }
        });
        return contractList;
    }

    @PutMapping("contract/accept/{id}")
    public boolean acceptContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.ACCEPTED);
        this.contractRepository.save(c);
        emailService.sendAcceptRejectContractEmail(c.getOrganizerUsername(), c, true);

        //Tan solo simula el SPS
        Payment payment = new Payment();
        payment.setCause(PaymentCause.PAYMENT);
        payment.setUsuario(c.getOrganizerUsername());
        payment.setQty(this.artistRepository.findById(c.getArtisticUsername()).get().getPrice());
        paymentService.realizarPago(payment);
        emailService.sendPayEmail(c.getOrganizerUsername(), c);
        return true;
    }

    @PutMapping("contract/decline/{id}")
    public boolean declineContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.REJECTED);
        this.contractRepository.save(c);
        emailService.sendAcceptRejectContractEmail(c.getOrganizerUsername(), c, false);
        return true;
    }

    @PutMapping("contract/cancel/{id}")
    public boolean cancelContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.CANCELLED);
        this.contractRepository.save(c);
        return true;
    }

    @PutMapping("contract/complete/{id}")
    public boolean completeContractById(@PathVariable("id") String id){
        Contract c = this.contractRepository.findById(Long.parseLong(id)).get();
        c.setState(ContractState.DONE);
        this.contractRepository.save(c);

        //Tan solo simula el SPS
        Payment payment = new Payment();
        payment.setCause(PaymentCause.RECEIPT);
        payment.setUsuario(c.getArtisticUsername());
        payment.setQty(this.artistRepository.findById(c.getArtisticUsername()).get().getPrice());
        paymentService.realizarCobro(payment);
        emailService.sendIncomeEmail(c.getArtisticUsername(), c);
        return true;
    }
}
