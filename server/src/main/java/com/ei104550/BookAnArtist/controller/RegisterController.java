package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.Exceptions.RegistrationForbiddenException;
import com.ei104550.BookAnArtist.services.UserService;
import com.ei104550.BookAnArtist.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;

@RestController
@CrossOrigin
public class RegisterController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws RegistrationForbiddenException {
       if (validData(user) && userService.find(user.getUsername()) == null){
           user.setPassword(userService.EncodeUserPassword(user.getPassword()));

           File fileImage = new File("src/main/resources/profile-icon.png");
           try{
               byte[] bImageFile = Files.readAllBytes(fileImage.toPath());
               user.setImage(bImageFile);
           }catch (Exception ex){

           }
           userService.addNewUser(user);

          return user;
       }
       return null;
    }

    private boolean validData (User user){
        return user.getUsername() != null && user.getPassword() != null && user.getEmail() != null;
    }
}

