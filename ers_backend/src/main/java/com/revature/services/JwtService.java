package com.revature.services;

import com.revature.models.User;
import com.revature.models.dtos.UserInfoDTO;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey KEY = Jwts.SIG.HS256.key().build();

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(new Date())
                .signWith(KEY)
                .compact();
    }

    public String extractUsername(String jwt) {
        // throws exceptions
        return Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(jwt)
                .getPayload().getSubject();
    }

    public boolean validateToken(String jwt, UserInfoDTO user) {
        // throws exceptions
        assert Jwts.parser().verifyWith(KEY).build().parseSignedClaims(jwt).getPayload().getSubject().equals(user.getEmail());
        return true;
    }
}
