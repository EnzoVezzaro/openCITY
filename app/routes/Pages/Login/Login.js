import React from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

// utils
import { validateEmail } from '../../../utils/regex'; 

class Login extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            pwd: '',
            isEmailValid: true,
        }
    }

    handleChange = (e) => {
        console.log(e.currentTarget.value);
        console.log(validateEmail(e.currentTarget.value));
        this.setState({
            [`${e.currentTarget.name}`]: e.currentTarget.value,
            isEmailValid: validateEmail(e.currentTarget.value)
        });
    }

    handleSubmit = () => {
        console.log(this.state);
        event.preventDefault();
        if (!this.state.email){
            this.setState({
                isEmailValid: false
            })
        } else if (this.state.email && this.state.isEmailValid){
            alert('submit');
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
                            <Input type="email" name="email" id="emailAdress" placeholder="Enter email..." className={`${this.state.email !== '' && this.state.isEmailValid ? 'is-valid' : this.state.email !== '' && !this.state.isEmailValid ? 'is-invalid' : ''} bg-white`} onChange={this.handleChange} />
                            <FormText color="muted">
                                Tu email no sera compartida con nadie mas.
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input type="password" name="password" id="password" placeholder="Password..." className="bg-white" onChange={this.handleChange} />
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
                            Forgot Password
                        </Link>
                        <Link to="/register" className="ml-auto text-decoration-none">
                            Register
                        </Link>
                    </div>
                    { /* END Bottom Links */}
                    { /* START Footer 
                    <FooterAuth />
                    */}
                    { /* END Footer */}
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }
}

export default Login;
