package com.wahshoon.ism.controller;

import com.wahshoon.ism.datatable.DatatableRequest;
import com.wahshoon.ism.datatable.JsonDatatableQueryResponse;
import com.wahshoon.ism.datatable.PaginationCriteria;
import com.wahshoon.ism.error.CustomErrorHandling;
import com.wahshoon.ism.service.ServiceService;
import com.wahshoon.ism.service.ServiceVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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

    @PostMapping(value = "/vo/datatable", produces = "application/json")
    public JsonDatatableQueryResponse getServiceVOForDatatable(
            HttpServletRequest request
    ) {
        int recordsTotal = 0;

        log.info("Retrieving service vo list for datatable.");
        DatatableRequest datatableRequest = new DatatableRequest(request);
        PaginationCriteria paginationCriteria = datatableRequest.getPaginationRequest();

        if (paginationCriteria.getPageSize() == -1) {
            paginationCriteria.setPageSize(null);
        }

        List<ServiceVO> resultList = serviceService.getServiceVOForDatatable(paginationCriteria);

        JsonDatatableQueryResponse jsonDatatableQueryResponse = new JsonDatatableQueryResponse();
        jsonDatatableQueryResponse.setRecordsTotal(recordsTotal);
        jsonDatatableQueryResponse.setRecordsFiltered(recordsTotal);
        jsonDatatableQueryResponse.setData(resultList);
        jsonDatatableQueryResponse.setDraw(datatableRequest.getDraw());
        log.info("Successfully retrieved service vo list for datatable. ");
        log.debug("The json datatable response is {}. ", jsonDatatableQueryResponse);
        return jsonDatatableQueryResponse;
    }

}
