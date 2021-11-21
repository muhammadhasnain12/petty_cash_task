import React, { Component } from 'react';
import { Alert, classNamesShape } from 'reactstrap';
import { addEmployee, getEmployee } from '../../actions/userActions';
import { NotificationManager, NotificationContainer } from 'react-notifications';


class AccountsReport extends Component {
    constructor() {
        super()
        this.state = {
            empName: '', empDesignation: '', amount: '', isDisable: false, data: [], success: false
        }
        this.addEmployee = this.addEmployee.bind(this)
        this.getEmployee = this.getEmployee.bind(this)
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        this.getEmployee()
    }

    async getEmployee() {
        const res = await getEmployee()
        console.log(res, "response")
        this.setState({ data: res.payload, success: res.success })
    }

    async addEmployee() {
        // this.setState({ isDisable: true })

        const employeeDetails = {
            empName: this.state.empName,
            empDesignation: this.state.empDesignation,
            amount: this.state.amount
        }
        console.log(employeeDetails)
        const res = await addEmployee(employeeDetails);
        if (res) {
            NotificationManager.success(res.message);
        }
        else {
            NotificationManager.error(res.message);
            this.setState({ signInError: res.message, isDisable: false, });
        }
    }

    render() {
        let { success, data } = this.state
        console.log('data', data)
        return (
            <div className="container">
                            <div className="row text-center">
                {/* <div className="col-md-1"></div> */}
                <div className="col-md-12">
                    <h2 className="m-4 text-center">Employees Petty Cash approval</h2>
                    {
                        success ? (
                            <div className="mt-1">
                                <Alert color="primary">
                                    This is {data[0].empName}. His deignation is {data[0].empDesignation}. He Applied for {data[0].amount} Rs.
                                    <button className="btn btn-success ml-2"> Approved </button> <button className="btn btn-danger ml-2"> Rejected </button> 
                                </Alert>
                            </div>
                        ) : (<div>Loading....</div>)
                    }
                </div>
                <NotificationContainer />
            </div>
            </div>
        )
    }
}

export default AccountsReport