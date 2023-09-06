package com.wahshoon.ism.order;

import com.wahshoon.ism.datatable.PaginationCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public Order getOrder(String orderId) {
        return orderMapper.getOrder(orderId);
    }

    public OrderVO getOrderVOById(String orderId) {
        OrderVO orderVO = orderMapper.getOrderVOWithoutTotalById(orderId);

        if (orderVO != null) {
            List<OrderDetailVO> orderDetailList = orderMapper.getOrderDetailListByOrderId(orderId);
            orderVO.setOrderDetails(orderDetailList);
        }

        return orderVO;
    }

    /**
     * Get order vo list for datatable, without order details
     *
     * @param paginationCriteria
     * @return
     */
    public List<OrderVO> getOrderVOListForDatatable(
            String orderId,
            Date startDate,
            Date endDate,
            PaginationCriteria paginationCriteria
    ) {
        return orderMapper.getOrderVOListForDatatable(
                orderId,
                startDate,
                endDate,
                paginationCriteria.getSortBy(),
                paginationCriteria.getRowStart(),
                paginationCriteria.getPageSize()
        );
    }

    public Integer getOrderCountForDatatable(
            String orderId,
            Date startDate,
            Date endDate
    ) {
        return orderMapper.getOrderCountForDatatable(
                orderId,
                startDate,
                endDate
        );
    }

    public Integer updateOrder(String orderId, Order order) {
        return orderMapper.updateOrder(orderId, order);
    }

    public Integer createOrder(Order order) {
        // Get the largest order id
        Integer orderIdInt = orderMapper.getLargestOrderIdPlusOne();
        String orderId = orderIdInt.toString();
        order.setId(orderId);
        return orderMapper.createOrder(order);
    }

    public Integer deleteOrder(String orderId) {
        return orderMapper.deleteOrder(orderId);
    }

    // ==============================================
    // Order Detail
    // ==============================================

    public Integer updateOrderDetail(String orderId, Integer lineNumber, OrderDetail orderDetail) {
        return orderMapper.updateOrderDetail(orderId, lineNumber, orderDetail);
    }

    @Transactional(value = "transactionManager", rollbackFor = Throwable.class)
    public void createOrderDetail(OrderDetail orderDetail) {
        Integer largestLineNumber = orderMapper.getLargestLineNumberByOrderId(orderDetail.getOrderId());
        if (largestLineNumber == null) {
            largestLineNumber = 0;
        }
        orderDetail.setLineNumber(largestLineNumber + 1);
        orderMapper.createOrderDetail(orderDetail);
    }

    public Integer deleteOrderDetail(String orderId, Integer lineNumber) {
        return orderMapper.deleteOrderDetail(orderId, lineNumber);
    }
}
