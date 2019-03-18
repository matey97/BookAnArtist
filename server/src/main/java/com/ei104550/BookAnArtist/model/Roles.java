package com.ei104550.BookAnArtist.model;

import javax.persistence.*;

@Entity
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ROLE_ID")
    private int roleId;

    @Column(name = "ROLE")
    private String Role;

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
    
    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }
}
