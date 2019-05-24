package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.services.UserService;
import com.ei104550.BookAnArtist.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@CrossOrigin
public class LoginController {

    public static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    //TODO we can add a preauthorzed annotation @Preathorize("hasAnyRole('ADMIN')") to check roles can acces url.
    @Autowired
    private UserService userService;

    @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
        return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
    }

    @CrossOrigin
    @RequestMapping("/login")
    public User user(@RequestBody User principal) {
        return userService.find(principal.getUsername());
    }

}
