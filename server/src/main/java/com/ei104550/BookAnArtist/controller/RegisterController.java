package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.Services.UserService;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    public RegisterController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @RequestMapping("/register")
    public void registerUser(@RequestBody User user) {
       if (validData(user)){
          user.setPassword(userService.EncodeUserPassword(user.getPassword()));
          userService.checkUserType(user.getUserType());
          userRepository.save(user);
       }
    }

    private boolean validData (User user){
        return user.getUsername() != null && user.getPassword() != null && user.getEmail() != null;
    }
}