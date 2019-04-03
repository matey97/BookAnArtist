package com.ei104550.BookAnArtist.model;

import com.ei104550.BookAnArtist.enums.UserType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "USER")
public class User {

    @Id
    @Column(name = "USERNAME")
    private String username;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "EMAIL")
    private String email;

    @OneToMany(cascade= CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn
    private Set<Role> roles;
    @Lob
    private byte[] image;
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Contract> contracts;

    private String usertype;

    public User(){
        this.contracts = new LinkedList<>();
    }

    public User(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.roles = user.getRoles();
        this.image = user.getImage();
        this.usertype= user.getUsertype();

    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
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

    public List<Contract> getContracts() {
        return contracts;
    }

    public void setContracts(List<Contract> contracts) {
        this.contracts = contracts;
    }

    public void addContract(Contract c){
        this.contracts.add(c);
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", role=" + roles +
                ", image=" + Arrays.toString(image) +
                ", usertype=" + usertype +
                '}';
    }
}
