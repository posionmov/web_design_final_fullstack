package com.exam.server.dao.repo;

import com.exam.server.dao.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<QuizQuestion, Long> {
}
