package com.demo.dashboard.repository;

import com.demo.dashboard.entity.Communication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunicationRepository extends JpaRepository<Communication, Long>, JpaSpecificationExecutor<Communication> {


    List<Communication> findByStudentId(Long studentId);

 
    List<Communication> findByStudentIdAndDirection(Long studentId, String direction);
}
