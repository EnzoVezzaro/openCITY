import React from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    Input,
    Alert,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

// Auth
import { Auth } from 'aws-amplify';
import { validatePassword } from '../../../utils/regex';

class LockScreen extends React.Component {  
    constructor(props){
        super(props);

        console.log(this.props);
        this.state = {
            email: this.props.match.params.email,
            pwd: this.props.location.state.pwd,
            isForgotPassword: this.props.location.state.isForgotPassword,
            isPasswordValid: true,
            code: '',
            isCodeValid: true,
            showAlert: false
        }
    }

    changeHandler = (e) => {
        console.log(e.target.value);
        console.log(validatePassword(e.target.value));
        switch(e.target.id) {
            case 'code':
                this.setState({
                    code: e.target.value,
                    isCodeValid: parseInt(e.target.value)
                });
                break;
            case 'password':
                this.setState({
                    pwd: e.target.value,
                    isPasswordValid: validatePassword(e.target.value)
                })
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
        if (!this.state.code){
            this.setState({
                isCodeValid: false
            })   
        }

        if (this.state.isForgotPassword){
            if (
                !this.state.pwd
            ){
                this.setState({
                    isPasswordValid: false
                })   
            }
        }

        setTimeout(() => {
            if (
                !this.state.isForgotPassword &&
                this.state.isCodeValid
            ){
                this.confirmSignUp();
            } 

            if (
                this.state.isForgotPassword &&
                this.state.isPasswordValid
            ){
                this.forgotPassword();
            } 
        }, 0);
                
    }

    confirmSignUp = async () => {
        const { email, code } = this.state;
        try {
            await Auth.confirmSignUp(email, code);
            console.log('Signed', email, code);
            this.signIn();
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

    forgotPassword = async () => {
        const { email, code, pwd } = this.state;
        try {
            await Auth.forgotPasswordSubmit(email, code, pwd);
            console.log('Signed', email, code);
            this.signIn();
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

    signIn = async () => {
        const { email, pwd } = await this.state;
        console.log(email, pwd);
        try {
            const user = await Auth.signIn(email, pwd);
            if (user){
                console.log(user);
                this.props.history.push(`/dashboards/analytics`);
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

    fireAlert = () =>{
        this.setState({
            showAlert: !this.state.showAlert
        })
    }

    resendCode = async() =>{
        try {
            if (this.state.isForgotPassword){
                await Auth.forgotPassword(this.state.email)
            } else {
                await Auth.resendSignUp(this.state.email);
            }
            
            this.setState({
                showAlert: true,
                alertBody: 'Ve a tu buzon de correo electronico y entra el codigo que me enviamos.',
                alertTitle: 'Codigo Enviado!',
                alertStatus: 'success'
            })
        } catch (err) {
            console.log('error resending code: ', err);
        }
        setTimeout(() => {
            this.setState({
                showAlert: false
            })
        }, 3000);
    }

    render(){
        return (
            <EmptyLayout>
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth 
                        title=""
                        text='Te hemos mandado un email con el codigo para confirmar tu cuenta. Por favor, entra abajo el codigo recibido'
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="password">
                                Codigo
                            </Label>
                            <Input type="number" name="code" id="code" placeholder="Entra el codigo para continuar..." className={`${this.state.submmitted && this.state.isCodeValid ? 'is-valid' : this.state.submmitted && !this.state.isCodeValid ? 'is-invalid' : ''} bg-white`} onChange={this.changeHandler} />
                        </FormGroup>
                        {
                            this.state.isForgotPassword && (
                                <FormGroup>
                                    <Label for="password">
                                        Nueva Password
                                    </Label>
                                    <Input type="password" name="password" id="password" placeholder="Password..." className={`${this.state.submmitted && this.state.isPasswordValid ? 'is-valid' : this.state.submmitted && !this.state.isPasswordValid ? 'is-invalid' : ''} bg-white`} onChange={this.changeHandler} />
                                </FormGroup>
                            )
                        }
                        <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button color={ color } block tag={ Link } onClick={ this.validateForm }>
                                    Desbloquea cuenta
                                </Button>
                            )
                        }
                        </ThemeConsumer>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    <div className="d-flex mb-5">
                        <Link onClick={()=>this.resendCode()} className="text-decoration-none">
                            Reenvía codigo
                        </Link>
                        <Link to="/" className="ml-auto text-decoration-none">
                            <i className="fa fa-angle-left mr-2"></i> Vuelve al Login
                        </Link>
                    </div>
                    { /* END Bottom Links */}
                    { /* START Footer */}
                    <FooterAuth />
                    { /* END Footer */}
                    <Alert color={ this.state.alertStatus } isOpen={this.state.showAlert}>
                        <h6 className="mb-1 alert-heading">
                            { this.state.alertTitle }
                        </h6> 
                        { this.state.alertBody }
                    </Alert>
                </EmptyLayout.Section>
            </EmptyLayout>
        );
    }
}

export default LockScreen;
