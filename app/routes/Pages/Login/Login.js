import React from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    Alert,
    FormText,
    Input,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";

// utils
import { validateEmail } from '../../../utils/regex'; 

// AWS
import { Auth } from 'aws-amplify';

class Login extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            isEmailValid: true,
            submmitted: false,
            showAlert: false
        }
    }

    handleChange = (e) => {
        switch(e.target.id) {
            case 'emailAddress':
                this.setState({
                    email: e.target.value,
                    isEmailValid: validateEmail(e.currentTarget.value)
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value
                })
                break;
            default:
              // code block
        }
    }

    handleSubmit = () => {
        this.setState({
            submmitted: true
        })
        event.preventDefault();
        if (!this.state.email){
            this.setState({
                isEmailValid: false
            })
        } else if (
            this.state.email && 
            this.state.isEmailValid &&
            this.state.password
        ){
            this.signIn();
        }
    }

    signIn = async () => {
        const { email, password } = this.state;
        try {
            const user = await Auth.signIn(email, password);
            if (user){
                console.log(user);
                this.props.history.push(`dashboards/analytics`);
            }
        } catch (error) {
            console.log('error signing up:', error);
            switch (error.code) {
                case "UserNotFoundException":
                    this.setState({
                        showAlert: true,
                        alertBody: 'Este Email no esta registrada. Por favor, trate de nuevo.'
                    })
                    break;
                case "NotAuthorizedException":
                    this.setState({
                        showAlert: true,
                        alertBody: 'Email o password incorrecto.'
                    })
                    break;
                default:
                    break;
            }
            console.log('error confirming sign up', error);
            setTimeout(() => {
                this.setState({
                    showAlert: false
                })
            }, 3000);
        }
    }

    render(){
        return (
            <EmptyLayout>
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth 
                        title=""
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="emailAdress">
                                Email Adress
                            </Label>
                            <Input type="email" name="emailAddress" id="emailAddress" placeholder="Entra tu email..." className={`${this.state.submmitted && this.state.isEmailValid ? 'is-valid' : this.state.submmitted && !this.state.isEmailValid ? 'is-invalid' : ''} bg-white`} onChange={this.handleChange} />
                            <FormText color="muted">
                                Tu email no sera compartida con nadie mas.
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input type="password" name="password" id="password" placeholder="Password..." className={`${this.state.submmitted && this.state.password ? 'is-valid' : this.state.submmitted && !this.state.password ? 'is-invalid' : ''} bg-white`} onChange={this.handleChange} />
                        </FormGroup>
                        <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button color={ color } block tag={ Link } onClick={ this.handleSubmit }>
                                    Sign In
                                </Button>
                            )
                        }
                        </ThemeConsumer>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    <div className="d-flex mb-5"> 
                        <Link to="/forgot-password" className="text-decoration-none">
                            ¿Se te olvidó tu contraseña?
                        </Link>
                        <Link to="/register" className="ml-auto text-decoration-none">
                            Crea Cuenta
                        </Link>
                    </div>
                    { /* END Bottom Links */}
                    <Alert color="warning" isOpen={this.state.showAlert}>
                        <h6 className="mb-1 alert-heading">
                            Oh Snap!
                        </h6> 
                        { this.state.alertBody }
                    </Alert>
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }
}

export default Login;
