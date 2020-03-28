import React, {Component} from 'react';
import queryString from 'query-string';
import axios from 'axios';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            validRequest: false,
            passwordChanged: false,
        };
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        const params = queryString.parse(location.search);
        const email = params["email"];
        const token = params["token"];

        if (email && token) {
            axios.post('api/user/checkEmailTokenExists', {
                emailId: email,
                token: token
            },{
                headers: {
                    "api_token": process.env.API_TOKEN
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log("Rendering password reset form");
                    this.setState({email: email});
                    this.setState({validRequest: true});
                } else {
                    console.log("Rendering invalid password reset request page");
                }
            }).catch(err => console.log(err));
        }
    }

    changePassword(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match!");
        } else {
            axios.post('api/user/changePassword', {
                emailId: this.state.email,
                password: this.state.confirmPassword
            },{
                headers: {
                    "api_token": process.env.API_TOKEN
                }
            }).then((res) => {
                if (res.status === 200) {
                    this.setState({validRequest: false});
                    this.setState({passwordChanged: true});
                    alert("Password successfully updated");
                } else {
                    alert("Error - unable to update password");
                    this.setState({validRequest: false});
                }
            }).catch(err => console.log(err));
        }
    };

    render() {
        if (this.state.passwordChanged) {
            return (
                <div className="container">
                    <h3>Password successfully changed for user ({this.state.email}).</h3>
                </div>
            )
        }
        else if (this.state.validRequest) {
            return (
                <div className="container">
                    <h3>Reset Password for User ({this.state.email}).</h3>
                    <form onSubmit={this.changePassword}>
                        <label>
                            New Password:
                            <input type="password" onChange={(i) => this.setState({password: i.target.value})}/>
                        </label>
                        <label>
                            Retype New Password:
                            <input type="password" onChange={(i) => this.setState({confirmPassword: i.target.value})}/>
                        </label>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h3>Error: Email/Token invalid or token has expired. Please retry password reset request.</h3>
                </div>
            );
        }
    }
}

export default Users;
