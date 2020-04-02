import firebase from 'firebase';
import db from '../config/firebase';

export const getContactProfile = (_bool) => {
    return {type:'UPDATE_SELECTED_PROFILE_VIEW', payload:_bool}
}

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
          const response = await firebase.auth().createUserWithEmailAndPassword(email,password)
          const id = response.user.uid
          if(id){
            const user = {
            uid:id,
            email:email,
            username:username,
            birthday:birthday,
            profileImage: '',
            contacts: [],
            requests: [],
            receivedCards: [], // new received cards array for CardScreen
            userCards: [] // saved/sent cards
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

export const makeFriends = (accepted, newContactID, newContactUsername) => {
    return async (dispatch,getState) => {
        const { user } = getState()
        var curUserRef = db.collection('users').doc(user.uid)
        var newUserRef = db.collection('users').doc(newContactID)
        if (accepted){
            // TODO: friend request accepted
            try {
                await curUserRef.update({
                    contacts: firebase.firestore.FieldValue.arrayUnion(newContactID)
                });
                await newUserRef.update({
                    contacts: firebase.firestore.FieldValue.arrayUnion(user.uid)
                });
                await curUserRef.update({
                    requests: firebase.firestore.FieldValue.arrayRemove(
                        {
                            requestingUser: newContactID,
                            username: newContactUsername
                        }
                    )
                });
                // update requests AND contacts arrays in props
                const updatedUser = await db.collection('users').doc(user.uid).get()
                dispatch({type:'UPDATE_REQUESTS', payload: updatedUser.data().requests})
                dispatch({type:'UPDATE_CONTACTS', payload: updatedUser.data().contacts})
            } catch(e){
                alert(e)
            }

        } else {
            // TODO: friend request denied
            try {
                await curUserRef.update({
                    requests: firebase.firestore.FieldValue.arrayRemove(
                        {
                            requestingUser: newContactID,
                            username: newContactUsername
                        }
                    )
                });
                // update requests array in props
                const updatedUser = await db.collection('users').doc(user.uid).get()
                dispatch({type:'UPDATE_REQUESTS', payload: updatedUser.data().requests})
            } catch(e){
                alert(e)
            }
        }
    }
}
