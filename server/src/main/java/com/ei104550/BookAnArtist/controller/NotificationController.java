package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.Notification;
import com.ei104550.BookAnArtist.repositories.NotificationRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/")
public class NotificationController {

    private NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @PostMapping("notification/seen")
    public void setSeenNotifications(@RequestBody List<Notification> notifications){
        notifications.forEach(n -> n.setSeen(true));
        this.notificationRepository.saveAll(notifications);
    }
}
