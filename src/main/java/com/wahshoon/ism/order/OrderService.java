package com.wahshoon.ism.order;

import com.wahshoon.ism.datatable.PaginationCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<OrderVO> getOrderVOListForDatatable(PaginationCriteria paginationCriteria) {
        return orderMapper.getOrderVOListForDatatable(
                paginationCriteria.getSortBy(),
                paginationCriteria.getRowStart(),
                paginationCriteria.getPageSize()
        );
    }

    public Integer getOrderCountForDatatable() {
        return orderMapper.getOrderCountForDatatable();
    }

    // Order Detail

    public Integer updateOrderDetail(String orderId, Integer lineNumber, OrderDetail orderDetail) {
        return orderMapper.updateOrderDetail(orderId, lineNumber, orderDetail);
    }
}
