import firebase from 'firebase';
import db from '../config/firebase';

export const createCard = (newName) => {
	return async (dispatch, getState) => {
		try {
			const card = {
				name: newName
			}
			const ref = db.collection('cards').doc()
			card.id = ref.id
			await ref.set(card)
		} catch (e) {
			alert(e)
		}
	}
}