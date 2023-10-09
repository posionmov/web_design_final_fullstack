package com.exam.server.service.api;

import com.exam.server.controller.model.CreationResultDto;
import com.exam.server.controller.model.type.QuizToAddDto;
import com.exam.server.controller.model.type.QuizTypeDto;

import java.util.List;

public interface IQuizService {

    List<QuizTypeDto> getAvailableQuizTypes();

    CreationResultDto addNewType(QuizToAddDto dto);
}
