package com.revature.models.dtos;

import com.revature.models.Reimbursement;

public class ReimbursementDTO {

    private int reimbursementId;
    private int userId;
    private String description;
    private double amount;
    private String status;

    // Constructors
    public ReimbursementDTO() {
    }

    public ReimbursementDTO(int reimbursementId, int userId, String description, double amount, String status) {
        this.reimbursementId = reimbursementId;
        this.userId = userId;
        this.description = description;
        this.amount = amount;
        this.status = status;
    }

    public ReimbursementDTO(Reimbursement reimbursement) {
        this.reimbursementId = reimbursement.getReimbursementId();
        this.userId = reimbursement.getUser().getUserId();
        this.description = reimbursement.getDescription();
        this.amount = reimbursement.getAmount();
        this.status = reimbursement.getStatus().getStatusId();
    }

    // Getters and setters
    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Others
    @Override
    public String toString() {
        return "ReimbursementDTO{" +
                "reimbursementId=" + reimbursementId +
                ", userId=" + userId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                '}';
    }
}
