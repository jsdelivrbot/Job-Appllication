import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser } from '../actions';


class EditUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: this.props.user.username,
      name: this.props.user.name,
      email: this.props.user.email
    }
  }
  validateForm(values){
    const errors = {};

    if(!values.username) {
      errors.username = 'Enter a username that contains at least 3 characters!';
    }
    if(!values.name) {
      errors.name = 'Enter your name!';
    }
    if(!values.email) {
      errors.email = 'Enter a valid email';
    }

    return errors;
  }
  submitForm(e){
    e.preventDefault();
    const values = this.state;
    this.validateForm(values);

    const errors = this.validateForm(this.state);
    if(_.isEmpty(errors)){
      this.props.editUser(this.props.user.id, values);
    }
  }
  render(){
    const errors = this.validateForm(this.state);
    return (
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='form-group'>
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
          <div className='form-group'>
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

            <div className='form-group'>
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


export default connect(null, { editUser })(EditUser);
