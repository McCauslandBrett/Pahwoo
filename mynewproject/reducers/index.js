import{combineReducers} from 'redux'
const usersDefaultState = [];
const user = (state = {},action) => {
  switch (action.type) {
    case 'LOGOUT':
      return usersDefaultState;
    case 'LOGIN':
      return action.payload
    case 'SIGNUP':
      return action.payload
    case 'UPDATE_EMAIL':
      return {...state, email: action.payload}
    case 'UPDATE_PASSWORD':
      return {...state, password: action.payload}
    case 'UPDATE_USERNAME':
      return {...state, username: action.payload}
    case 'UPDATE_BIRTHDAY':
      return {...state, birthday: action.payload}
    case 'UPDATE_PROFILE_IMAGE':
        return {...state, profileImage: action.payload}
  default:
      return state

  }
}

const card = (state=null, action) => {
    switch (action.type) {
      default:
        return state
    }
  }

const rootReducer = combineReducers({
 user,
 card
})

export default rootReducer
