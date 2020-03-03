import firebase from 'firebase';
import db from '../config/firebase';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

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

export const getPushPermissions = (userID) => {
    return async (dispatch) => {
        try {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            // only asks if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            // On Android, permissions are granted on app installation, so
            // `askAsync` will never prompt the user    
            // Stop here if the user did not grant permissions
            if (status !== 'granted') {
                alert('No notification permissions!');
                return;
            }    
            // Get the token that identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            const ref = db.collection('users').doc(userID);
            
            await ref.update({
                expoToken: token
            });
            dispatch({type:'SAVE_TOKEN',payload:token})
        } catch(e){
            alert(e);
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
          console.log(email)
          console.log(username)
          if(id){
            const user = {
            uid:id,
            email:email,
            username:username,
            birthday:birthday,
            profileImage: '',
            contacts: [],
            receivedCards: [], // new received cards array for CardScreen
            savedTemplates: [] // saved/sent cards
          }
          db.collection("users").doc(id).set(user)
          dispatch({type:'SIGNUP',payload:user})
        }
      } catch(e) {
        alert(e)
      }
    }
  }
  
  // why do we need this, are we using this?
export const  updateProfileImage = (image_id) => {
 return {type:'UPDATE_PROFILE_IMAGE',payload:image_id}
}

// This serves as an example for updating a field in the database
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
        dispatch({type:'UPDATE_PROFILE_IMAGE', payload:user.profileImage})
        console.log("Update user in db")

    }

}
