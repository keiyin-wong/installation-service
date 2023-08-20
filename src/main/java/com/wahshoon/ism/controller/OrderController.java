package com.wahshoon.ism.controller;

import com.wahshoon.ism.datatable.DatatableRequest;
import com.wahshoon.ism.datatable.JsonDatatableQueryResponse;
import com.wahshoon.ism.datatable.PaginationCriteria;
import com.wahshoon.ism.error.CustomErrorExceptionBuilder;
import com.wahshoon.ism.error.CustomErrorHandling;
import com.wahshoon.ism.model.WriteResponse;
import com.wahshoon.ism.order.OrderDetail;
import com.wahshoon.ism.order.OrderService;
import com.wahshoon.ism.order.OrderVO;
import com.wahshoon.ism.util.MessageSourceUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Digits;
import java.util.List;


@RestController
@RequestMapping(value = "/orders")
@CustomErrorHandling
@Validated
public class OrderController {
    final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    OrderService orderService;

    @Autowired
    MessageSourceUtil messageSourceUtil;

    @PostMapping(value = "/datatable")
    public JsonDatatableQueryResponse getOrderVOById(
            HttpServletRequest request
    ) {
        DatatableRequest datatableRequest = new DatatableRequest(request);
        PaginationCriteria paginationCriteria = datatableRequest.getPaginationRequest();
        log.info("Getting order list for datatable");
        List<OrderVO> orderVOList = orderService.getOrderVOListForDatatable(paginationCriteria);
        JsonDatatableQueryResponse response = new JsonDatatableQueryResponse();
        int recordsTotal = orderService.getOrderCountForDatatable();
        log.info("Successfully retrieved order list for datatable. [recordsTotal={}]", recordsTotal);
        response.setData(orderVOList);
        response.setDraw(datatableRequest.getDraw());
        response.setRecordsFiltered(recordsTotal);
        response.setRecordsTotal(recordsTotal);
        return response;
    }


    @GetMapping(value = "/{orderId}/vo")
    public OrderVO getOrderVOById(
            @PathVariable
            @Digits(integer = 10, fraction = 0, message = "orderId must be a number")
            String orderId
    ) {
        log.info("Getting orderVO by id. [orderId={}]", orderId);
        OrderVO orderVO = orderService.getOrderVOById(orderId);
        if (orderVO == null) {
            throw new CustomErrorExceptionBuilder(HttpStatus.NOT_FOUND)
                    .withMessage(messageSourceUtil.getMessage("controller.order.vo.error.notFound.message"))
                    .withDetail(messageSourceUtil.getMessageWithArgs(
                        "controller.order.vo.error.notFound.detail",
                            orderId
                    ))
                    .build();
        }
        log.info("Successfully retrieved orderVO by id. [orderId={}]", orderId);
        return orderVO;
    }

    // Order Detail
    @PostMapping(value = "/{orderIdParam}/line-number/{lineNumberParam}/order-detail/update")
    public WriteResponse updateOrderDetail(
            @PathVariable("orderIdParam")
            String orderId,
            @PathVariable("lineNumberParam")
            Integer lineNumber,
            @ModelAttribute
            OrderDetail orderDetail
    ) {
        log.info("Updating order detail. [orderId={}, lineNumber={}]", orderId, lineNumber);
        Integer updateCount = orderService.updateOrderDetail(orderId, lineNumber, orderDetail);
        WriteResponse writeResponse = new WriteResponse();
        if (updateCount > 0) {
            log.info("Successfully updated order detail. [orderId={}, lineNumber={}]", orderId, lineNumber);
            writeResponse.setStatus(true);
        } else {
            log.info("Failed to update order detail. [orderId={}, lineNumber={}]", orderId, lineNumber);
            writeResponse.setStatus(false);
        }
        return writeResponse;
    }

}
