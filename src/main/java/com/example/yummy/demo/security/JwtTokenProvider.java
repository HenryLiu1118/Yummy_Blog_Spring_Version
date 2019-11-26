package com.example.yummy.demo.security;

import com.example.yummy.demo.Repository.UserRepo;
import com.example.yummy.demo.models.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.yummy.demo.security.SecurityConstants.EXPIRATION_TIME;
import static com.example.yummy.demo.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    @Autowired
    private UserRepo userRepo;

    public String generateToken(Authentication authentication) {
        org.springframework.security.core.userdetails.User userDetail = (org.springframework.security.core.userdetails.User)authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);

        User user = userRepo.findByEmail(userDetail.getUsername());

        Map<String,Object> claims = new HashMap<>();
        claims.put("id", user.get_id());
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());

        return Jwts.builder()
                .setSubject(user.get_id())
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex){
            System.out.println("Invalid JWT Signature");
        }catch (MalformedJwtException ex){
            System.out.println("Invalid JWT Token");
        }catch (ExpiredJwtException ex){
            System.out.println("Expired JWT token");
        }catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT token");
        }catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    public String getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return id;
    }
}
