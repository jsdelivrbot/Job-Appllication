import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newUser } from '../actions';

// COMPONENT RESPONSIBLE FOR CREATING NEW USER
class NewUser extends Component {
  // FUNCTION RESPONSIBLE FOR RENDERING FORM USING REDUX_FORM library
  renderField(field){
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type={field.type}
          {...field.input}
        />
        <div className='text-help'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }
  // FUNCTION RESPONSIBLE FOR SUBMITING FORM
  onSubmit(values){
    this.props.newUser(values, () => {
      this.props.history.push('/');
    })
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          type='text'
          label="User Name:"
          name='username'
          component={this.renderField}
        />
        <Field
          type='text'
          label="Name:"
          name='name'
          component={this.renderField}
        />
        <Field
          type='email'
          label="Email:"
          name='email'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

// HELPER FUNCTION RESPONSIBLE FOR VALIDATING FORM
function validate(values){
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


export default reduxForm({
  validate,
  form: 'NewUserForm'
})(connect(null, { newUser } )(NewUser));
