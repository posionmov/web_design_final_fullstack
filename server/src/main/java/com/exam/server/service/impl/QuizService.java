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
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizService implements IQuizService {

    private final QuizRepository quizRepository;

    @Override
    public List<QuizTypeDto> getAvailableQuizTypes() {
        var availableTypes = quizRepository.getAvailableTypes();
        return IntStream.range(0, availableTypes.size())
                .mapToObj(i -> QuizTypeDto.builder().id(i).name(availableTypes.get(i)).build())
                .toList();
    }

    @Override
    public CreationResultDto addNewType(QuizToAddDto dto) {
        var newQuiz = Quiz.builder().type(dto.getType()).build();
        var saved = quizRepository.save(newQuiz);
        return new CreationResultDto(saved.getId());
    }
}
