package com.wahshoon.ism.error;

import org.springframework.http.HttpStatus;

public class CustomErrorExceptionBuilder {
    private final HttpStatus httpStatus;
    private String code;
    private String message;
    private String detail;

    private Throwable e;

    public CustomErrorExceptionBuilder(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public CustomErrorExceptionBuilder withCode(String code) {
        this.code = code;
        return this;
    }

    public CustomErrorExceptionBuilder withMessage(String message) {
        this.message = message;
        return this;
    }

    public CustomErrorExceptionBuilder withDetail(String detail) {
        this.detail = detail;
        return this;
    }

    public CustomErrorExceptionBuilder withException(Throwable e) {
        this.e = e;
        return this;
    }

    public CustomErrorException build() {
        return new CustomErrorException(httpStatus, code, message, detail, e);
    }

    public static class CustomErrorException extends RuntimeException {
        private String code;
        private String message;
        private String detail;
        private HttpStatus httpStatus;

        private CustomErrorException() { }

        private CustomErrorException(
                HttpStatus httpStatus,
                String code,
                String message,
                String detail,
                Throwable e) {
            super(message, e);
            this.code = code;
            this.message = message;
            this.detail = detail;
            this.httpStatus = httpStatus;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getDetail() {
            return detail;
        }

        public void setDetail(String detail) {
            this.detail = detail;
        }

        public HttpStatus getHttpStatus() {
            return httpStatus;
        }

        public void setHttpStatus(HttpStatus httpStatus) {
            this.httpStatus = httpStatus;
        }
    }
}
