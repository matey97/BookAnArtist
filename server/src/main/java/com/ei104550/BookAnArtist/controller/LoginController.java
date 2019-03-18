package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

@RestController
@CrossOrigin
public class LoginController {

    //TODO we can add a preauthorzed annotation @Preathorize("hasAnyRole('ADMIN')") to check roles can acces url.
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public boolean login(Principal user)  {
        System.out.println("he sido llamado");
        //return userService.checkCredentials(user.getUsername().trim().toLowerCase(), user.getPassword());
        return true;
    }


    @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
        return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
    }
}
