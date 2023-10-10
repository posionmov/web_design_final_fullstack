package com.exam.server.service.impl;

import com.exam.server.controller.model.CreationResultDto;
import com.exam.server.controller.model.question.AnswerDto;
import com.exam.server.controller.model.question.QuestionDto;
import com.exam.server.dao.entity.QuizAnswer;
import com.exam.server.dao.entity.QuizQuestion;
import com.exam.server.dao.repo.QuestionRepository;
import com.exam.server.dao.repo.QuizRepository;
import com.exam.server.service.api.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    @Override
    public QuestionDto getQuestionById(long questionId) {
        var question = questionRepository.findById(questionId).orElseThrow();
        return toQuestionDto(question);
    }

    @Override
    public List<QuestionDto> getQuestionsForQuiz(Long id) {
        var quiz = quizRepository.findById(id).orElseThrow();
        return quiz.getQuestions().stream().map(QuestionService::toQuestionDto).toList();
    }

    @Override
    public CreationResultDto addNewQuestion(QuestionDto dto) {
        var quiz = quizRepository.findById(dto.getQuizId()).orElseThrow();
        var newQuestion = QuizQuestion.builder()
                .text(dto.getText())
                .quiz(quiz)
                .build();
        var answers = createNewAnswers(dto.getAnswers(), newQuestion);
        newQuestion.setAnswers(answers);
        questionRepository.save(newQuestion);
        return new CreationResultDto(newQuestion.getId());
    }

    private static List<QuizAnswer> createNewAnswers(List<AnswerDto> answers, QuizQuestion question) {
        return answers.stream()
                .map(answer -> QuizAnswer.builder()
                                .text(answer.getText())
                                .question(question)
                                .correct(answer.getCorrect())
                                .build())
                .toList();
    }

    private static QuestionDto toQuestionDto(QuizQuestion question) {
        return QuestionDto.builder()
                .id(question.getId())
                .text(question.getText())
                .answers(question.getAnswers()
                        .stream()
                        .map(answer -> AnswerDto.builder().text(answer.getText()).correct(answer.isCorrect()).build())
                        .toList())
                .build();
    }
}
