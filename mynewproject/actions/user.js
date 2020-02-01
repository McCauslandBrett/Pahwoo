import firebase from 'firebase';
import db from '../config/firebase';
export const updateEmail = (email) => {
  return {type:'UPDATE_EMAIL', payload:email}
}
export const updatePassword = (password) => {
  return {type:'UPDATE_PASSWORD',payload:password}
}
export const updateUsername = (username) => {
  return {type:'UPDATE_USERNAME',payload:username}
}
export const updateBirthday = (birthday) => {
  return {type:'UPDATE_BIRTHDAY', payload:birthday}
}
export const getUser = (uid) => {
  return async (dispatch,getState) => {
    try {
      const user = await db.collection('users').doc(uid).get()
      dispatch( {type:'LOGIN',payload:user.data()})
    } catch(e){
      alert(e)
    }
  }
}
export const login = () => {
  return async (dispatch,getState) => {
    try{
      const {email,password} = getState().user
      console.log(email)
      console.log(password)
      const response = await firebase.auth().signInWithEmailAndPassword(email,password)
      // dispatch({type:'LOGIN',payload:response.user})
      console,log("you shouldnt see me")
      dispatch(getUser(response.user.uid))

    } catch(e) {

      alert(e)
    }
  }
}
