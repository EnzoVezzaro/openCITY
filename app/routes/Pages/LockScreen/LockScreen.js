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

class LockScreen extends React.Component {  
    constructor(props){
        super(props);

        console.log(this.props);
        this.state = {
            email: this.props.match.params.email,
            code: '',
            isCodeValid: true,
            showAlert: false
        }
    }

    changeHandler = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        switch(e.target.id) {
            case 'code':
                this.setState({
                    code: e.target.value,
                    isCodeValid: parseInt(e.target.value)
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
        if (!this.state.code){
            this.setState({
                isCodeValid: false
            })   
        }

        setTimeout(() => {
            if (
                this.state.isCodeValid
            ){
                this.confirmSignUp();
            } 
        }, 0);
                
    }

    confirmSignUp = async () => {
        try {
          let signup = await Auth.confirmSignUp(this.state.email, this.state.code);
          if (signup){
            console.log('Signed');
            console.log(this.props.history.push(`/dashboard/analytics`));
          }
        } catch (error) {
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

    fireAlert = () =>{
        this.setState({
            showAlert: !this.state.showAlert
        })
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
                        <Link to="/login" className="text-decoration-none">
                            Entra con Otro Usuario
                        </Link>
                        <Link to="/" className="ml-auto text-decoration-none">
                            <i className="fa fa-angle-left mr-2"></i> Vuelve al Login
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
        );
    }
}

export default LockScreen;
