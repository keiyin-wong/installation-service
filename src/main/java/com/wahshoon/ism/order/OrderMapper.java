package com.wahshoon.ism.order;

import com.wahshoon.ism.datatable.SortOrderEnum;
import com.wahshoon.ism.mapper.annotation.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
    Order getOrder(String orderId);

    OrderVO getOrderVOWithoutTotalById(String orderId);

    /**
     * Get order vo list for datatable, without order details
     *
     * @param orderId - the order id
     * @param startDate - the start date
     * @param endDate - the end date
     * @param remarks - the remarks, for internal use
     * @param comments - the comments, for external use, will be shown to customer
     * @param sortBy - the sort by, key is the column name, value is the sort order
     * @param startRow - the start row
     * @param limit - the limit
     *
     * @return - the order vo list
     */
    List<OrderVO> getOrderVOListForDatatable(
        @Param("orderId") String orderId,
        @Param("startDate") Date startDate,
        @Param("endDate") Date endDate,
        @Param("remarks") String remarks,
        @Param("comments") String comments,
        @Param("sortBy") Map<String, SortOrderEnum> sortBy,
        @Param("startRow") Integer startRow,
        @Param("limit") Integer limit
    );

    Integer getLargestOrderIdPlusOne();
    Integer getLargestLineNumberByOrderId(String orderId);

    Integer getOrderCountForDatatable(
            @Param("orderId") String orderId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("remarks") String remarks,
            @Param("comments") String comments
    );

    Integer updateOrder(
            @Param("id")
            String orderId,
            @Param("order")
            Order order
    );

    Integer createOrder(Order order);

    Integer deleteOrder(String orderId);

    // ==============================================
    // Order Detail
    // ==============================================

    List<OrderDetailVO> getOrderDetailListByOrderId(String orderId);


    Integer updateOrderDetail(
            @Param("orderId")
            String orderId,
            @Param("lineNumber")
            Integer lineNumber,
            @Param("orderDetail")
            OrderDetail orderDetail
    );

    Integer createOrderDetail(OrderDetail orderDetail);

    Integer deleteOrderDetail(
            @Param("orderId")
            String orderId,
            @Param("lineNumber")
            Integer lineNumber
    );
}
