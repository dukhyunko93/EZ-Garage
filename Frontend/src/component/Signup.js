import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Redirect } from 'react-router';
import logo from '../img/be4bc4c2-a23e-4217-a5ea-fef7c2a6bd13_200x200.png'
import './Signup.css';

class Signup extends Component{
    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirmPassword: "",
        redirect: false
    }

    validateForm = () => {
        return this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.validateForm() ?
        this.postUser()
        :
        console.log("WARNING MESSAGE")
    }

    postUser = () => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                user: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    username: this.state.username,
                    password: this.state.password
                }
            })
        }

        fetch('http://localhost:3001/users', options)
        .then(r => {
            if (r.ok){
                this.setState({ redirect: true })
            }
        })
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
          return <Redirect to='/login'/>;
        }

        return (
            <div className="Signup">
                <div className="welcome" >
                    <img src={logo} alt="EZ-Garage" />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="first_name" bssize="large">
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                        autoFocus
                        name="first_name"
                        type="first_name"
                        value={this.state.first_name}
                        onChange={this.onChangeHandler}
                    />
                    </FormGroup>
                    <FormGroup controlId="last_name" bssize="large">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                        autoFocus
                        name="last_name"
                        type="last_name"
                        value={this.state.last_name}
                        onChange={this.onChangeHandler}
                    />
                    </FormGroup>
                    <FormGroup controlId="username" bssize="large">
                    <FormLabel>Username / Email</FormLabel>
                    <FormControl
                        autoFocus
                        name="username"
                        type="username"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        type="password"
                    />
                    </FormGroup>
                    <FormGroup controlId="confirm-password" bssize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChangeHandler}
                        type="password"
                    />
                    </FormGroup>
                    <Button block bssize="large" variant="secondary" type="submit" >
                        Signup
                    </Button>
                </form>
            </div>
        );
    };
};

export default Signup;