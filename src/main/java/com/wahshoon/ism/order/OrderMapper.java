package com.wahshoon.ism.order;

import com.wahshoon.ism.datatable.SortOrderEnum;
import com.wahshoon.ism.mapper.annotation.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
    Order getOrder(String orderId);

    OrderVO getOrderVOWithoutTotalById(String orderId);

    List<OrderVO> getOrderVOListForDatatable(
        @Param("sortBy") Map<String, SortOrderEnum> sortBy,
        @Param("startRow") Integer startRow,
        @Param("limit") Integer limit
    );

    Integer getOrderCountForDatatable();

    // ============OrderDetail================

    List<OrderDetail> getOrderDetailListByOrderId(String orderId);
}
