package com.wahshoon.ism.error;

public class JsonErrorResponse {
    private Error error;

    public JsonErrorResponse() {}

    public JsonErrorResponse(Error error) {
        this.error = error;
    }

    public Error getError() {
        return error;
    }

    public void setError(Error error) {
        this.error = error;
    }

    public static class Error {
        private String code;
        private String message;
        private String detail;

        public Error() { }

        public Error(String code, String message, String detail) {
            this.code = code;
            this.message = message;
            this.detail = detail;
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
    }
}
