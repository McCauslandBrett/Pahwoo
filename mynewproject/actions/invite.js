import firebase from 'firebase';
import db from '../config/firebase';

export const toggleNotAttending = (_bool) => {
    return {type:'TOGGLE_NOT_ATTENDING', payload:_bool}
}
export const toggleAttending = (_bool) => {
    return {type:'TOGGLE_ATTENDING', payload:_bool}
}
