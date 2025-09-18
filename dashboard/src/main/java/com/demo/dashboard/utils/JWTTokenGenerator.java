package com.demo.dashboard.utils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Component
public class JWTTokenGenerator {


    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;


    public String generateToken(String username, String password) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("password", password);
        return createToken(claims);
    }


    private String createToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME * 1000))
                .signWith(getSecretKey())
                .compact();
    }


    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }


    public String getPasswordFromToken(String token) {
        return getClaimFromToken(token, claims -> claims.get("password", String.class));
    }


    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }


    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }


    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public Boolean validateToken(String token) {
        try {

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey()) 
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

        

            Date expiration = claims.getExpiration();
            return expiration != null && expiration.after(new Date());

        } catch (Exception e) {
            // Any parsing/signature/expiration failure => invalid token
            return false;
        }
    }
    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}