package com.exam.server.dao.repo;

import com.exam.server.dao.entity.Quiz;
import com.exam.server.dao.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("select distinct q.type from Quiz q")
    List<String> getAvailableTypes();
}
