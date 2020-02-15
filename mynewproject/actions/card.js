import firebase from 'firebase';
import db from '../config/firebase';
import uuid from 'uuid'
export const createCard = (newName, recipientsList) => {
	return async (dispatch, getState) => {
		try {
            const { user } = getState()
            const cardObject = {
                name: newName, 
                recipients: recipientsList,
                cover_text: '',
                body_one_text: '',
                body_two_text: '',
                cover_font: '',
                cover_text_align: '',
                cover_text_bold: '',
                cover_text_italic: ''
            }
            // Add card to database
			const ref = db.collection('cards').doc()
			cardObject.id = ref.id
            await ref.set(cardObject)
            // we should save the card id here to the card state!!!!!!!
            //Add card to user.savedTemplates[]
            var userRef = db.collection('users').doc(user.uid)
            await userRef.update({
                savedTemplates: firebase.firestore.FieldValue.arrayUnion(cardObject.id)
            });
            dispatch( {type:'SET_CID',payload: cardObject.id})
		} catch (e) {
			alert(e)
		}
	}
}

export const sendCard = (recipients) => {
    // just a copy paste from createCard, but should be modified to iterate
    // over the cards recipients and populate their recievedCards array
	return async (dispatch, getState) => {
		try {
            const { post, user } = getState()
            const card = {
                name: newName, 
                recipients: recipientsList
            }
            // Add card to database
			const ref = db.collection('cards').doc()
			card.id = ref.id
            await ref.set(card)

            //Add card to user.savedTemplates[]
            var userRef = db.collection('users').doc(user.uid)
            // for loop
            await userRef.update({
                recievedCards: firebase.firestore.FieldValue.arrayUnion(card.id)
            });
		} catch (e) {
			alert(e)
		}
	}
}

export const updateCoverText = (text) => {
  return {type:'UPDATE_COVER_TEXT', payload:text}
}
export const updateBodyoneText = (text) => {
  return {type:'UPDATE_BODY_ONE_TEXT', payload:text}
}
export const updateBodytwoText = (text) => {
  return {type:'UPDATE_BODY_TWO_TEXT', payload:text}
}
export const updateCoverFont = (text) => {
  return {type:'UPDATE_COVER_FONT', payload:text}
}
export const updateCoverTextAlignment = (text) => {
  return {type:'UPDATE_COVER_TEXT_ALIGNMENT', payload:text}
}
export const updateCoverTextBold = (_bool) => {
  return {type:'UPDATE_COVER_TEXT_BOLD', payload:_bool}
}
export const updateCoverTextItalic = (_bool) => {
  return {type:'UPDATE_COVER_TEXT_ITALIC', payload:_bool}
}
export const toggleCoverModal = ( isCoverModalVisible) => {
  return {type:'TOGGLE_MODAL_COVER', payload: isCoverModalVisible}
}
