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

// Auth
import { Auth } from 'aws-amplify';
import { validateEmail } from '../../../utils/regex';

class ForgotPassword extends React.Component {  
    constructor(props){
        super(props);

        console.log(this.props);
        this.state = {
            email: '',
            isEmailValid: true,
            submmitted: false,
            showAlert: false
        }
    }

    changeHandler = (e) => {
        
        switch(e.target.id) {
            case 'emailAddress':
                this.setState({
                    email: e.target.value,
                    isEmailValid: validateEmail(e.currentTarget.value)
                });
                break;
            default:
              // code block
        }
    }

    validateForm = () => {

        console.log(this.state);
        this.setState({
            submmitted: true 
        })
        if (!this.state.email){
            this.setState({
                isEmailValid: false
            })   
        }

        setTimeout(() => {
            if (
                this.state.isEmailValid
            ){
                this.resetPassword();
            } 
        }, 0);
                
    }

    resetPassword = async () => {
        const { email } = this.state;
        try {
            await Auth.forgotPassword(email)
            .then(data => {
                console.log(data)
                this.props.history.push({
                    pathname: `/lock-screen/${email}`,
                    state: { isForgotPassword: true }
                })
            })
            .catch(error => {
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
            });
        } catch (error) {
            switch (error.code) {
                case "UserNotFoundException":
                    this.setState({
                        showAlert: true,
                        alertBody: 'Este Email no esta registrada. Por favor, trate de nuevo.',
                        alertTitle: 'Oh Snap!',
                        alertStatus: 'danger'
                    })
                    break;
                case "NotAuthorizedException":
                    this.setState({
                        showAlert: true,
                        alertBody: 'Email o password incorrecto.',
                        alertTitle: 'Oh Snap!',
                        alertStatus: 'danger'
                    })
                    break;
                case "InvalidParameterException":
                    this.setState({
                        showAlert: true,
                        alertBody: 'Esta Email ya esta confirmada',
                        alertTitle: 'Email Registrada!',
                        alertStatus: 'warning'
                    })
                    break;
                case "CodeMismatchException":
                    this.setState({
                        showAlert: true,
                        alertBody: 'Este codigo no es valido, por favor ingrese nuevamente',
                        alertTitle: 'Codigo no valido!',
                        alertStatus: 'warning'
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
        return(
            <EmptyLayout>
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth 
                        title=""
                        text='Podemos ayudarte a restablecer tu contraseña y la información de seguridad. Primero escribe tu Email y sigue las instrucciones siguientes.'
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="emailAdress">
                                Dirección de correo electrónico
                            </Label>
                            <Input type="email" name="email" id="emailAddress" placeholder="Entra Email..." className={`${this.state.submmitted && this.state.isEmailValid ? 'is-valid' : this.state.submmitted && !this.state.isEmailValid ? 'is-invalid' : ''} bg-white`} onChange={this.changeHandler} />
                            <FormText color="muted">
                                Tu email no sera compartida con nadie mas.
                            </FormText>
                        </FormGroup>
                        <div className="d-flex">
                            <ThemeConsumer>
                            {
                                ({ color }) => (
                                    <Button color={ color } tag={ Link } onClick={()=> this.validateForm() } className="align-self-center">
                                        Recupera Password
                                    </Button>
                                )
                            }
                            </ThemeConsumer>
                            <Button color="link" tag={ Link } to="/" className="align-self-center ml-auto pr-0 text-decoration-none">
                                <i className="fa fa-angle-left mr-2"></i> Vuelve a Login
                            </Button>
                        </div>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    { /* END Bottom Links */}
                    <Alert color="warning" isOpen={this.state.showAlert}>
                        <h6 className="mb-1 alert-heading">
                            Oh Snap!
                        </h6> 
                        { this.state.alertBody }
                    </Alert>
                </EmptyLayout.Section>
            </EmptyLayout>
        );
    }
}

export default ForgotPassword;
