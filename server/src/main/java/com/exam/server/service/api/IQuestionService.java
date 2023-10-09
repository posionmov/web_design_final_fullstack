package com.exam.server.service.api;

import com.exam.server.controller.model.CreationResultDto;
import com.exam.server.controller.model.question.QuestionDto;

import java.util.List;

public interface IQuestionService {

    QuestionDto getQuestionById(long questionId);

    List<QuestionDto> getQuestionsForType(String type);

    CreationResultDto addNewQuestion(QuestionDto dto);
}
