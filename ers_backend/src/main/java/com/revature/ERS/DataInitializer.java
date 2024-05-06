package com.revature.ERS;

import com.revature.daos.RoleDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Role;
import com.revature.models.User;
import com.revature.models.dtos.UserLoginDTO;
import com.revature.models.dtos.UserRegisterDTO;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleDAO roleDAO;
    private final UserService userService;


    @Autowired
    public DataInitializer(RoleDAO roleDAO, UserService userService) {
        this.roleDAO = roleDAO;
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles and statuses
        System.out.println("Initializing data");

        if (userService.getUserByEmail("admin@aol.com") == null) {
            UserRegisterDTO admin = new UserRegisterDTO("Admin", "X", "admin@aol.com", "password");
            userService.registerUser(admin);
        }


        // Create Admin user with manager role to add other managers
    }

    public void initRoles() {
        roleDAO.save(new Role("Employee"));
        roleDAO.save(new Role("Manager"));
        roleDAO.save(new Role("Administrator"));
    }
    public void initStatuses() {
    }
    public void initAdmin() {
    }

    public void dummyData() {
    }
}
