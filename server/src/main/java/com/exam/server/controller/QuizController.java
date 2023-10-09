package com.exam.server.controller;

import com.exam.server.controller.model.CreationResultDto;
import com.exam.server.controller.model.question.QuestionDto;
import com.exam.server.controller.model.type.QuizToAddDto;
import com.exam.server.controller.model.type.QuizTypeDto;
import com.exam.server.service.api.IQuestionService;
import com.exam.server.service.api.IQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final IQuizService quizService;
    private final IQuestionService questionService;

    @GetMapping("type")
    public List<QuizTypeDto> getAvailableTypesOfQuiz() {
        return quizService.getAvailableQuizTypes();
    }

    @PutMapping("type")
    public CreationResultDto addNewQuizType(@RequestBody QuizToAddDto dto) {
        return quizService.addNewType(dto);
    }

    @GetMapping("question/{questionId}")
    public QuestionDto getQuestionById(@PathVariable("questionId") long questionId) {
        return questionService.getQuestionById(questionId);
    }

    @GetMapping("question/list/{quizType}")
    public List<QuestionDto> getQuestionById(@PathVariable("quizType") String quizType) {
        return questionService.getQuestionsForType(quizType);
    }

    @PutMapping("question")
    public CreationResultDto addNewQuestion(@RequestBody QuestionDto dto) {
        return questionService.addNewQuestion(dto);
    }
}
