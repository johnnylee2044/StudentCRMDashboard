package com.demo.dashboard.controller;

import com.demo.dashboard.entity.ApplicationStatus;
import com.demo.dashboard.entity.Student;
import com.demo.dashboard.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents(@RequestParam(required = false) String country,
                                        @RequestParam(required = false) ApplicationStatus status) {
        return studentService.getStudentsWithFilters(country, status);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }
}