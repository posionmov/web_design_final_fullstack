package com.exam.server.controller.model.question;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDto {
    private String text;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean correct;
}
