package com.demo.dashboard.controller;

import com.demo.dashboard.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final EmployeeService employeeService;

    public AuthController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        try {
            Map<String, Object> result = employeeService.login(
                    loginRequest.getAccount(),
                    loginRequest.getPassword()
            );
            System.out.println("this is result"+loginRequest);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            var employee = employeeService.register(
                    registerRequest.getAccount(),
                    registerRequest.getPassword(),
                    registerRequest.getName()
            );
            return ResponseEntity.ok(Map.of(
                    "message", "Register Successful",
                    "account", employee.getAccount()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }


    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                boolean isValid = employeeService.validateToken(token);
                return ResponseEntity.ok(Map.of("valid", isValid));
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid Token Format"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    public static class LoginRequest {
        private String account;
        private String password;

        // getters and setters
        public String getAccount() { return account; }
        public void setAccount(String account) { this.account = account; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String account;
        private String password;
        private String name;

        // getters and setters
        public String getAccount() { return account; }
        public void setAccount(String account) { this.account = account; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}