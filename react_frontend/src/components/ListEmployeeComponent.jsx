import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { withRouter } from 'react-router-dom'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.generatePdfReport = this.generatePdfReport.bind(this);
        this.generateHtmlReport = this.generateHtmlReport.bind(this);
    }

    deleteEmployee(id){
        var result = window.confirm("Want to delete?");
        if (result) {
            EmployeeService.deleteEmployee(id).then( res => {
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
            });
        }
        
    }
    viewEmployee(id){
        // eslint-disable-next-line
        this.props.history.push('/view-employee/'+id);
    }
    editEmployee(id){
        // eslint-disable-next-line
        this.props.history.push('/add-employee/'+id);
    }


    generatePdfReport(){
        EmployeeService.generatePdfReport();
        // alert('The report employees.pdf is being uploaded to Desktop/report folder');
        // window.open( "C:\\Users\\zertyui\\Desktop\\report\\employees.pdf", '_blank');
    }

    generateHtmlReport(){
        EmployeeService.generateHtmlReport();
        alert('The report employees.html is being uploaded to Desktop/report folder');
        // window.open( "C:\\Users\\zertyui\\Desktop\\report\\employees.html", '_blank');
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                 <h2 style={{marginTop: "10px"}} className="text-center">Employees List</h2>
                 <div style={{marginTop: "20px"}} className = "form-group">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button> 
                    <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={this.generatePdfReport}> Generate PDF report</button> 
                    {/* <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={this.generateHtmlReport}> Generate HTML report</button>  */}
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee Name</th>
                                    <th> Employee Email</th>
                                    <th> Employee Salary</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> {employee.name} </td>   
                                             <td> {employee.email}</td>
                                             <td> {employee.salary}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default withRouter(ListEmployeeComponent)