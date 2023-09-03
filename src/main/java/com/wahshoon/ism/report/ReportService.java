package com.wahshoon.ism.report;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfReader;
import com.wahshoon.ism.order.Order;
import com.wahshoon.ism.order.OrderService;
import com.wahshoon.ism.system.parameter.SystemParameter;
import com.wahshoon.ism.system.parameter.SystemParameterConstants;
import com.wahshoon.ism.system.parameter.SystemParameterService;
import net.sf.jasperreports.engine.*;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.dbcp2.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.wahshoon.ism.util.CommonConstants.INVOICE_JRXML_PATH;

@Service
public class ReportService {

    @Autowired
    @Qualifier("springJdbcDataSources")
    private BasicDataSource springJdbcDataSources;

    @Autowired
    private OrderService orderService;

    @Autowired
    private SystemParameterService systemParameterService;


    @Value("${sketch.basepath}")
    private String sketchBasePath;

    final Logger log = LoggerFactory.getLogger(this.getClass());


    /**
     * Fill outputStream with jasper invoice pdf
     *
     * @param parameterMap parameter map for jasper report
     * @param outputStream output stream to be filled with jasper pdf
     */
    public void fillOutputStreamWithJasperPdf(
            Map<String, Object> parameterMap,
            OutputStream outputStream
    ) throws JRException, SQLException {
        InputStream jasperInputStream = this.getClass().getResourceAsStream(INVOICE_JRXML_PATH);
        JasperReport jasperDesign = JasperCompileManager.compileReport(jasperInputStream);
        JasperPrint jasperPrint = JasperFillManager.fillReport(
                jasperDesign,
                parameterMap,
                springJdbcDataSources.getConnection()
        );
        JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
    }


    public void generateOrderInvoicePdf(
            String orderId,
            OutputStream outputStream,
            boolean isMergeWithSketch
    ) throws JRException, SQLException, DocumentException, IOException {
        Map<String, Object> parameterMap = new HashedMap<>();
        parameterMap.put("orderId", orderId);

        Order order = orderService.getOrder(orderId);
        parameterMap.put("remarks", order.getRemarks());

        // Get the system parameter for the invoice

        SystemParameter companyName = systemParameterService.getSystemParameterByName(SystemParameterConstants.COMPANY_NAME);
        SystemParameter companyAddress = systemParameterService.getSystemParameterByName(SystemParameterConstants.COMPANY_ADDRESS);
        SystemParameter companyPhone = systemParameterService.getSystemParameterByName(SystemParameterConstants.COMPANY_PHONE);
        SystemParameter termsAndConditions = systemParameterService.getSystemParameterByName(SystemParameterConstants.TERMS_AND_CONDITIONS);

        parameterMap.put("companyName", companyName.getValue());
        parameterMap.put("companyAddress", companyAddress.getValue());
        parameterMap.put("companyPhone", companyPhone.getValue());
        parameterMap.put("termsAndConditions", termsAndConditions.getValue());

        if (isMergeWithSketch) {
            List<InputStream> pdfInputStreamList = new ArrayList<>();

            // Create an output stream to store the jasper report pdf
            ByteArrayOutputStream jasperReportOutputStream = new ByteArrayOutputStream();
            // Write the jasper report pdf to the output stream
            fillOutputStreamWithJasperPdf(parameterMap, jasperReportOutputStream);

            // Convert the output stream to input stream
            ByteArrayInputStream jasperReportInputStream = new ByteArrayInputStream(jasperReportOutputStream.toByteArray());
            // Add the input stream to the list
            pdfInputStreamList.add(jasperReportInputStream);

            // Add the sketch pdf to the list

            String sketchFileName = orderId + ".pdf";
            // Get the invoice sketch file from the path
            File sketchFile = new File(sketchBasePath + sketchFileName);

            if (sketchFile.exists()) {
                // Convert the sketch file to input stream
                InputStream sketchInputStream = null;
                try {
                    sketchInputStream = new FileInputStream(sketchBasePath + sketchFileName);
                } catch (FileNotFoundException e) {
                    log.error("Sketch file not found", e);
                }
                // Add the input stream to the list
                pdfInputStreamList.add(sketchInputStream);
            } else {
                log.error("Sketch file not found. [orderId={}]", orderId);
            }

            // Merge the pdfs
            mergePdfFiles(pdfInputStreamList, outputStream);

        } else {
            fillOutputStreamWithJasperPdf(parameterMap, outputStream);
        }
    }

    /**
     * Merge multiple pdf into one pdf
     *
     * @param inputPdfList List of pdf input stream
     * @param os Output Stream to write the merged pdf
     * @throws IOException
     * @throws DocumentException
     */
    public void mergePdfFiles(List<InputStream> inputPdfList, OutputStream os) throws IOException, DocumentException {
        Document document = new Document();

        List<PdfReader> readers = new ArrayList<>();
        int totalPages = 0;

        // Create Readers for the pdfs by passing input streams.
        for (InputStream pdf : inputPdfList) {
            PdfReader pdfReader = new PdfReader(pdf);
            readers.add(pdfReader);
            totalPages = totalPages + pdfReader.getNumberOfPages();
        }

        // Create a writer for the outputstream
        PdfCopy copy = new PdfCopy(document, os);
        int currentPdfReaderPage = 1;

        // Open document.
        document.open();

        // Loop through the PDF files and add to the output.
        for (PdfReader pdfReader : readers) {
            while(currentPdfReaderPage <= pdfReader.getNumberOfPages()) {
                document.newPage();
                copy.addPage(copy.getImportedPage(pdfReader, currentPdfReaderPage));
                currentPdfReaderPage++;
            }
            currentPdfReaderPage = 1;
        }

        // Close the output stream
        os.flush();
        document.close();
        os.close();
    }

}
