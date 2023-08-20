package com.wahshoon.ism.service;

import com.wahshoon.ism.mapper.annotation.Mapper;

import java.util.List;

@Mapper
public interface ServiceMapper {
    List<ServiceVO> getAllServiceVOs();
}
