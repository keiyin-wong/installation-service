package com.wahshoon.ism.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {
    @Autowired
    private ServiceMapper serviceMapper;

    public List<ServiceVO> getAllServiceVOs() {
        return serviceMapper.getAllServiceVOs();
    }
}
