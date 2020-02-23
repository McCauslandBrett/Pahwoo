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
    case 'SET_ID':
        return {...state, id: action.payload}
    case 'SET_RECIPIENTS':
        return {...state, recipients: action.payload}
    // cover
    case 'COVER_ITALIC':
      return {...state, cover_italic: action.payload}
     case 'COVER_BOLD':
         return {...state, cover_bold: action.payload}
    case 'UPDATE_COVER_TEXT':
      return {...state, cover_text: action.payload}
    case 'UPDATE_COVER_FONT':
        return {...state, cover_font: action.payload}
    case 'UPDATE_COVER_TEXT_SIZE':
        return {...state, cover_font_size: action.payload}
    case 'UPDATE_COVER_TEXT_COLOR':
        return {...state, cover_text_color: action.payload}
    case 'UPDATE_COVER_TEXT_ALIGNMENT':
        return {...state, cover_text_align: action.payload}
    case 'UPDATE_COVER_TEXT_BOLD':
        return {...state, cover_text_bold: action.payload}
    case 'UPDATE_COVER_TEXT_ITALIC':
          return {...state, cover_text_italic: action.payload}
    case 'TOGGLE_MODAL_COVER':
          return {...state, isCoverModalVisible: action.payload}
    //BODY ONE
    case 'BODY_ONE_ITALIC':
      return {...state, bodyone_italic: action.payload}
     case 'BODY_ONE_BOLD':
         return {...state, bodyone_bold: action.payload}
    case 'UPDATE_BODY_ONE_TEXT':
      return {...state, bodyone_text: action.payload}
    case 'UPDATE_BODY_ONE_FONT':
        return {...state, bodyone_font: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_SIZE':
        return {...state, bodyone_font_size: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_COLOR':
        return {...state, bodyone_text_color: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_ALIGNMENT':
        return {...state, bodyone_text_align: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_BOLD':
        return {...state, bodyone_text_bold: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_ITALIC':
          return {...state, bodyone_text_italic: action.payload}
    case 'TOGGLE_MODAL_BODY_ONE':
          return {...state, isBodyoneModalVisible: action.payload}
    //Body two
    case 'COVER_ITALIC':
      return {...state, bodytwo_italic: action.payload}
     case 'COVER_BOLD':
         return {...state, bodytwo_bold: action.payload}
    case 'UPDATE_COVER_TEXT':
      return {...state, bodytwo_text: action.payload}
    case 'UPDATE_COVER_FONT':
        return {...state, bodytwo_font: action.payload}
    case 'UPDATE_COVER_TEXT_SIZE':
        return {...state, bodytwo_font_size: action.payload}
    case 'UPDATE_COVER_TEXT_COLOR':
        return {...state, bodytwo_text_color: action.payload}
    case 'UPDATE_COVER_TEXT_ALIGNMENT':
        return {...state, bodytwo_text_align: action.payload}
    case 'UPDATE_COVER_TEXT_BOLD':
        return {...state, bodytwo_text_bold: action.payload}
    case 'UPDATE_COVER_TEXT_ITALIC':
          return {...state, bodytwo_text_italic: action.payload}
    case 'TOGGLE_MODAL_COVER':
          return {...state, isbodytwoModalVisible: action.payload}

      default:
          return state

      }
    }
const rootReducer = combineReducers({
 user,
 card,
})

export default rootReducer
