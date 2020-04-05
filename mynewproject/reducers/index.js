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
    case 'SET_MODE':
      return {...state, mode: action.payload}
    case 'SET_THEME':
      return {...state, theme: action.payload}
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
    case 'UPDATE_SELECTED_PROFILE_VIEW':
        return {...state, selectedProfileView: action.payload}
    case 'UPDATE_REQUESTS':
        return {...state, requests: action.payload}
    case 'UPDATE_CONTACTS':
        return {...state, contacts: action.payload}
  default:
      return state
    }
  }
const invite = (state = {},action) => {
  switch (action.type) {
    case 'TOGGLE_ATTENDING':
      return {...state, isAttending: action.payload}
    case 'TOGGLE_NOT_ATTENDING':
      return {...state, isNotAttending: action.payload}
    default:
        return state
      }
}
const _event = (state = {},action) => {
  switch (action.type) {
    case 'UPDATE_DATE':
      return {...state, date: action.payload}
    case 'UPDATE_TIME':
      return {...state, time: action.payload}
    case 'SET_IMAGE':
      return {...state, image: action.payload}
    case 'UPDATE_LOCATION':
      return {...state, location: action.payload}
    default:
        return state
      }
}
const card = (state = {},action) => {
  switch (action.type) {
    case 'GET_CARD':
        return action.payload
    case 'SET_ID':
        return {...state, id: action.payload}
    case 'SET_NAME':
        return {...state, name: action.payload}
    case 'SET_RECIPIENTS':
        return {...state, recipients: action.payload}
    case 'SET_BACKGROUNDIMAGE':
         return {...state, BackgroundImage: action.payload}
    // COVER
    case 'UPDATE_COVER_TEXT_COLOR':
        return {...state, cover_text_color: action.payload}
    case 'UPDATE_COVER_TEXT':
        return {...state, cover_text: action.payload}
    case 'UPDATE_COVER_FONT':
        return {...state, cover_font: action.payload}
    case 'UPDATE_COVER_TEXT_ALIGNMENT':
        return {...state, cover_text_align: action.payload}
    case 'COVER_BOLD':
        return {...state, cover_bold: action.payload}
    case 'COVER_ITALIC':
      return {...state, cover_italic: action.payload}
    case 'UPDATE_COVER_TEXT_SIZE':
        return {...state, cover_font_size: action.payload}
    case 'UPDATE_COVER_TEXT_BOLD':
        return {...state, cover_text_bold: action.payload}
    case 'UPDATE_COVER_TEXT_ITALIC':
          return {...state, cover_text_italic: action.payload}

    // BODY ONE

    case 'UPDATE_BODY_ONE_TEXT_COLOR':
        return {...state, bodyone_text_color: action.payload}
    case 'UPDATE_BODY_ONE_TEXT':
        return {...state, bodyone_text: action.payload}
    case 'UPDATE_BODY_ONE_FONT':
        return {...state, bodyone_font: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_ALIGNMENT':
        return {...state, bodyone_text_align: action.payload}
    case 'BODY_ONE_BOLD':
        return {...state, bodyone_bold: action.payload}
    case 'BODY_ONE_ITALIC':
      return {...state, bodyone_italic: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_SIZE':
        return {...state, bodyone_font_size: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_BOLD':
        return {...state, bodyone_text_bold: action.payload}
    case 'UPDATE_BODY_ONE_TEXT_ITALIC':
        return {...state, bodyone_text_italic: action.payload}

    // BODY TWO

    case 'UPDATE_BODY_TWO_TEXT':
        return {...state, bodytwo_text: action.payload}
    case 'UPDATE_BODY_TWO_FONT':
        return {...state, bodytwo_font: action.payload}
    case 'UPDATE_BODY_TWO_TEXT_ALIGNMENT':
        return {...state, bodytwo_text_align: action.payload}
    case 'BODY_TWO_BOLD':
        return {...state, bodytwo_bold: action.payload}
    case 'BODY_TWO_ITALIC':
        return {...state, bodytwo_italic: action.payload}
    case 'UPDATE_BODY_TWO_TEXT_SIZE':
        return {...state, bodytwo_font_size: action.payload}
    case 'UPDATE_BODY_TWO_TEXT_COLOR':
        return {...state, bodytwo_text_color: action.payload}
    case 'UPDATE_BODY_TWO_TEXT_BOLD':
        return {...state, bodytwo_text_bold: action.payload}
    case 'UPDATE_BODY_TWO_TEXT_ITALIC':
        return {...state, bodytwo_text_italic: action.payload}
    default:
        return state
  }
}
const rootReducer = combineReducers({
 user,
 card,
 invite,
 _event
})

export default rootReducer
