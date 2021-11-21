import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { addEmployee } from '../../actions/userActions';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Axios from 'axios';


class EmployeeReport extends Component {
    constructor(){
        super()
        this.state={
            empName: '' , empDesignation: '', amount: '', isDisable: false
        }
        this.addEmployee = this.addEmployee.bind(this)
    }

    // const [totalStats, setTotalStats] = useState([])
    // const [showLegend] = useState(false)
    // const [userData] = useState(getUser())
    // const [orderStatusName, setOrderStatusName] = useState([])
    // const [orderStatusValue, setOrderStatusValue] = useState([])


    // useEffect(() => {
    //     // getCustomerStats()
    //     // getOrderStats()
    //     // eslint-disable-next-line
    //     checkUser()
    // }, [])

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        Axios.get('api/users/getemployee')
        .then(res => {
            if(res){
                console.log(res, "response")
            }
        }).catch( err => {
            console.log(err)
        })
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
        if (res.success) {
            NotificationManager.success(res.message);
        }
        else {
            NotificationManager.error(res.message);
            this.setState({ signInError: res.message, isDisable: false, });
        }
    }

    render(){
        return (
            <div className="row text-center">
                <div className="col-md-1"></div>
                <div className="col-md-12 col-12">
                    <h2 className="m-4 text-center">Apply for petty cash</h2>
    
                    <div className="mt-4 p-3">
                        <Form>
                            <FormGroup className="text-left">
                                <Label className="mr-sm-2 ">Employee Name</Label>
                                <Input type="text" name="empName" id="empName" placeholder="Name" onChange={this.onChange} />
                            </FormGroup>
    
                            <FormGroup className="text-left">
                                <Label className="mr-sm-2 ">Employee Designation</Label>
                                <Input type="text" name="empDesignation" id="empDesignation" placeholder="Designation" onChange={this.onChange} />
                            </FormGroup>
    
                            <FormGroup className="text-left">
                                <Label className="mr-sm-2">Required Amount</Label>
                                <Input type="number" name="amount" id="amount" placeholder="Amount" onChange={this.onChange} />
                            </FormGroup>

                        </Form>
                        <div className="row mt-2">
                            <div className="col-md">
                                <button type="button" className="btn float-right" style={{ backgroundColor: 'rgb(0, 163, 181)' }} type="submit"  onClick={() => this.addEmployee()} >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}

export default EmployeeReport