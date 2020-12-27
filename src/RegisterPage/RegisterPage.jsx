import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                        {submitted && !user.firstName &&
                            <div className="invalid-feedback">First Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                        {submitted && !user.lastName &&
                            <div className="invalid-feedback">Last Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={user.username} onChange={this.handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                        {submitted && !user.username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={this.handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                        {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };