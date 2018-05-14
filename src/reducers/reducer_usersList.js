import _ from 'lodash';
import { GET_USERS, SHOW_USER, DELETE_USER } from '../actions';

export default function(state = [], action){
  switch(action.type){
    case GET_USERS:
      // RETURN { id: {data}}
      return _.mapKeys(action.payload.data, 'id');

    case SHOW_USER:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case DELETE_USER:
      return _.omit(state, action.id)
  }
  return state;
}
