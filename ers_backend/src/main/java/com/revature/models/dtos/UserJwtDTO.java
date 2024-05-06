package com.revature.models.dtos;

import com.revature.models.User;

public class UserJwtDTO {

    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    private String jwt;

    // Constructors
    public UserJwtDTO() {
    }
    public UserJwtDTO(int userId, String firstName, String lastName, String email, String role, String jwt) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.jwt = jwt;
    }
    public UserJwtDTO(User user) {
        // Reimbursement info??
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole().getRoleId();
    }

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    // Others
    @Override
    public String toString() {
        return "UserJwtDTO{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", jwt='" + jwt + '\'' +
                '}';
    }
}

