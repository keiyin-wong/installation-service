package com.wahshoon.ism.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MessageSourceUtil {
    @Autowired
    private MessageSource messageSource;

    public String getMessage(String code) {
        return getMessage(code, null);
    }

    public String getMessage(String code, Object[] args) {
        return getMessage(code, args, "");
    }

    public String getMessage(String code, Object[] args, String defaultMsg) {
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage(code, args, defaultMsg, locale);
    }

    public String getMessageWithArgs(String code, Object... args) {
        return this.getMessage(code, args);
    }

    public String getInternalServerErrorSorryMessage() {
        return this.getMessage("InternalServerException.message.sorry");
    }
    public String getInternalServerErrorDetailMessage() {
        return this.getMessage("InternalServerException.message.detail");
    }
}
