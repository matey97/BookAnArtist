package com.ei104550.BookAnArtist.Services;

import com.ei104550.BookAnArtist.Exceptions.RegistrationForbiddenException;
import com.ei104550.BookAnArtist.daos.UserDao;
import com.ei104550.BookAnArtist.enums.UserType;
import com.ei104550.BookAnArtist.model.Role;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

@Component("userService")
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRepository userRepository;

    public String EncodeUserPassword(String password) {
       return passwordEncoder.encode(password);
    }

    public void addNewUser(User user) {
        userRepository.save(user);
    }

    public boolean checkCredentials(String userName, String password) {

        User user = userRepository.findById(userName).get();
        return isUser(userName, user) && isPasswordCorrect(password, user);

    }

    private boolean isPasswordCorrect(String password, User user) {
        return user.getPassword().equals(passwordEncoder.encode(password));
    }

    private boolean isUser(String userName, User user) {
        return user!= null && userName.equals(user.getUsername().trim().toLowerCase());
    }

    public void logInRegisteredUser(User user) {

    }

    public void checkRole(Set<Role> roles) throws RegistrationForbiddenException {
        if (roles.equals("ROLES_ADMIN")) {
            throw new RegistrationForbiddenException();
        }
    }
}
