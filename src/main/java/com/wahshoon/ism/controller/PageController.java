package com.wahshoon.ism.controller;


import com.wahshoon.ism.service.ServiceService;
import com.wahshoon.ism.service.ServiceVO;
import com.wahshoon.ism.util.ViewConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PageController {

    @Autowired
    ServiceService serviceService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/order.html")
    public ModelAndView getOrderPage() {
        return new ModelAndView(ViewConstant.ORDER_PAGE);
    }

    @RequestMapping(value = "/edit-order.html")
    public ModelAndView getOrderDetailPage(
        @RequestParam(value = "orderId") String orderId
    ) {
        log.info("Getting order detail page for orderId={}", orderId);
        log.info("Getting all serviceVOs");
        List<ServiceVO> serviceVOList = serviceService.getAllServiceVOs();
        log.info("Successfully retrieved all serviceVOs");
        Map<String,Object> parameters = new HashMap<>();
        parameters.put("orderId", orderId);
        parameters.put("serviceVOList", serviceVOList);
        return new ModelAndView(ViewConstant.EDIT_ORDER, parameters);
    }

    @RequestMapping(value = "/service.html")
    public ModelAndView getServicePage() {
        return new ModelAndView(ViewConstant.SERVICE_PAGE);
    }
}
