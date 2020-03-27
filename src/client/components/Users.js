import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            validRequest: false
        };
    }

    componentDidMount() {
        const params = queryString.parse(location.search);
        const email = params["email"];
        const token = params["token"];

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

    changePassword = (email, password, confirmPassword) => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
        } else {
            axios.post('api/user/changePassword', {
                emailId: email,
                password: confirmPassword
            },{
                headers: {
                    "api_token": process.env.API_TOKEN
                }
            }).then((res) => {
                if (res.status === 200) {
                    alert("Password successfully updated");
                } else {
                    alert("Error - unable to update password");
                }
            }).catch(err => console.log(err));
        }
    };

    render() {
        if (this.state.validRequest) {
            return (
                <div className="container">
                    <h3>Reset Password for User (email = {this.state.email})</h3>
                    <form onSubmit={() => this.changePassword(this.state.email, this.state.password, this.state.confirmPassword)}>
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
                    <h3>Email/Token invalid or token has expired. Please retry password reset request.</h3>
                </div>
            );
        }
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Users;
