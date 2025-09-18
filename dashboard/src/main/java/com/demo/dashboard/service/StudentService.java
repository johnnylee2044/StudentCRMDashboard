package com.demo.dashboard.service;

import com.demo.dashboard.entity.ApplicationStatus;
import com.demo.dashboard.entity.Student;
import com.demo.dashboard.repository.CommunicationRepository;
import com.demo.dashboard.repository.InteractionRepository;
import com.demo.dashboard.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

   
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private InteractionRepository interactionRepository;

    @Autowired
    private CommunicationRepository communicationRepository;
    

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }


    public List<Student> getStudentsWithFilters(String country, ApplicationStatus status) {
        if (country != null && status != null) {
            return studentRepository.findByCountryAndApplicationStatus(country, status);
        } else if (country != null) {
            return studentRepository.findByCountry(country);
        } else if (status != null) {
            return studentRepository.findByApplicationStatus(status);
        } else {
            return studentRepository.findAll();
        }
    }
}