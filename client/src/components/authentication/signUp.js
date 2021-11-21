import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { addUser } from '../../actions/userActions';
import { NotificationManager, NotificationContainer } from 'react-notifications';


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            storageToken: JSON.parse(localStorage.getItem('react_login_app')),
            signUpError: '',
            userName: '',
            email: '',
            password: '',
            isDisable: false,
        };

        this.onSignUp = this.onSignUp.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSignUp() {
        this.setState({ isDisable: true })
        const newUser = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }
        const res = await addUser(newUser);
        console.log(res);
        if (res.success) {
            NotificationManager.success(res.message);
            this.setState({ signUpError: '', isDisable: false });
        }
        else {
            NotificationManager.error(res.message);
            this.setState({ signUpError: res.message, isDisable: false });
        }
    }

    render() {
        const {
            signInError,
            isDisable,
            signUpError,
            storageToken
        } = this.state;
        return (
            <div>
                <nav className="navbar navbar-light p-0" style={{ backgroundColor: '#00A3B5' }}>
                    <div className="container-fluid">
                        <Link to={'/'} style={{ padding: '8px' }}>
                            <span className="header-text text-white">Digitalization Platform (beta)</span>
                        </Link>
                    </div>
                </nav>
                <div className="vertical-center col-md-4 shadow-lg">
                    <Form>
                        <FormGroup className="text-left">
                            <Label for="exampleEmail" className="mr-sm-2">User Name</Label>
                            <Input type="text" name="userName" id="userName" placeholder="Name" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup className="text-left">
                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup className="text-left">
                            <Label for="exampleEmail" className="mr-sm-2">password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
                        </FormGroup>
                    </Form>
                    <Row>
                        <Col>{(signUpError) ? (<p>{signUpError}</p>) : (null)}</Col>
                    </Row>
                    <div className="row mt-2">
                        <div className="col-md">
                            <button className="btn btn-login w-100" style={{ backgroundColor: '#00A3B5' }} type="submit" disabled={isDisable ? true : false} onClick={() => this.onSignUp()} >Sign Up</button>
                        </div>
                    </div>
                    <div className="mt-4 d-flex">
                        <p>Already a member, click here to<Link to='/login' className="text-theme">Sign In</Link></p>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}