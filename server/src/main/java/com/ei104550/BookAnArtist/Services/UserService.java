package com.ei104550.BookAnArtist.Services;

import com.ei104550.BookAnArtist.enums.UserType;
import com.ei104550.BookAnArtist.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component("userService")
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String EncodeUserPassword(String password) {
       return passwordEncoder.encode(password);
    }

    public void checkUserType(UserType userType) {
        if (userType.equals(UserType.ADMIN))
    }
}
