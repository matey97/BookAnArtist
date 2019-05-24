package com.ei104550.BookAnArtist.services;

import com.ei104550.BookAnArtist.model.CustomUserDetails;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user =  userRepository.findById(username);

        user.orElseThrow(() -> new UsernameNotFoundException("User not Found"));
        return user.map(CustomUserDetails::new).get();
    }
}
