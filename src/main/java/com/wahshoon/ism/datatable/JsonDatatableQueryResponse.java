package com.wahshoon.ism.datatable;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class JsonDatatableQueryResponse {
    private String draw;

    /** The records filtered. */
    private int recordsFiltered;

    /** The records total. */
    private int recordsTotal;

    /** The list of data objects. */
    @SerializedName("data")
    List<?> data;

    public String getJson() {
        return new Gson().toJson(this);
    }

    public String getDraw() {
        return draw;
    }

    public void setDraw(String draw) {
        this.draw = draw;
    }

    public int getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(int recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public int getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(int recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<?> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "JsonDatatableQueryResponse["
                + "draw=" + this.draw
                + ", recordsFiltered=" + this.recordsFiltered
                + ", recordsTotal=" + this.recordsTotal
                + ", dataListSize=" + this.data.size()
                + "]";
    }
}
