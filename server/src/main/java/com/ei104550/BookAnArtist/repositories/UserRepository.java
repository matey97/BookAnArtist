package com.ei104550.BookAnArtist.repositories;

import com.ei104550.BookAnArtist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
