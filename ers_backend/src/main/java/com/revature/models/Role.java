package com.revature.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "roles")
@Component
public class Role {

    @Id
    private String roleId;

    //private boolean canResolve;
    //private boolean canDelete;
    //private int permissions;

    public Role() {
    }

    public Role(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
