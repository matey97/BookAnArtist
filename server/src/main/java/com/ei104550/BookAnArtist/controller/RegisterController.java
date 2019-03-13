package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
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

    private UserRepository userRepository;

    public RegisterController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @RequestMapping("/register")
    public void registerUser(@RequestBody User user) {
       if (validData(user)){
            userRepository.save(user);
       }
    }
    private boolean validData (User user){
        return user.getUsername() != null && user.getPassword() != null && user.getEmail() != null;
    }
}