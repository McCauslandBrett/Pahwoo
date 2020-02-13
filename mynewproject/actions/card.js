import firebase from 'firebase';
import db from '../config/firebase';

export const createCard = (newName) => {
	return async (dispatch, getState) => {
		try {
            const { post, user } = getState()
            const card = {
				name: newName
            }
            // Add card to database
			const ref = db.collection('cards').doc()
			card.id = ref.id
            await ref.set(card)
            
            //Add card to user.savedTemplates[]
            var userRef = db.collection('users').doc(user.uid)
            await userRef.update({
                savedTemplates: firebase.firestore.FieldValue.arrayUnion(card.id)
            });
		} catch (e) {
			alert(e)
		}
	}
}