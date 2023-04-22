package com.wahshoon.ism.mapper;

import com.wahshoon.ism.mapper.annotation.Mapper;
import com.wahshoon.ism.model.Order;

@Mapper
public interface OrderMapper {
    Order getOrder(String orderId);
}
