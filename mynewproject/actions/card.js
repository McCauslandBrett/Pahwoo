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
            }
            // Add card to database
			const ref = db.collection('cards').doc()
			cardObject['id'] = ref.id
            await ref.set(cardObject);
            // we should save the card id here to the card state!!!!!!!
            //Add card to user.savedTemplates[]
            var userRef = db.collection('users').doc(user.uid)
            await userRef.update({
                savedTemplates: firebase.firestore.FieldValue.arrayUnion(cardObject.id)
            });
            dispatch( {type:'SET_ID',payload: cardObject.id})
            dispatch( {type:'SET_NAME',payload: cardObject.name})
            dispatch( {type:'SET_RECIPIENTS',payload: cardObject.recipients})

            dispatch( {type:'UPDATE_COVER_TEXT',payload: cardObject.cover_text})
            dispatch( {type:'UPDATE_COVER_FONT',payload: cardObject.cover_font})
            dispatch( {type:'UPDATE_COVER_TEXT_ALIGNMENT',payload: cardObject.cover_text_align})
            dispatch( {type:'COVER_BOLD',payload: cardObject.cover_bold})
            dispatch( {type:'COVER_ITALIC',payload: cardObject.cover_italic})
            dispatch( {type:'UPDATE_COVER_TEXT_SIZE',payload: cardObject.cover_font_size})
            dispatch( {type:'UPDATE_COVER_TEXT_COLOR',payload: cardObject.cover_text_color})
            dispatch( {type:'UPDATE_COVER_TEXT_BOLD',payload: cardObject.cover_text_bold})
            dispatch( {type:'UPDATE_COVER_TEXT_ITALIC',payload: cardObject.cover_text_italic})
            dispatch( {type:'TOGGLE_MODAL_COVER',payload: cardObject.isCoverModalVisible})

            dispatch( {type:'UPDATE_BODY_ONE_TEXT',payload: cardObject.bodyone_text})
            dispatch( {type:'UPDATE_BODY_ONE_FONT',payload: cardObject.bodyone_font})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_ALIGNMENT',payload: cardObject.bodyone_text_align})
            dispatch( {type:'BODY_ONE_BOLD',payload: cardObject.bodyone_bold})
            dispatch( {type:'BODY_ONE_ITALIC',payload: cardObject.bodyone_italic})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_SIZE',payload: cardObject.bodyone_font_size})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_COLOR',payload: cardObject.bodyone_text_color})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_BOLD',payload: cardObject.bodyone_text_bold})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_ITALIC',payload: cardObject.bodyone_text_italic})
            dispatch( {type:'TOGGLE_MODAL_BODY_ONE',payload: cardObject.isBodyoneModalVisible})

            dispatch( {type:'UPDATE_BODY_TWO_TEXT',payload: cardObject.bodytwo_text})
            dispatch( {type:'UPDATE_BODY_TWO_FONT',payload: cardObject.bodytwo_font})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_ALIGNMENT',payload: cardObject.bodytwo_text_align})
            dispatch( {type:'BODY_TWO_BOLD',payload: cardObject.bodytwo_bold})
            dispatch( {type:'BODY_TWO_ITALIC',payload: cardObject.bodytwo_italic})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_SIZE',payload: cardObject.bodytwo_font_size})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_COLOR',payload: cardObject.bodytwo_text_color})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_BOLD',payload: cardObject.bodytwo_text_bold})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_ITALIC',payload: cardObject.bodytwo_text_italic})
            dispatch( {type:'TOGGLE_MODAL_BODY_TWO',payload: cardObject.isBodytwoModalVisible})
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
            dispatch( {type:'SET_ID',payload: cardData[0].id})
            dispatch( {type:'SET_NAME',payload: cardData[0].name})
            dispatch( {type:'SET_RECIPIENTS',payload: cardData[0].recipients})

            dispatch( {type:'UPDATE_COVER_TEXT',payload: cardData[0].cover_text})
            dispatch( {type:'UPDATE_COVER_FONT',payload: cardData[0].cover_font})
            dispatch( {type:'UPDATE_COVER_TEXT_ALIGNMENT',payload: cardData[0].cover_text_align})
            dispatch( {type:'COVER_BOLD',payload: cardData[0].cover_bold})
            dispatch( {type:'COVER_ITALIC',payload: cardData[0].cover_italic})
            dispatch( {type:'UPDATE_COVER_TEXT_SIZE',payload: cardData[0].cover_font_size})
            dispatch( {type:'UPDATE_COVER_TEXT_COLOR',payload: cardData[0].cover_text_color})
            dispatch( {type:'UPDATE_COVER_TEXT_BOLD',payload: cardData[0].cover_text_bold})
            dispatch( {type:'UPDATE_COVER_TEXT_ITALIC',payload: cardData[0].cover_text_italic})
            dispatch( {type:'TOGGLE_MODAL_COVER',payload: cardData[0].isCoverModalVisible})

            dispatch( {type:'UPDATE_BODY_ONE_TEXT',payload: cardData[0].bodyone_text})
            dispatch( {type:'UPDATE_BODY_ONE_FONT',payload: cardData[0].bodyone_font})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_ALIGNMENT',payload: cardData[0].bodyone_text_align})
            dispatch( {type:'BODY_ONE_BOLD',payload: cardData[0].bodyone_bold})
            dispatch( {type:'BODY_ONE_ITALIC',payload: cardData[0].bodyone_italic})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_SIZE',payload: cardData[0].bodyone_font_size})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_COLOR',payload: cardData[0].bodyone_text_color})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_BOLD',payload: cardData[0].bodyone_text_bold})
            dispatch( {type:'UPDATE_BODY_ONE_TEXT_ITALIC',payload: cardData[0].bodyone_text_italic})
            dispatch( {type:'TOGGLE_MODAL_BODY_ONE',payload: cardData[0].isBodyoneModalVisible})

            dispatch( {type:'UPDATE_BODY_TWO_TEXT',payload: cardData[0].bodytwo_text})
            dispatch( {type:'UPDATE_BODY_TWO_FONT',payload: cardData[0].bodytwo_font})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_ALIGNMENT',payload: cardData[0].bodytwo_text_align})
            dispatch( {type:'BODY_TWO_BOLD',payload: cardData[0].bodytwo_bold})
            dispatch( {type:'BODY_TWO_ITALIC',payload: cardData[0].bodytwo_italic})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_SIZE',payload: cardData[0].bodytwo_font_size})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_COLOR',payload: cardData[0].bodytwo_text_color})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_BOLD',payload: cardData[0].bodytwo_text_bold})
            dispatch( {type:'UPDATE_BODY_TWO_TEXT_ITALIC',payload: cardData[0].bodytwo_text_italic})
            dispatch( {type:'TOGGLE_MODAL_BODY_TWO',payload: cardData[0].isBodytwoModalVisible})

        } catch (e){
            alert(e)
        }
    }
}

export const saveCard = (id) => {
    return async (dispatch, getState) => {
        const { card } = getState()
        let cardData = []
        try{
            // update card in database
            const ref = db.collection('cards').doc(card.id);
            // ref.update({
            //     recipients: card.recipientsList,
            //     cover_text: card.cover_text,
            //     body_one_text: card.body_one_text,
            //     body_two_text: card.body_two_text,
            //     cover_font: card.cover_font,
            //     cover_text_align: card.cover_text_align,
            //     cover_text_bold: card.cover_text_bold,
            //     cover_text_italic: card.cover_text_italic,
            //     isCoverModalVisible: card.isCoverModalVisible
            // })


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
export const updateCoverTextColor = (color) => {
  return {type:'UPDATE_COVER_TEXT_COLOR', payload:color}
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
// body One
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
export const updateBodyoneTextColor = (color) => {
  return {type:'UPDATE_BODY_ONE_TEXT_COLOR', payload:color}
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
export const updateBodytwoTextColor = (color) => {
  return {type:'UPDATE_BODY_TWO_TEXT_COLOR', payload:color}
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



//
// const cardObject = {
//     name: newName,
//     recipients: recipientsList,
//     cover_text: newName,
//     body_one_text: newName,
//     body_two_text: newName,
//     font: {
//         cover: null,
//         body1: null,
//         body2: null
//     },
//     text_align: {
//         cover: null,
//         body1: null,
//         body2: null
//     },
//     bold: {
//         cover: false,
//         body1: false,
//         body2: false,
//     },
//     cover_text_italic: {
//         cover: false,
//         body1: false,
//         body2: false,
//     },
//     isCoverModalVisible: {
//         cover: false,
//         body1: false,
//         body2: false,
//     }
// }



// const cardObject = {
//     name: newName,
//     recipients: recipientsList,
//     cover: {
//         text: newName,
//         font: null,
//         align: null,
//         bold: false,
//         italic: false,
//         isModalVisible: false
//     },
//     body1: {
//         text: newName,
//         font: null,
//         align: null,
//         bold: false,
//         italic: false,
//         isModalVisible: false
//     },
//     body2: {
//         text: newName,
//         font: null,
//         align: null,
//         bold: false,
//         italic: false,
//         isModalVisible: false
//     }
// }
