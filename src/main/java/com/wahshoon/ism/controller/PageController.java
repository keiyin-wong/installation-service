package com.wahshoon.ism.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/order.html")
    public ModelAndView getOrderPage() {
        return new ModelAndView("order");
    }

}
