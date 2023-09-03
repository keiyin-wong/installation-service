package com.wahshoon.ism.controller;

import com.itextpdf.text.DocumentException;
import com.wahshoon.ism.datatable.DatatableRequest;
import com.wahshoon.ism.datatable.JsonDatatableQueryResponse;
import com.wahshoon.ism.datatable.PaginationCriteria;
import com.wahshoon.ism.error.CustomErrorExceptionBuilder;
import com.wahshoon.ism.error.CustomErrorHandling;
import com.wahshoon.ism.model.WriteResponse;
import com.wahshoon.ism.order.Order;
import com.wahshoon.ism.order.OrderDetail;
import com.wahshoon.ism.order.OrderService;
import com.wahshoon.ism.order.OrderVO;
import com.wahshoon.ism.report.ReportService;
import com.wahshoon.ism.util.MessageSourceUtil;
import net.sf.jasperreports.engine.JRException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Digits;
import java.io.IOException;
import java.sql.SQLException;
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

    @Autowired
    ReportService reportService;

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

    @GetMapping(value = "/{orderId}")
    public Order getOrderById(
            @PathVariable
            @Digits(integer = 10, fraction = 0, message = "orderId must be a number")
            String orderId
    ) {
        log.info("Getting order by id. [orderId={}]", orderId);
        Order order = orderService.getOrder(orderId);
        if (order == null) {
            throw new CustomErrorExceptionBuilder(HttpStatus.NOT_FOUND)
                    .withMessage(messageSourceUtil.getMessage("controller.order.vo.error.notFound.message"))
                    .withDetail(messageSourceUtil.getMessageWithArgs(
                            "controller.order.vo.error.notFound.detail",
                            orderId
                    ))
                    .build();
        }
        log.info("Successfully retrieved order by id. [orderId={}]", orderId);
        return order;
    }

    @PostMapping(value = "/{orderId}/update")
    public WriteResponse updateOrderById(
            @PathVariable("orderId")
            String orderId,
            @ModelAttribute
            Order order
    ) {
        log.info("Updating order. [orderId={}]", orderId);
        Integer updateCount = orderService.updateOrder(orderId, order);
        WriteResponse writeResponse = new WriteResponse();
        if (updateCount > 0) {
            log.info("Successfully updated order. [orderId={}]", orderId);
            writeResponse.setStatus(true);
        } else {
            log.info("Failed to update order. [orderId={}]", orderId);
            writeResponse.setStatus(false);
        }
        return writeResponse;
    }


    @PostMapping(value = "/create")
    public WriteResponse createOrder(
            @ModelAttribute
            Order order
    ) {
        log.info("Creating order.");
        WriteResponse writeResponse = new WriteResponse();
        if (orderService.createOrder(order) > 0) {
            log.info("Successfully created order.");
            writeResponse.setStatus(true);
            writeResponse.setData(order);
        } else {
            log.info("Failed to create order.");
            writeResponse.setStatus(false);
        }
        return writeResponse;
    }

    @PostMapping(value = "/{orderId}/delete")
    public WriteResponse deleteOrder(
            @PathVariable("orderId")
            String orderId
    ) {
        log.info("Deleting order. [orderId={}]", orderId);
        WriteResponse writeResponse = new WriteResponse();
        if (orderService.deleteOrder(orderId) > 0) {
            log.info("Successfully deleted order. [orderId={}]", orderId);
            writeResponse.setStatus(true);
        } else {
            log.info("Failed to delete order. [orderId={}]", orderId);
            writeResponse.setStatus(false);
        }
        return writeResponse;
    }


    // ==============================================
    // Order Report
    // ==============================================

    @GetMapping(value = "/{orderId}/invoice")
    public void getOrderInvoice(
            @PathVariable("orderId")
            String orderId,
            @RequestParam(required=false, defaultValue = "true")boolean inline,
            @RequestParam(required=false, defaultValue = "false")boolean mergeWithSketch,
            HttpServletRequest request,
            HttpServletResponse response) {
        log.info("Getting order invoice. [orderId={}, inline={}, mergeWithSketch={}]",
                orderId,
                inline,
                mergeWithSketch);
        String fileName = "invoice_" + orderId + ".pdf";
        if (inline) {
            response.setHeader("Content-Disposition", "inline; filename=" + fileName);
        } else {
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        }
        try {
            reportService.generateOrderInvoicePdf(orderId, response.getOutputStream(),mergeWithSketch);
        } catch (IOException | JRException | SQLException | DocumentException e) {
            log.error("Failed to get order invoice. [orderId={}]", orderId, e);
            throw new RuntimeException(e);
        }
    }


    // ==============================================
    // Order Detail
    // ==============================================

    @PostMapping(value = "/{orderIdParam}/line-number/{lineNumberParam}/order-details/update")
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

    @PostMapping(value = "/{orderIdParam}/order-details/create")
    public WriteResponse createOrderDetail(
            @PathVariable("orderIdParam")
            String orderId,
            @ModelAttribute
            OrderDetail orderDetail
    ) {
        log.info("Creating order detail. [orderId={}]", orderId);
        WriteResponse writeResponse = new WriteResponse();
        orderDetail.setOrderId(orderId);
        log.info("OrderDetail to be created. {}", orderDetail.toShortPrefixString());
        orderService.createOrderDetail(orderDetail);
        log.info("Successfully created order detail. [orderId={}]", orderId);
        writeResponse.setStatus(true);
        return writeResponse;
    }

    @PostMapping(value = "/{orderIdParam}/line-number/{lineNumberParam}/order-details/delete")
    public WriteResponse deleteOrderDetail(
            @PathVariable("orderIdParam") String orderId,
            @PathVariable("lineNumberParam") Integer lineNumber
    ) {
        log.info("Deleting order detail. [orderId={}, lineNumber={}]", orderId, lineNumber);
        WriteResponse writeResponse = new WriteResponse();
        if (orderService.deleteOrderDetail(orderId, lineNumber) > 0) {
            log.info("Successfully deleted order detail. [orderId={}, lineNumber={}]", orderId, lineNumber);
            writeResponse.setStatus(true);
        } else {
            log.info("Failed to delete order detail. [orderId={}, lineNumber={}]", orderId, lineNumber);
            writeResponse.setStatus(false);
        }
        return writeResponse;
    }
}
