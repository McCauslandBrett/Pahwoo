import{combineReducers} from 'redux'

const user = (state = {},action) => {
  switch (action.type) {
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
  default:
      return state

  }
}
const rootReducer = combineReducers({
 user,
})

export default rootReducer
