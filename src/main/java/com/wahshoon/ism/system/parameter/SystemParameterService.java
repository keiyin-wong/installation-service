package com.wahshoon.ism.system.parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SystemParameterService {
    @Autowired
    private SystemParameterMapper systemParameterMapper;

    public SystemParameter getSystemParameterByName(String name) {
        return systemParameterMapper.getSystemParameterByName(name);
    }
}
