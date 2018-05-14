import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showUser, deleteUser } from '../actions';
import EditUser from './EditUser';

// COMPONENT RESPONSIBLE FOR SHOWING USER's DETAILS
class ShowUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    }
  }
  componentDidMount(){
    // PREVENTS UNNECESSARY FETCHING DATA
    if(!this.props.user) {
      const { id } = this.props.match.params;
      this.props.showUser(id);
    }
  }
  // FUNCTION RESPONSIBLE FOR DELETING USER
  onDelete(){
    const { id } = this.props.match.params;
    console.log(this.props)
    this.props.deleteUser(id, () => {
      this.props.history.push('/')
    });
  }
  // FUNCTION RESPONSIBLE FOR RENDERING USER's DETAILS
  renderUser(){
    const { user } = this.props;
    return (
      <div>
        <Link to='/' className='btn btn-primary' >Back</Link>
        <div className='user-details'>
          <p>Username: <strong>{user.username}</strong></p>
          <p>Name: <strong>{user.name}</strong></p>
          <p>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
        </div>
        <button
          className='btn btn-warning'
          onClick={this.changeState.bind(this)
          }>
          Edit User
        </button>
        <button
          className='btn btn-danger'
          onClick={this.onDelete.bind(this)}
          >
          Delete user
        </button>
      </div>
    );
  }
  // FUNCTION RESPONSIBLE FOR MANIPULATING {editing} STATE INSDE COMPONENT
  changeState(){
    this.setState({ editing: true})
  }
  // FUNCTION RESPONSIBLE FOR RENDERING EDITUSER COMPONENT
  renderEdit(){
    const { user } = this.props;

    return (
      <EditUser data={this.props} user={user}/>
    )
  }
  render() {
    const { user } = this.props;

    if(!user) {
      return <div></div>
    }
    return (
      <div>
        {this.state.editing ? this.renderEdit() : this.renderUser()}
      </div>
    )
  }
}

function mapStateToProps({ usersList }, ownProps) {
  return { user: usersList[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { showUser, deleteUser })(ShowUser);
