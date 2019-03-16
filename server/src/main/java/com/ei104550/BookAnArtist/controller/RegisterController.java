package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.Exceptions.RegistrationForbiddenException;
import com.ei104550.BookAnArtist.Services.UserService;
import com.ei104550.BookAnArtist.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class RegisterController {



    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public boolean registerUser(@RequestBody User user) throws RegistrationForbiddenException {
       if (validData(user)){
          user.setPassword(userService.EncodeUserPassword(user.getPassword()));
          user.setUsername(user.getUsername().trim().toLowerCase());
          userService.checkUserType(user.getUserType());
          userService.addNewUser(user);
          userService.logInRegisteredUser(user);
       }
       return true;
    }

    private boolean validData (User user){
        return user.getUsername() != null && user.getPassword() != null && user.getEmail() != null;
    }
}