package com.wahshoon.ism.controller;

import com.wahshoon.ism.model.Order;
import com.wahshoon.ism.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/order")
public class OrderController {
    final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    OrderService orderService;

    @GetMapping(value = "/detail")
    public @ResponseBody Order getOrder(@RequestParam String orderId) {
        log.info("Getting order. [orderId={}]", orderId);
        Order order = null;
        order = orderService.getOrder(orderId);
        return order;
    }
}
