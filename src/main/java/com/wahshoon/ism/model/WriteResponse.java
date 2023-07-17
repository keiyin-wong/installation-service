package com.wahshoon.ism.model;

public class WriteResponse {
    String status;
    Object data;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }

    public static class Status {
        public static final String SUCCESS = "success";
        public static final String FAIL = "fail";

        private Status() {}
    }
}
