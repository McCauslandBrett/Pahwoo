import firebase from 'firebase';
import db from '../config/firebase';
export const createCard = (newName, recipientsList) => {
	return async (dispatch, getState) => {
		try {
            const { user } = getState()
            const cardObject = {
                name: newName,
                recipients: recipientsList,

                cover_text: newName,
                cover_font: null,
                cover_text_align: null,
                cover_bold: null,
                cover_italic: null,
                cover_font_size: 32,
                cover_text_color: null,
                cover_text_bold: false,
                cover_text_italic: false,
                isCoverModalVisible: false,

                bodyone_text: newName,
                bodyone_font: null,
                bodyone_text_align: null,
                bodyone_bold: null,
                bodyone_italic: null,
                bodyone_font_size: 32,
                bodyone_text_color: null,
                bodyone_text_bold: false,
                bodyone_text_italic: false,
                isBodyoneModalVisible: false,

                bodytwo_text: newName,
                bodytwo_font: null,
                bodytwo_text_align: null,
                bodytwo_bold: null,
                bodytwo_italic: null,
                bodytwo_font_size: 32,
                bodytwo_text_color: null,
                bodytwo_text_bold: false,
                bodytwo_text_italic: false,
                isBodytwoModalVisible: false,

                BackgroundImage: ''
            }
            // Add card to database
            const ref = db.collection('cards').doc()
            //Add the unique ID to the new card object
            cardObject['id'] = ref.id

            // add the card to the database
            await ref.set(cardObject);

            // we should save the card id here to the card state!!!!!!!
            //Add card to user.savedTemplates[]
            var userRef = db.collection('users').doc(user.uid)
            await userRef.update({
                savedTemplates: firebase.firestore.FieldValue.arrayUnion(cardObject.id)
            });
            dispatch( {type:'GET_CARD', payload: cardObject})
		} catch (e) {
			alert(e)
		}
	}
}


export const getCard = (id) => {
    return async (dispatch, getState) => {
        let cardData = []
        try{
            const query = await db.collection('cards').where('id', '==', id).get()
            query.forEach((response) => {
                cardData.push(response.data())
            })
            dispatch( {type:'GET_CARD', payload: cardData[0]})

        } catch (e){
            alert(e)
        }
    }

}
//precondition:
//postcondition: Card data has been added to database
//Notes:
// possible opputunity for optimization, as is , we are uploading everything includeing a image
// wether or not there are changes we could create some flags to toggle that could prevent unesicarry
// writes.
// Errors: Firebase error [code=invalid-argument] db.collection('cards').doc(card.id);
export const saveCard = (selectedItems) => {
    return async (dispatch, getState) => {
        dispatch( {type:'SET_RECIPIENTS',payload: selectedItems})
        const { card } = getState()
        let cardData = []
        try{
            // update card in database
					  const ref = db.collection('cards').doc(card.id);

						// updating background Image
						//
						// if(card.BackgroundImage != null){
						// 	const blob = await card.BackgroundImage.blob();
						// 	// Create a root reference
						// 	const imageRef = firebase.storage().ref();
						// 	// Create a reference to 'profileImage.jpg'
						// 	const uploadTask = await storageRef.child("cards/"+ card.id +"/BackgroundImage.jpg").put(blob);
						// 	downloadUrl = await uploadTask.ref.getDownloadURL();
						// }

						// end updating background Image
            await ref.update({
				BackgroundImage: card.BackgroundImage,
                recipients: card.recipients,

                cover_text: card.cover_text,
                cover_font: card.cover_font,
                cover_text_align: card.cover_text_align,
                cover_bold: card.cover_bold,
                cover_italic: card.cover_italic,
                cover_font_size: card.cover_font_size,
                cover_text_color: card.cover_text_color,
                cover_text_bold: card.cover_text_bold,
                cover_text_italic: card.cover_text_italic,
                isCoverModalVisible: card.isCoverModalVisible,

                bodyone_text: card.bodyone_text,
                bodyone_font: card.bodyone_font,
                bodyone_text_align: card.bodyone_text_align,
                bodyone_bold: card.bodyone_bold,
                bodyone_italic: card.bodyone_italic,
                bodyone_font_size: card.bodyone_font_size,
                bodyone_text_color: card.bodyone_text_color,
                bodyone_text_bold: card.bodyone_text_bold,
                bodyone_text_italic: card.bodyone_text_italic,
                isBodyoneModalVisible: card.isBodyoneModalVisible,

                bodytwo_text: card.bodytwo_text,
                bodytwo_font: card.bodytwo_font,
                bodytwo_text_align: card.bodytwo_text_align,
                bodytwo_bold: card.bodytwo_bold,
                bodytwo_italic: card.bodytwo_italic,
                bodytwo_font_size: card.bodytwo_font_size,
                bodytwo_text_color: card.bodytwo_text_color,
                bodytwo_text_bold: card.bodytwo_text_bold,
                bodytwo_text_italic: card.bodytwo_text_italic,
                isBodytwoModalVisible: card.isBodytwoModalVisible,
            });
            // this function is missing the dispaches. We might not have to dispatch every single field.
            // Instead, we could dispatch the entire card object from the database, just like how the
            // entire user is dispatched in some of the actions
        } catch (e){
            alert(e)
        }
    }
}

export const sendCard = (recipients) => {
    // Iterate over the card's recipients and populate their recievedCards array
	return async (dispatch, getState) => {
		try {
            const { card } = getState()
            for (var i = 0; i < card.recipients.length; i++){
                // get reference to recipient
                const recipientUser = db.collection('users').doc(card.recipients[i])
                //Add card to recipientUser.recievedCards[]
                await recipientUser.update({
                    receivedCards: firebase.firestore.FieldValue.arrayUnion(card.id)
                });
            }
		} catch (e) {
			alert(e)
		}
	}
}
// Cover
export const updateCoverText = (text) => {
  return {type:'UPDATE_COVER_TEXT', payload:text}
}
export const updateCoverTextSize = (text) => {
  return {type:'UPDATE_COVER_TEXT_SIZE', payload:text}
}
export const updateCoverFont = (text) => {
  return {type:'UPDATE_COVER_FONT', payload:text}
}
export const updateCoverTextAlignment = (text) => {
  return {type:'UPDATE_COVER_TEXT_ALIGNMENT', payload:text}
}
export const updateCoverItalic = (_bool) => {
  if(_bool){
  return  {type:'COVER_ITALIC',payload:'italic'}
  }
  else{
  return {type:'COVER_ITALIC',payload:null}
  }
}
export const updateCoverTextColor = (color_obj) => {
  return {type:'UPDATE_COVER_TEXT_COLOR', payload:color_obj}
}
export const updateCoverBold = (_bool) => {
  if(_bool){
  return  {type:'COVER_BOLD',payload:'bold'}
  }
  else{
  return {type:'COVER_BOLD',payload:null}
  }
}
export const updateCoverTextBold = (_bool) => {
  return (dispatch) =>{
  updateCoverBold(_bool)
  dispatch( {type:'UPDATE_COVER_TEXT_BOLD', payload:_bool})
  dispatch(updateCoverBold(_bool))
}
}
export const updateCoverTextItalic = (_bool) => {
  return (dispatch) =>{
    dispatch({type:'UPDATE_COVER_TEXT_ITALIC', payload:_bool})
    dispatch(updateCoverItalic(_bool))
}
}
export const toggleCoverModal = ( isCoverModalVisible) => {
  return {type:'TOGGLE_MODAL_COVER', payload: isCoverModalVisible}
}
export const toggleCoverColorModal = ( isModalVisible) => {
  return {type:'TOGGLE_MODAL_COVER_COLOR', payload: isModalVisible}
}
// body One
export const toggleBodyoneColorModal = ( isModalVisible) => {
  return {type:'TOGGLE_MODAL_BODY_ONE_COLOR', payload: isModalVisible}
}
export const updateBodyoneTextColor = (color_obj) => {
  return {type:'UPDATE_BODY_ONE_TEXT_COLOR', payload:color_obj}
}
export const updateBodyoneText = (text) => {
  return {type:'UPDATE_BODY_ONE_TEXT', payload:text}
}
export const updateBodyoneTextSize = (text) => {
  return {type:'UPDATE_BODY_ONE_TEXT_SIZE', payload:text}
}
export const updateBodyoneFont = (text) => {
  return {type:'UPDATE_BODY_ONE_FONT', payload:text}
}
export const updateBodyoneTextAlignment = (text) => {
  return {type:'UPDATE_BODY_ONE_TEXT_ALIGNMENT', payload:text}
}
export const updateBodyoneItalic = (_bool) => {
  if(_bool){
  return  {type:'BODY_ONE_ITALIC',payload:'italic'}
  }
  else{
  return {type:'BODY_ONE_ITALIC',payload:null}
  }
}
export const updateBodyoneBold = (_bool) => {
  if(_bool){
  return  {type:'BODY_ONE_BOLD',payload:'bold'}
  }
  else{
  return {type:'BODY_ONE_BOLD',payload:null}
  }
}
export const updateBodyoneTextBold = (_bool) => {
  return (dispatch) =>{
  updateCoverBold(_bool)
  dispatch( {type:'UPDATE_BODY_ONE_TEXT_BOLD', payload:_bool})
  dispatch(updateBodyoneBold(_bool))
}
}
export const updateBodyoneTextItalic = (_bool) => {
  return (dispatch) =>{
    dispatch({type:'UPDATE_BODY_ONE_TEXT_ITALIC', payload:_bool})
    dispatch(updateBodyoneItalic(_bool))
}
}
export const toggleBodyoneModal = ( isBodyoneModalVisible) => {
  return {type:'TOGGLE_MODAL_BODY_ONE', payload: isBodyoneModalVisible}
}
// Body Two
export const updateBodytwoTextColor = (color) => {
  return {type:'UPDATE_BODY_TWO_TEXT_COLOR', payload:color}
}
export const toggleBodytwoColorModal = ( isModalVisible) => {
  return {type:'TOGGLE_MODAL_BODY_TWO_COLOR', payload: isModalVisible}
}
export const updateBodytwoText = (text) => {
  return {type:'UPDATE_BODY_TWO_TEXT', payload:text}
}
export const updateBodytwoTextSize = (text) => {
  return {type:'UPDATE_BODY_TWO_TEXT_SIZE', payload:text}
}
export const updateBodytwoFont = (text) => {
  return {type:'UPDATE_BODY_TWO_FONT', payload:text}
}
export const updateBodytwoTextAlignment = (text) => {
  return {type:'UPDATE_BODY_TWO_TEXT_ALIGNMENT', payload:text}
}
export const updateBodytwoItalic = (_bool) => {
  if(_bool){
  return  {type:'BODY_TWO_ITALIC',payload:'italic'}
  }
  else{
  return {type:'BODY_TWO_ITALIC',payload:null}
  }
}
export const updateBodytwoBold = (_bool) => {
  if(_bool){
  return  {type:'BODY_TWO_BOLD',payload:'bold'}
  }
  else{
  return {type:'BODY_TWO_BOLD',payload:null}
  }
}
export const updateBodytwoTextBold = (_bool) => {
  return (dispatch) =>{
  updateBodytwoBold(_bool)
  dispatch( {type:'UPDATE_BODY_TWO_TEXT_BOLD', payload:_bool})
  dispatch(updateBodytwoBold(_bool))
}
}
export const updateBodytwoTextItalic = (_bool) => {
  return (dispatch) =>{
    dispatch({type:'UPDATE_BODY_TWO_TEXT_ITALIC', payload:_bool})
    dispatch(updateBodytwoItalic(_bool))
}
}
export const toggleBodytwoModal = ( isCoverModalVisible) => {
  return {type:'TOGGLE_MODAL_BODY_TWO', payload: isCoverModalVisible}
}

// precondition: User selected a card from device
// postcondition: Photo url has been updated in local redux
// Note:
// for the card we dont want to send a change of the photo to the database as this
// would be very wasteful instead we will save it to the local state as a uri
// If the user hits save we will upload the image to the database
export const uploadCardBackgroundImage = (uri) => {
    return async (dispatch,getState) => {

        dispatch({type:'SET_BACKGROUNDIMAGE', payload:uri})
        console.log("Update card image in local state")

    }
}
