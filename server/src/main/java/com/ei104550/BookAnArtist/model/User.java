package com.ei104550.BookAnArtist.model;


import javax.persistence.*;
import java.util.Arrays;
import java.util.Set;

@Entity
@Table(name = "USER")
public class User {

    @Id
    private String username;
    private String password;
    private String email;

    @OneToMany(cascade= CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn
    private Set<Role> role;
    @Lob
    private byte[] image;

    public User(){

    }

    public User(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.role = user.getRoles();
        this.image = user.getImage();

    }


    public Set<Role> getRoles() {
        return role;
    }

    public void setRoles(Set<Role> roles) {
        this.role = roles;
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
                ", tipo=" + role +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
