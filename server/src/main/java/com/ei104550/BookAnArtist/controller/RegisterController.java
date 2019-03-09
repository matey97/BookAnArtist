package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

@RestController
@CrossOrigin
public class RegisterController {

    @RequestMapping("/register")
    public boolean registerUser(@RequestBody User user) {
        System.out.println("he sido llamado");
        return true;
    }


}