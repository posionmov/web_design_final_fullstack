package com.exam.server.controller.advice;

import com.exam.server.controller.QuizController;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice(basePackageClasses = QuizController.class)
public class QuizControllerAdvice {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseDto> handle(DataIntegrityViolationException ex) {
        var body = new ResponseDto("Invalid request");
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto> handle(Exception ex) {
        var body = new ResponseDto("Something went wrong");
        return ResponseEntity.internalServerError().body(body);
    }
}
