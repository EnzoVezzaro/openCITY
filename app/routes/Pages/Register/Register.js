import React from 'react';
import { Link } from 'react-router-dom';

// utils
import { validateEmail, validatePassword } from '../../../utils/regex';

import { Auth } from 'aws-amplify';

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
import { FooterAuth } from "../../components/Pages/FooterAuth";

class Register extends React.Component {    
    constructor(props){
        super(props);

        this.state = {
            email: '',
            isEmailValid: true,
            password: '',
            isPwdValid: true,
            repeatPassword: '',
            isRepeatPassword: true,
            submmitted: false,
            showAlert: false
        }
    }

    changeHandler = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        switch(e.target.id) {
            case 'emailAddress':
                this.setState({
                    email: e.target.value,
                    isEmailValid: validateEmail(e.currentTarget.value)
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value,
                    isPwdValid: validatePassword(e.target.value)
                })
                break;
            case 'repeatPassword':
                this.setState({
                    repeatPassword: e.target.value,
                    isRepeatPassword: this.state.password == e.target.value
                })
                break;
            default:
              // code block
        }
    }

    validateForm = () => {

        this.setState({
            submmitted: true
        })
        
        console.log(this.state);
        if (!this.state.email){
            this.setState({
                isEmailValid: false
            })   
        } 
        if (
            !this.state.password
        ) {
            this.setState({
                isPwdValid: false
            })   
        }
        if (
            (!this.state.password ||
            !this.state.repeatPassword) &&
            this.state.password !== this.state.repeatPassword
        ) {
            this.setState({
                isRepeatPassword: false
            })   
        }

        if (
            this.state.isEmailValid &&
            this.state.isPwdValid &&
            this.state.isRepeatPassword
        ){
            this.signUp();
        }
                
    }

    signUp = async () => {
        try {
            const user = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            console.log({ user });
            if (user){
                console.log(this.props.history.push(`/lock-screen/${this.state.email}`));
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
                        text='Crea tu cuenta para que puedas hacer uso del sistema. Participa en nuestra democracia con OpenCity'
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="emailAdress">
                                Email Adress
                            </Label>
                            <Input type="email" name="email" id="emailAddress" placeholder="Entra Email..." className={`${this.state.submmitted && this.state.isEmailValid ? 'is-valid' : this.state.submmitted && !this.state.isEmailValid ? 'is-invalid' : ''} bg-white`} onChange={this.changeHandler} />
                            <FormText color="muted">
                                Tu email no sera compartida con nadie mas.
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input type="password" name="password" id="password" placeholder="Password..." className={`${this.state.submmitted && this.state.isPwdValid ? 'is-valid' : this.state.submmitted && !this.state.isPwdValid ? 'is-invalid' : ''} bg-white`} onChange={ this.changeHandler } />
                            <div className="invalid-feedback">
                                La password no es valida
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="repeatPassword">
                                Repite Password
                            </Label>
                            <Input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repite Password..." className={`${this.state.submmitted && this.state.isRepeatPassword ? 'is-valid' : this.state.submmitted && !this.state.isRepeatPassword ? 'is-invalid' : ''} bg-white`} onChange={ this.changeHandler } />
                            <div className="invalid-feedback">
                                La password no coincide
                            </div>
                        </FormGroup>
                        <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button color={ color } block tag={ Link } onClick={ this.validateForm }>
                                    Crea Cuenta
                                </Button>
                            )
                        }
                        </ThemeConsumer>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    <div className="d-flex mb-5">
                        <Link to="/forgot-password" className="text-decoration-none">
                            Forgot Password
                        </Link>
                        <Link to="/login" className="ml-auto text-decoration-none">
                            Login
                        </Link>
                    </div>
                    { /* END Bottom Links */}
                    { /* START Footer */}
                    <FooterAuth />
                    { /* END Footer */}
                    <Alert color="danger" isOpen={this.state.showAlert}>
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

export default Register;
