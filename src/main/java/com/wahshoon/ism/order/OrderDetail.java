package com.wahshoon.ism.order;


import java.util.Date;

public class OrderDetail {
	private String orderId;
	private Integer lineNumber;
	private Integer serviceId;
	private String description;
	private Double width;
	private Double height;
	private Integer quantity;
	private Integer finalPrice;
	private Date updatedDate;
	private String updatedBy;

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public Integer getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getWidth() {
		return width;
	}

	public void setWidth(Double width) {
		this.width = width;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(Integer finalPrice) {
		this.finalPrice = finalPrice;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	@Override
	public String toString() {
		return "["
				+ "orderId=" + orderId + ", "
				+ "lineNumber=" + lineNumber + ", "
				+ "description=" + description + ", "
				+ "width=" + width + ", "
				+ "height=" + height + ", "
				+ "quantity=" + quantity + ", "
				+ "finalPrice=" + finalPrice + ", "
				+ "]";
	}
}
