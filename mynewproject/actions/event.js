import firebase from 'firebase';
import db from '../config/firebase';

export const updateDate = (date) => {
    return {type:'UPDATE_DATE', payload:date}
}
export const updateTime = (time) => {
    return {type:'UPDATE_TIME', payload:time}
}
export const uploadImage = (uri) => {
    return {type:'SET_IMAGE', payload:uri}
    }
