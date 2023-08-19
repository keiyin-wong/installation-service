package com.wahshoon.ism.datatable;

public enum SortOrderEnum {
    /** The asc. */
    ASC("ASC"),
    /** The desc. */
    DESC("DESC");

    /** The value. */
    private final String value;

    /**
     * Instantiates a new sort order.
     *
     * @param v
     *            the v
     */
    SortOrderEnum(String v) {
        value = v;
    }

    /**
     * From value.
     *
     * @param v
     *            the v
     * @return the sort order
     */
    public static SortOrderEnum fromValue(String v) {
        for (SortOrderEnum c : SortOrderEnum.values()) {
            if(c.value().equalsIgnoreCase(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

    /**
     * Value.
     *
     * @return the string
     */
    public String value() {
        return value;
    }
}
