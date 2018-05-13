import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UsersListReducer from './reducer_usersList';

const rootReducer = combineReducers({
  usersList: UsersListReducer,
  form: formReducer
});

export default rootReducer;
