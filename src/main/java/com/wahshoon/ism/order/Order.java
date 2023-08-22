package com.wahshoon.ism.order;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Order {
	private String id;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date date;
	private String remarks;
	private String comments;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
}
