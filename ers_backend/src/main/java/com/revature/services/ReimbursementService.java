package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.Status;
import com.revature.models.User;
import com.revature.models.dtos.ReimbursementDTO;
import com.revature.models.dtos.UserInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {

    private final UserDAO userDAO;
    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public ReimbursementService(UserDAO userDAO, ReimbursementDAO reimbursementDAO) {
        this.userDAO = userDAO;
        this.reimbursementDAO = reimbursementDAO;
    }

    public ReimbursementDTO requestReimbursement(ReimbursementDTO reimbursementRequest) {
        UserInfoDTO u = (UserInfoDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDAO.findById(u.getUserId()).get();
        Reimbursement reimbursement = new Reimbursement(
                0,
                user,
                reimbursementRequest.getDescription(),
                reimbursementRequest.getAmount(),
                new Status("Pending")
        );
        return new ReimbursementDTO(reimbursementDAO.save(reimbursement));
    }

    public List<ReimbursementDTO> getUserReimbursements(int userId) {
        List<ReimbursementDTO> reimbursements = reimbursementDAO.findByUserUserId(userId)
                .stream().map(ReimbursementDTO::new).toList();
        return reimbursements;
    }

    public List<ReimbursementDTO> getAllReimbursements() {
        return reimbursementDAO.findAll().stream().map(ReimbursementDTO::new).toList();
    }

    public String resolveReimbursement(ReimbursementDTO reimbursement) {
        // ensure manager && not self && approve or deny
        // or ensure employee && cancel
        // ensure its pending
        SecurityContext s = SecurityContextHolder.getContext();
        UserInfoDTO u = (UserInfoDTO) s.getAuthentication().getPrincipal();
        Reimbursement r = reimbursementDAO.findById(reimbursement.getReimbursementId()).get();

        if (r.getStatus().getStatusId() == "Pending") {
            return "You cannot resolve a request that has already been resolved.";
        }

        if (u.getUserId() == r.getUser().getUserId()) {
            return "You cannot resolve your own request.";
        }

        r.setStatus(new Status(reimbursement.getStatus()));
        reimbursement = new ReimbursementDTO(reimbursementDAO.save(r));

        return "";
    }

}
