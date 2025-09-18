package com.demo.dashboard.utils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;;

@Component
public class PasswordEncoderUtil  {
     private final BCryptPasswordEncoder passwordEncoder;

     public PasswordEncoderUtil() {
        this(10); 
    } 

    public PasswordEncoderUtil(int strength) {
        this.passwordEncoder = new BCryptPasswordEncoder(strength);
    }

    //password encoder
     public String encode(CharSequence rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
    // verify password

     public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }


    //Update to use the new encoding strength
     public boolean upgradeEncoding(String encodedPassword) {
        return passwordEncoder.upgradeEncoding(encodedPassword);
    }
}
