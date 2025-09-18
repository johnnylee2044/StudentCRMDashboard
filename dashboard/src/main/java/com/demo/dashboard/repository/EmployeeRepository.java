package com.demo.dashboard.repository;

import com.demo.dashboard.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {


    Optional<Employee> findByAccount(String account);


    boolean existsByAccount(String account);


    Optional<Employee> findByAccountAndPassword(String account, String password);
}