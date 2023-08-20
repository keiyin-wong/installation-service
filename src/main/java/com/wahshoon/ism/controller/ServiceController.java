package com.wahshoon.ism.controller;

import com.wahshoon.ism.error.CustomErrorHandling;
import com.wahshoon.ism.service.ServiceService;
import com.wahshoon.ism.service.ServiceVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/services")
@CustomErrorHandling
@Validated
public class ServiceController {
    final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ServiceService serviceService;


    @GetMapping(value = "/vo", produces = "application/json")
    public List<ServiceVO> getAllServiceVOs() {
        log.info("Getting all serviceVOs");
        List<ServiceVO> serviceVOList = serviceService.getAllServiceVOs();
        log.info("Successfully retrieved all serviceVOs");
        return serviceVOList;
    }

}
