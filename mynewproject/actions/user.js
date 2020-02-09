import firebase from 'firebase';
import db from '../config/firebase';


export const logout = () => {
    return {type:'LOGOUT'}
}
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
      dispatch(getUser(response.user.uid))

    } catch(e) {

      alert(e)
    }
  }
}


export const signup = () => {
    return async (dispatch,getState) => {
      try{
          const {email,password,username,birthday} = getState().user
          console.log(email)
          const response = await firebase.auth().createUserWithEmailAndPassword(email,password)
          const id = response.user.uid
          console.log(id)
          console.log(email)
          console.log(username)
          console.log(birthday)
          if(id){
            const user = {
            uid:id,
            email:email,
            username:username,
            birthday:birthday,

          }
          db.collection("users").doc(id).set(user)
          dispatch({type:'SIGNUP',payload:user})
        }
      } catch(e) {
        alert(e)
      }
    }
  }
export const  updateProfileImage = (image_id) => {
 return {type:'UPDATE_PROFILE_IMAGE',payload:image_id}
}
export const uploadImage = (uri) => {
  return async (dispatch,getState) => {
  console.log("uploadImage")

  // get image from phone
  const response = await fetch(uri);

   // Create a Blob
  const blob = await response.blob();

 // Create a root reference
 const storageRef = firebase.storage().ref();

// Create a reference to 'profileImage.jpg'
 const uploadTask = await storageRef.child("users/"+ getState().user.uid +"/profileImage.jpg").put(blob);
 const downloadUrl = await uploadTask.ref.getDownloadURL()

const user = {
   uid:getState().user.uid,
   email:getState().user.email,
   username:getState().user.username,
   birthday:getState().user.birthday,
   profileImage: downloadUrl
 }

 db.collection("users").doc(user.uid).update(user)
 console.log("Update user in db")

}

 }
