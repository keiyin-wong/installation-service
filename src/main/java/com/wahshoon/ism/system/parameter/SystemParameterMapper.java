package com.wahshoon.ism.system.parameter;

import com.wahshoon.ism.mapper.annotation.Mapper;

@Mapper
public interface SystemParameterMapper {
    SystemParameter getSystemParameterByName(String name);
}
