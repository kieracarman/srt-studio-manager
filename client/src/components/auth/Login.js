import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/'); // push user to home when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='login-bg'>
        <div className='login-box'>
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <h2>SRT Studio Manager</h2>
            </div>
            <div className='form-group'>
              <input
                autoFocus
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                id='username'
                type='username'
                placeholder='Username'
                className={classnames('form-control', {
                  invalid: errors.username || errors.usernameNotFound
                })}
              />
              <div className='form-error'>
                <span>
                  {errors.username}
                  {errors.usernameNotFound}
                </span>
              </div>
            </div>
            <div className='form-group'>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id='password'
                type='password'
                placeholder='Password'
                className={classnames('form-control', {
                  invalid: errors.password || errors.incorrectPassword
                })}
              />
              <div className='form-error'>
                <span>
                  {errors.password}
                  {errors.incorrectPassword}
                </span>
              </div>
            </div>
            <button type='submit' className='login-button'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
