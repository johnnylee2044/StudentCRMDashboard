package com.demo.dashboard.repository;

import com.demo.dashboard.entity.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction, Long>, JpaSpecificationExecutor<Interaction> {

  
    List<Interaction> findByStudentId(Long studentId);


    List<Interaction> findByStudentIdAndType(Long studentId, String type);
}
