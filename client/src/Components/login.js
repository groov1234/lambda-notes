import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedIn, signUp } from '../Actions';
import Navi from './navi';
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            newAccount: false,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    loginChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    loginAuth = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        if (password.length > 0 && username.length > 0) {
            return this.props.loggedIn(username, password);
        }
        return alert('Must include both a password and username');
    };

    signUpAuth = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        if (confirmPassword === password && username.length > 0) {
            return this.props.signUp(username, password);
        }
        return alert(
            'Make sure to include a username and a matching password.'
        );
    };

    signUpToggle = event => {
        event.preventDefault();
        const active = this.state.newAccount;
        this.setState({ newAccount: !active });
    };

    render() {
        return (
            <div className="HomePage">
                <Navi />
                <Jumbotron>
                    <h5 className="display-3">Hello, world!</h5>
                    <p className="lead">
                        This is a simple Note App. It's my first app, and it's a
                        work in progress.
                    </p>
                    <hr className="my-2" />
                    <p>
                        I hope you enjoy tinkering with it. Also feel free to
                        make comments on Github. You can find the link in the
                        Navigation.
                    </p>
                    <p className="lead">
                        <Button color="danger" onClick={this.toggle}>
                            Click to Login or SignUp
                            {this.props.buttonLabel}
                        </Button>
                    </p>
                </Jumbotron>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>
                        Please Login or Sign Up
                    </ModalHeader>
                    <ModalBody>
                        <Jumbotron>
                            <Alert color="danger">
                                Welcome to Lambda Notes!
                            </Alert>
                            <Form
                                style={
                                    this.state.newAccount
                                        ? { display: 'none' }
                                        : null
                                }
                            >
                                <FormGroup>
                                    <Label>Sign In</Label>

                                    {this.props.error ? (
                                        <h3 className="LogInError">
                                            Incorrect username/password
                                        </h3>
                                    ) : null}
                                    <br />

                                    <Input
                                        type="text"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={this.loginChangeHandler}
                                        name="username"
                                        required
                                    />
                                    <br />

                                    <Input
                                        type="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.loginChangeHandler}
                                        name="password"
                                        required
                                    />
                                    <br />
                                    <br />

                                    <Button
                                        color="primary"
                                        onClick={this.loginAuth}
                                    >
                                        Login
                                    </Button>

                                    <Alert color="warning">
                                        Need an account?{' '}
                                        <a href="" onClick={this.signUpToggle}>
                                            Sign Up
                                        </a>
                                    </Alert>
                                </FormGroup>
                            </Form>
                            <Form
                                style={
                                    this.state.newAccount
                                        ? null
                                        : { display: 'none' }
                                }
                            >
                                <FormGroup>
                                    <Label>Sign Up</Label>
                                    <br />

                                    <Input
                                        type="text"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={this.loginChangeHandler}
                                        name="username"
                                        required
                                    />
                                    <br />

                                    <Input
                                        type="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.loginChangeHandler}
                                        name="password"
                                        required
                                    />
                                    <br />

                                    <Input
                                        type="password"
                                        placeholder="confirm password"
                                        value={this.state.confirmPassword}
                                        onChange={this.loginChangeHandler}
                                        name="confirmPassword"
                                        required
                                    />
                                    <br />
                                    <br />

                                    <Button
                                        color="success"
                                        onClick={this.signUpAuth}
                                    >
                                        Sign Up
                                    </Button>

                                    <Alert color="warning">
                                        Want to Sign In?{' '}
                                        <a href="" onClick={this.signUpToggle}>
                                            LogIn
                                        </a>
                                    </Alert>
                                </FormGroup>
                            </Form>
                        </Jumbotron>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        error: state.error,
        signedUp: state.signedUp
    };
};

export default connect(mapStateToProps, { loggedIn, signUp })(LogIn);
