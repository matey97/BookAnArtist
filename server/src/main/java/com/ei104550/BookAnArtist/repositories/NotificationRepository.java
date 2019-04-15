package com.ei104550.BookAnArtist.repositories;

import com.ei104550.BookAnArtist.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
