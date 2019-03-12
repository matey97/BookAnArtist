package com.ei104550.BookAnArtist.model;

import com.ei104550.BookAnArtist.enums.UserType;

import javax.persistence.*;
import java.util.Arrays;

@Entity
public class User {

    @Id
    private String username;
    private String password;
    private String email;
    private UserType userType;
    @Lob
    private byte[] image;

    public User(){

    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", tipo=" + userType +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
