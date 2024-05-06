package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.Role;
import com.revature.models.Status;
import com.revature.models.User;
import com.revature.models.dtos.UserInfoDTO;
import com.revature.models.dtos.UserJwtDTO;
import com.revature.models.dtos.UserLoginDTO;
import com.revature.models.dtos.UserRegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDAO userDAO;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserDAO userDAO, JwtService jwtService) {
        this.userDAO = userDAO;
        this.jwtService = jwtService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User getUserByEmail(String email) {
        Optional<User> u = userDAO.findByEmail(email);
        if (u.isEmpty()) {
            return null;
        }
        return u.get();
    }

    public UserJwtDTO loginUser(UserLoginDTO loginDTO) {
        User user = userDAO.findByEmail(loginDTO.getEmail()).get();
        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPasshash())) {
            System.out.println(user.getEmail() + " login validated");
            UserJwtDTO userJwt = new UserJwtDTO(user);
            userJwt.setJwt(jwtService.generateToken(user));
            System.out.println(userJwt);
            return userJwt;
        }
        return null;
    }

    public UserInfoDTO registerUser(UserRegisterDTO registerDTO) {
        if (userDAO.findByEmail(registerDTO.getEmail()).isPresent()) {
            return null;
        }
        String passhash = passwordEncoder.encode(registerDTO.getPassword());
        User user = new User(0, registerDTO.getFirstName(), registerDTO.getLastName(), registerDTO.getEmail(), passhash, new Role("Employee"));
        userDAO.save(user);
        return new UserInfoDTO(user);
    }

    public List<UserInfoDTO> getAllUsers() {
        return userDAO.findAll().stream().map(UserInfoDTO::new).toList();
    }

    public UserInfoDTO updateUser(UserInfoDTO userDTO) {
        // ensure user is manager
        // ensure target is employee
        return null;
    }

    public String deleteUser(int userId) {
        // ensure user is manager
        // ensure target not self
        if (userDAO.findById(userId).isEmpty()) {
            return "";
        }
        userDAO.deleteById(userId);
        return "Deleted user";
    }
}
