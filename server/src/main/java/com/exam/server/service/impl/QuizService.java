package com.exam.server.service.impl;

import com.exam.server.controller.model.CreationResultDto;
import com.exam.server.controller.model.type.QuizToAddDto;
import com.exam.server.controller.model.type.QuizTypeDto;
import com.exam.server.dao.entity.Quiz;
import com.exam.server.dao.repo.QuizRepository;
import com.exam.server.service.api.IQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizService implements IQuizService {

    private final QuizRepository quizRepository;

    @Override
    public List<QuizTypeDto> getAvailableQuizTypes() {
        return quizRepository.findAll().stream()
                .map(type -> QuizTypeDto.builder().id(type.getId()).name(type.getType()).build())
                .toList();
    }

    @Override
    public CreationResultDto addNewType(QuizToAddDto dto) {
        var newQuiz = Quiz.builder().type(dto.getType()).build();
        var saved = quizRepository.save(newQuiz);
        return new CreationResultDto(saved.getId());
    }
}
