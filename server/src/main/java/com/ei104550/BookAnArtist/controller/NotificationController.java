package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.Notification;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.NotificationRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/")
public class NotificationController {

    private NotificationRepository notificationRepository;
    private UserRepository userRepository;

    public NotificationController(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("notification/user/{username}")
    public List<Notification> getUserNotifications(@PathVariable("username") String username){
        User user = this.userRepository.findById(username).get();
        return user.getNotifications();
    }

    @PostMapping("notification/seen")
    public void setSeenNotifications(@RequestBody List<Notification> notifications){
        notifications.forEach(n -> n.setSeen(true));
        this.notificationRepository.saveAll(notifications);
    }
}
