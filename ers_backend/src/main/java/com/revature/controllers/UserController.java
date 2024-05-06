package com.revature.controllers;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import com.revature.models.dtos.UserInfoDTO;
import com.revature.models.dtos.UserJwtDTO;
import com.revature.models.dtos.UserLoginDTO;
import com.revature.models.dtos.UserRegisterDTO;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("principal.role == 'Manager'")
    public ResponseEntity<List<UserInfoDTO>> getAllUsers() {
        // get current user context and pass in to service
        // should respond 401 if not manager
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/users/{userId}")
    ResponseEntity<Object> getUser(@PathVariable int userId) {
        // need to implement?
        return null;
    }

    @PostMapping("/register")
    ResponseEntity<?> registerUser(@RequestBody UserRegisterDTO user) {
        UserInfoDTO u = userService.registerUser(user);
        if (u == null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        return ResponseEntity.ok().body(u);
    }

    @PostMapping("/login")
    ResponseEntity<?> loginUser(@RequestBody UserLoginDTO user) {
        UserJwtDTO u = userService.loginUser(user);
        if (u == null) {
            return ResponseEntity.badRequest().body("Invalid Credentials");
        }
        return ResponseEntity.ok().body(u);
    }

    @PatchMapping("/users/{userId}") // Do we need ID in path ??
    ResponseEntity<UserInfoDTO> updateUser(@PathVariable int userId, @RequestBody UserInfoDTO user) {
        return ResponseEntity.ok().body(userService.updateUser(user));
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("principal.userId != #userId")
    ResponseEntity<String> deleteUser(@PathVariable int userId) {
        String s = userService.deleteUser(userId);
        return ResponseEntity.ok().body(s);
    }
}
