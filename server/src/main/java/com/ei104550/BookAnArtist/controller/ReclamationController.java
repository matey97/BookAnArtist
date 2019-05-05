package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.Services.EmailService;
import com.ei104550.BookAnArtist.repositories.ReclamationRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/")
public class ReclamationController {

    private ReclamationRepository reclamationRepository;
    private EmailService emailService;

    public ReclamationController(ReclamationRepository reclamationRepository, EmailService emailService) {
        this.reclamationRepository = reclamationRepository;
        this.emailService = emailService;
    }
}
