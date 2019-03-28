package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

@RestController
@CrossOrigin
public class LoginController {

    @PostMapping("/login")
    public boolean login(@RequestBody User user) {
        return user.getUsername().equals("Pepe") && user.getPassword().equals("pepe");
    }


    @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
        return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
    }
}
