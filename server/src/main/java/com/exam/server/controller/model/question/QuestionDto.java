package com.exam.server.controller.model.question;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long quizId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;

    private String text;
    private List<AnswerDto> answers;
}
