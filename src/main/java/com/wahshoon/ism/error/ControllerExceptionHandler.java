package com.wahshoon.ism.error;

import com.wahshoon.ism.util.MessageSourceUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice(annotations = {CustomErrorHandling.class})
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

    private final Logger log = LoggerFactory.getLogger(ControllerExceptionHandler.class);

    @Autowired
    protected MessageSourceUtil messageSourceUtil;


    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        log.info("Handling Exception");
        log.error("Unexpected error occurred", ex);
        JsonErrorResponse.Error error = new JsonErrorResponse.Error(
                "",
                messageSourceUtil.getInternalServerErrorSorryMessage(),
                messageSourceUtil.getInternalServerErrorDetailMessage()
        );
        JsonErrorResponse jsonErrorResponse = new JsonErrorResponse(error);
        return ResponseEntity.internalServerError()
                .header("Content-Type", "application/json")
                .body(jsonErrorResponse);
    }

    // Used to handle the method-level validation errors
    // For example, @NotNull, @Email, @Size, etc.
    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleConflict(ConstraintViolationException ex) {
        log.info("Handling ConstraintViolationException");
        String message = "";
        List<String> messages = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            messages.add(violation.getMessage());
        }
        if (!messages.isEmpty()) {
            message = String.join(";", messages);
        }
        log.info("ConstraintViolationException message: {}", message);
        JsonErrorResponse.Error error = new JsonErrorResponse.Error(
                "", "Invalid parameters", message);
        JsonErrorResponse jsonErrorResponse = new JsonErrorResponse(error);
        return ResponseEntity.badRequest()
                .header("Content-Type", "application/json")
                .body(jsonErrorResponse);
    }

    // Handle CustomErrorException
    @ExceptionHandler(value = {CustomErrorExceptionBuilder.CustomErrorException.class})
    public ResponseEntity<Object> handleConflict(CustomErrorExceptionBuilder.CustomErrorException ex) {
        log.info("Handling CustomErrorException");
        JsonErrorResponse.Error error = new JsonErrorResponse.Error(
                ex.getCode() == null ? "" : ex.getCode(),
                ex.getMessage() == null ? "" : ex.getMessage(),
                ex.getDetail() == null ? "" : ex.getDetail());
        JsonErrorResponse jsonErrorResponse = new JsonErrorResponse(error);

        return ResponseEntity.status(ex.getHttpStatus())
                .header("Content-Type", "application/json")
                .body(jsonErrorResponse);
    }

    // Handle missing request parameters
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        log.info("Handling MissingServletRequestParameterException");
        JsonErrorResponse.Error error = new JsonErrorResponse.Error(
                "",
                "Missing request parameter",
                ex.getParameterName() + " parameter is missing");

        return ResponseEntity.badRequest()
                .header("Content-Type", "application/json")
                .body(new JsonErrorResponse(error));
    }

    @Override
    protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.info("Handling MissingServletRequestParameterException we");
        JsonErrorResponse.Error error = new JsonErrorResponse.Error(
                "",
                "Failed to convert parameter",
                "Failed to convert value " + ex.getValue() + "."
        );

        return ResponseEntity.badRequest()
                .header("Content-Type", "application/json")
                .body(new JsonErrorResponse(error));
    }

    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.info("Handling MethodArgumentNotValidException");
        String message = "";
        List<String> messages = new ArrayList<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            messages.add(fieldError.getDefaultMessage());
        }
        if (!messages.isEmpty()) {
            message = String.join(";", messages);
        }

        JsonErrorResponse.Error error = new JsonErrorResponse.Error(
                "", "Invalid parameters", message);
        JsonErrorResponse jsonErrorResponse = new JsonErrorResponse(error);

        return ResponseEntity.badRequest()
                .header("Content-Type", "application/json")
                .body(jsonErrorResponse);
    }
}