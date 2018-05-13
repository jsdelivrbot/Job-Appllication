import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getUsers } from '../actions';

class UsersList extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.getUsers();
  }
  renderUsers(){
    return _.map(this.props.usersList, user => {
      return (
        <Link key={user.id} to={`/users/${user.id}`}>
          <li className='list-group-item'>
            {user.username}
          </li>
        </Link>
      )
    })
  }
  render(){
    return (
      <div>
        <h3>List of users:</h3>
        <ul className='list-group'>
          {this.renderUsers()}
        </ul>
        <div className='new-user'>
          <Link to='/users/new' className='btn btn-primary'>New user</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ usersList }){
  return { usersList }
}


export default connect(mapStateToProps, { getUsers })(UsersList);
