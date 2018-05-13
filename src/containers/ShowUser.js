import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showUser, deleteUser } from '../actions';
import EditUser from './EditUser';


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
  onDelete(){
    const { id } = this.props.match.params;
    this.props.deleteUser(id, () => {
      this.props.history.push('/')
    })
  }
  renderUser(){
    const { user } = this.props;
    return (
      <div>
        <Link to='/' className='btn btn-primary' >Back</Link>
        <div className='user-details'>
          <h2><u>Username:</u> <strong>{user.username}</strong></h2>
          <h3><u>Name:</u> <strong>{user.name}</strong></h3>
          <p><u>Email:</u> <a href={`mailto:${user.email}`}>{user.email}</a></p>
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
  changeState(){
    this.setState({ editing: true})
  }
  renderEdit(){
    const { user } = this.props;

    return (
      <EditUser user={user}/>
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
