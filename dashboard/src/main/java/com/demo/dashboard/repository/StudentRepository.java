package com.demo.dashboard.repository;

import com.demo.dashboard.entity.Student;
import com.demo.dashboard.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor; // 用于复杂查询
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {

    List<Student> findByCountry(String country);
    List<Student> findByApplicationStatus(ApplicationStatus status);
    List<Student> findByCountryAndApplicationStatus(String country, ApplicationStatus status);
}