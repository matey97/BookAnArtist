package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("users")
    public Collection<User> users(){
        return userRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("user/{username}")
    public User userByUsername(@PathVariable String username){
        return userRepository.findById(username).orElse(null);
    }

    @GetMapping(value = "user-image/{username}")
    public Map<String, String> userImage(@PathVariable String username){
        User user = userRepository.findById(username).get();
        Map<String, String> jsonMap = new HashMap<>();
        jsonMap.put("raw", Base64.getEncoder().encodeToString(user.getImage()));
        return jsonMap;
    }
}
