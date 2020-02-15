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
const card = (state = {},action) => {
  switch (action.type) {
    case 'UPDATE_COVER_TEXT':
      return {...state, cover_text: action.payload}
    case 'UPDATE_BODY_ONE_TEXT':
      return {...state, body_one_text: action.payload}
    case 'UPDATE_BODY_TWO_TEXT':
      return {...state, body_two_text: action.payload}
    case 'UPDATE_COVER_FONT':
      return {...state, cover_font: action.payload}
    case 'UPDATE_COVER_TEXT_ALIGNMENT':
      return {...state, cover_text_align: action.payload}
    case 'UPDATE_COVER_TEXT_BOLD':
      return {...state, cover_text_bold: action.payload}
    case 'UPDATE_COVER_TEXT_ITALIC':
        return {...state, cover_text_italic: action.payload}
     case 'TOGGLE_MODAL_COVER':
        return {...state, isCoverModalVisible: action.payload}

      default:
          return state

      }
    }
const rootReducer = combineReducers({
 user,
 card,
})

export default rootReducer
