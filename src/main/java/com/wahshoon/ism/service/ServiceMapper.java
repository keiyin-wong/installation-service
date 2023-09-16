package com.wahshoon.ism.service;

import com.wahshoon.ism.datatable.SortOrderEnum;
import com.wahshoon.ism.mapper.annotation.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ServiceMapper {
    List<ServiceVO> getAllServiceVOs();
    List<ServiceVO> getServiceVOForDatatable(
        @Param("sortBy") Map<String, SortOrderEnum> sortBy,
        @Param("startRow") Integer startRow,
        @Param("limit") Integer limit
    );
}
