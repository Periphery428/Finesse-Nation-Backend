import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';

function PasswordResetForm(props) {
    return (
        <div className="container">
            <h3>Reset Password for User (username = {this.state.username}, email = {this.state.email})</h3>
            <form onSubmit={() => this.changePassword(this.state.email, this.state.password)}>
                <label>
                    New Password:
                    <input type="number" onChange={(i) => this.setState()}/>
                </label>
                <label>
                    Retype New Password:
                    <input type="number" onChange={(i) => this.setState({routeId: i.target.value})}/>
                </label>
                <button type="submit" className="btn btn-default"> Add</button>
            </form>
        </div>
    );
}

function InvalidRequestForm(props) {
    return (
        <div className="container">
            <h3>Email/Token invalid or token has expired. Please retry password reset request.</h3>
        </div>
    );
}

function RenderPage(props) {
    const validRequest = props.validRequest;
    if (validRequest) {
        return <PasswordResetForm/>;
    } else {
        return <InvalidRequestForm/>;
    }
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            validRequest: false
        };
    }

    componentDidMount() {
        this.setState({username: "testmocha"});
        this.setState({email: "testmocha@mochauniversity.edu"});
        const params = queryString.parse(location.search);
        const email = params["email"];
        const token = params["token"];

        axios.post('api/users/checkEmailTokenExists', {
            emailId: email,
            token: token
        }).then((res) => {
            if (res.status === 200) {
                console.log("Rendering password reset form");
                this.setState({validRequest: true});
            } else {
                console.log("Rendering invalid password reset request page");
            }
        }).catch(err => console.log(err));
    }

    render() {
        return <RenderPage validRequest={this.state.validRequest}/>
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Users;
