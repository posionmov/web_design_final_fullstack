package com.exam.server.dao.repo;

import com.exam.server.dao.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuizQuestion, Long> {

    @Query("select q from QuizQuestion q where q.quiz.type = :type")
    List<QuizQuestion> getAllQuestionsByQuizType(@Param("type") String quizType);
}
