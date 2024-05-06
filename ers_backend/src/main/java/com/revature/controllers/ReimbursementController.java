package com.revature.controllers;

import com.revature.models.dtos.ReimbursementDTO;
import com.revature.models.dtos.ReimbursementRequestDTO;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @GetMapping("/reimbursements")
    @PreAuthorize("principal.role == 'Manager'")
    public ResponseEntity<List<ReimbursementDTO>> getAllReimbursements() {
        return ResponseEntity.ok().body(reimbursementService.getAllReimbursements());
    }

    @GetMapping("/users/{userId}/reimbursements")
    @PreAuthorize("#userId == principal.userId || principal.role == 'Manager'")
    public ResponseEntity<List<ReimbursementDTO>> getUserReimbursements(@PathVariable int userId) {
        return ResponseEntity.ok().body(reimbursementService.getUserReimbursements(userId));
    }

    @PostMapping("/reimbursements")
    public ResponseEntity<ReimbursementDTO> requestReimbursement(@RequestBody ReimbursementDTO reimbursement) {
        return ResponseEntity.ok().body(reimbursementService.requestReimbursement(reimbursement));
    }

    @PatchMapping("/reimbursements/{reimbursementId}")
    @PreAuthorize("principal.role == 'Manager'")
    public ResponseEntity<String> updateReimbursement(@PathVariable int reimbursementId, @RequestBody ReimbursementDTO reimbursementDTO) {
        // requester update description
        // OR manager resolve
        // CALL HELPER FN

        String msg = reimbursementService.resolveReimbursement(reimbursementDTO);
        if (msg == "") {
            return ResponseEntity.ok().body(msg);
        }
        return ResponseEntity.badRequest().body(msg);
    }
}
