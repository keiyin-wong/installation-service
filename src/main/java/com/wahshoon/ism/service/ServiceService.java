package com.wahshoon.ism.service;

import com.wahshoon.ism.datatable.PaginationCriteria;
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
    public List<ServiceVO> getServiceVOForDatatable(
            PaginationCriteria paginationCriteria
    ) {
        return serviceMapper.getServiceVOForDatatable(
            paginationCriteria.getSortBy(),
            paginationCriteria.getRowStart(),
            paginationCriteria.getPageSize()
        );
    }
}
