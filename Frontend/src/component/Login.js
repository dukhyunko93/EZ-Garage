import React, { Component } from "react";
import { Button } from '@material-ui/core';
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { saveUser } from '../actions/user'
import { saveEarning } from '../actions/earnings';
import { Redirect } from 'react-router'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import FacebookIcon from '@material-ui/icons/Facebook';
import logo from '../img/be4bc4c2-a23e-4217-a5ea-fef7c2a6bd13_200x200.png'
import "./Login.css";

const facebookButton = <FacebookIcon style={{marginRight: 20, color: '#3b5998'}} />

class Login extends Component{
    state = {
        username: "",
        password: "",
        redirect: false,
        incorretInfo: false,
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.postUser()
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    postUser = () => {
        let userObj = {
            username: this.state.username,
            password: this.state.password
        }

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({user:userObj})
        }
        
        fetch("http://localhost:3001/login", options)
        .then(r => {
            if(!r.ok){
                this.setState({incorretInfo: true})
            } else {
                return r.json()
                .then(r => {
                    this.setCookie("jwt",r.jwt,1)
                    this.setState({ redirect: true }, () => {
                        this.props.saveUser(r.user)
                        this.props.saveEarning(r.total_earnings)
                    })
                })
            }
        })
    }

    thirdPartyPost = (userObj) => {

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({user:userObj})
        }
        
        fetch("http://localhost:3001/thirdpartylogin", options)
        .then(r => r.json())
        .then(r => {
            this.setCookie("jwt",r.jwt,1)
            this.setState({ redirect: true }, () => {
                this.props.saveUser(r.user)
                this.props.saveEarning(r.total_earnings)
            })
        })
    }
    
    responseGoogle = (r) => {
        let userObj = {
            username: r.profileObj.email,
            password: r.profileObj.googleId,
            first_name: r.profileObj.givenName.charAt(0).toUpperCase() + r.profileObj.givenName.slice(1),
            last_name: r.profileObj.familyName.charAt(0).toUpperCase() + r.profileObj.familyName.slice(1),
        }
        this.thirdPartyPost(userObj)
    }

    responseFacebook = (r) => {
        let userObj ={
            username: r.email,
            password: r.userID,
            first_name: r.name.split(" ")[0],
            last_name: r.name.split(" ")[1],
        }
        this.thirdPartyPost(userObj)
    }

    render(){
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/'/>;
        }

        return (
            <div className="Login">
                <div className="welcome" >
                    <img src={logo} alt="EZ-Garage" />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="third-party-login">
                        <GoogleLogin
                            clientId="58866883105-fo9gd9804pios33p371reob8ep5svh94.apps.googleusercontent.com"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            buttonText="Login with Google"
                        />
                        <FacebookLogin
                            appId="3325404494241932"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={this.responseFacebook} 
                            cssClass="facebook-button"
                            icon={facebookButton}
                        />
                    </div>
                    <br></br>
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
                    {this.state.incorretInfo ? <p style={{color:"red"}}>Wrong username or password</p> : null}
                    <Button block bssize="large" variant="secondary" disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
      saveUser: (user) => {
        dispatch(saveUser(user))
      },
      saveEarning: (total_earning) => {
        dispatch(saveEarning(total_earning))
      }
    }
}

export default connect(null, mapDispatchToProps)(Login);
