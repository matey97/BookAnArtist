package com.ei104550.BookAnArtist.model;

import org.hibernate.type.ClobType;

import javax.persistence.*;
import java.util.Arrays;

@Entity
public class User {

    public static final int ADMIN = 1;
    public static final int ARTIST = 2;
    public static final int ORGANIZER = 3;

    @Id
    private String username;
    private String password;
    private String email;
    private int userType;
    @Lob
    private byte[] image;

    public User(){

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

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
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
                ", userType=" + userType +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
