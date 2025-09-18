package com.demo.dashboard.service;


import com.demo.dashboard.entity.Employee;
import com.demo.dashboard.repository.EmployeeRepository;
import com.demo.dashboard.utils.*;
import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoderUtil passwordEncoder;
    private final JWTTokenGenerator JWTTokenGenerator;

    public EmployeeService(EmployeeRepository employeeRepository,
                           PasswordEncoderUtil passwordEncoder,
                           JWTTokenGenerator JWTTokenGenerator) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.JWTTokenGenerator = JWTTokenGenerator;
    }


    public Map<String, Object> login(String account, String rawPassword) {
        Optional<Employee> employeeOpt = employeeRepository.findByAccount(account);
        if (employeeOpt.isEmpty()) {
            throw new BadCredentialsException("Account is incorrect or not exists");
        }

        Employee employee = employeeOpt.get();

        if (!passwordEncoder.matches(rawPassword, employee.getPassword())) {
            throw new BadCredentialsException("Password Incorrect");
        }

        String token = JWTTokenGenerator.generateToken(employee.getAccount(),employee.getPassword());

        Map<String, Object> result = new HashMap<>();
        result.put("token", token);
        result.put("employee", mapEmployeeToDto(employee));
        result.put("expiresIn", JWTTokenGenerator.getExpirationDateFromToken(token));

        return result;
    }


    public Employee register(String account, String rawPassword, String name) {
        if (employeeRepository.existsByAccount(account)) {
            throw new RuntimeException("Account Already Exists");
        }

        String encodedPassword = passwordEncoder.encode(rawPassword);

        Employee employee = new Employee();
        employee.setAccount(account);
        employee.setPassword(encodedPassword);
        employee.setName(name);

        return employeeRepository.save(employee);
    }


    public boolean validateToken(String token) {
        return JWTTokenGenerator.validateToken(token);
    }


    public Employee getEmployeeFromToken(String token) {
        String account = JWTTokenGenerator.getUsernameFromToken(token);
        return employeeRepository.findByAccount(account)
                .orElseThrow(() -> new RuntimeException("Employee Not Exists"));
    }


    private Map<String, Object> mapEmployeeToDto(Employee employee) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", employee.getId());
        dto.put("account", employee.getAccount());
        dto.put("name", employee.getName());

        return dto;
    }


    public boolean changePassword(String account, String oldPassword, String newPassword) {
        Optional<Employee> employeeOpt = employeeRepository.findByAccount(account);
        if (employeeOpt.isEmpty()) {
            throw new RuntimeException("Account Not Exists");
        }

        Employee employee = employeeOpt.get();

    
        if (!passwordEncoder.matches(oldPassword, employee.getPassword())) {
            throw new BadCredentialsException("Old password Incorrect");
        }

    
        employee.setPassword(passwordEncoder.encode(newPassword));
        employeeRepository.save(employee);

        return true;
    }
}