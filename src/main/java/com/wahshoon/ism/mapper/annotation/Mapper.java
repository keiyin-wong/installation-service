package com.wahshoon.ism.mapper.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Mapper {
    /**
     * Specify bean name when using org.mybatis.spring.mapper.MapperScannerConfigurer
     */
    String name() default "";
}