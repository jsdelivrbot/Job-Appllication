import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { editUser } from '../actions';

// COMPONENT RESPONSIBLE FOR EDITING USER's DETAILS
class EditUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: this.props.user.username,
      name: this.props.user.name,
      email: this.props.user.email
    }
  }
  // FUNCITON RESPONSIBLE FOR VALIDATING FORM
  validateForm(values){
    const errors = {};

    if(!values.username) {
      errors.username = 'Enter your username!';
    }
    if(!values.name) {
      errors.name = 'Enter your name!';
    }
    if(!values.email) {
      errors.email = 'Enter a valid email';
    }

    return errors;
  }
  // FUNCTION RESPONSIBLE FOR SUMBITING FORM
  submitForm(e){
    e.preventDefault();
    const values = this.state;
    const errors = this.validateForm(this.state);
    const { id } = this.props.user
    this.validateForm(values);

    if(_.isEmpty(errors)){
      this.props.editUser(id, values);
    }
  }
  render(){
    const errors = this.validateForm(this.state);
    const errorUsername = errors.username;
    const errorName = errors.name;
    const errorEmail = errors.email;

    return (
        <form onSubmit={this.submitForm.bind(this)}>
          <div className={`form-group ${errorUsername ? 'has-danger' : ''}`}>
            <label>
              Username:
            </label>
            <input
              className='form-control'
              type="text"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value})}
            />
            <div className='text-help'>
              {errors.username}
            </div>
          </div>
          <div className={`form-group ${errorName ? 'has-danger' : ''}`}>
            <label>
              Name:
            </label>
            <input
              className='form-control'
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value})}
            />
            <div className='text-help'>
              {errors.name}
            </div>
            </div>

            <div className={`form-group ${errorEmail ? 'has-danger' : ''}`}>
              <label>
                Email:
              </label>
              <input
                className='form-control'
                type="text"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value})}
              />
              <div className='text-help'>
                {errors.email}
              </div>
            </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

export default connect(null, { editUser })(EditUser)
