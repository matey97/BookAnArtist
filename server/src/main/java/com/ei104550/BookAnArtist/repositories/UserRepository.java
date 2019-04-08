package com.ei104550.BookAnArtist.repositories;

import com.ei104550.BookAnArtist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserRepository extends JpaRepository<User, String> {
    public User findOneByUsername(String username);
}

