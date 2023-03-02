package com.hasbi.backend_spring.service;

import com.hasbi.backend_spring.entities.Employee;
import com.hasbi.backend_spring.repositories.EmployeeRepository;
import jakarta.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    private EmployeeRepository repository;

    public String exportReport(HttpServletResponse response) throws IOException, JRException {
        List<Employee> employees = repository.findAll();
        //load file and compile it
        File file = ResourceUtils.getFile("classpath:employees.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("createdBy", "Fatima Zahra Hasbi");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        response.setContentType("application/x-download");
        response.addHeader("Content-disposition", "attachment; filename=EmployeesReport.pdf");
        OutputStream out = response.getOutputStream();

        JasperExportManager.exportReportToPdfStream(jasperPrint, out);

        return "report generated in pdf format";
    }

//    public String exportReport(String reportFormat) throws FileNotFoundException, JRException {
//        String path = "C:\\Users\\zertyui\\Desktop\\Report";
//        List<Employee> employees = repository.findAll();
//        //load file and compile it
//        File file = ResourceUtils.getFile("classpath:employees.jrxml");
//        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
//        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);
//        Map<String, Object> parameters = new HashMap<>();
//        parameters.put("createdBy", "Fatima Zahra Hasbi");
//        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
//        if (reportFormat.equalsIgnoreCase("html")) {
//            JasperExportManager.exportReportToHtmlFile(jasperPrint, path + "\\employees.html");
//        }
//        if (reportFormat.equalsIgnoreCase("pdf")) {
//            JasperExportManager.exportReportToPdfFile(jasperPrint, path + "\\employees.pdf");
//        }
//
//        return "report generated in path : " + path;
//    }

}
