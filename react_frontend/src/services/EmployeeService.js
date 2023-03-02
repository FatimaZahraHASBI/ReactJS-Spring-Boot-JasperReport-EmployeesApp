import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employees";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    generatePdfReport(){
        // return axios.get("http://localhost:8080/report", {responseType: 'blob'})
        window.location.href = 'http://localhost:8080/report'
    }

    // generateHtmlReport(){
    //     return axios.get("http://localhost:8080/report/html")
    // }
}

export default new EmployeeService()