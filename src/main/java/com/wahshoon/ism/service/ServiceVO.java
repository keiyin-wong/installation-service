package com.wahshoon.ism.service;

import java.util.List;

public class ServiceVO {
    private Integer id;
    private String descriptionEnglish;
    private String descriptionChinese;
    private Boolean differentPrice;
    private Integer price;
    private Integer calculationType;

    private List<ServiceDiffPrice> serviceDiffPrices;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescriptionEnglish() {
        return descriptionEnglish;
    }

    public void setDescriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
    }

    public String getDescriptionChinese() {
        return descriptionChinese;
    }

    public void setDescriptionChinese(String descriptionChinese) {
        this.descriptionChinese = descriptionChinese;
    }

    public Boolean getDifferentPrice() {
        return differentPrice;
    }

    public void setDifferentPrice(Boolean differentPrice) {
        this.differentPrice = differentPrice;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getCalculationType() {
        return calculationType;
    }

    public void setCalculationType(Integer calculationType) {
        this.calculationType = calculationType;
    }

    public List<ServiceDiffPrice> getServiceDiffPrices() {
        return serviceDiffPrices;
    }

    public void setServiceDiffPrices(List<ServiceDiffPrice> serviceDiffPrices) {
        this.serviceDiffPrices = serviceDiffPrices;
    }
}
