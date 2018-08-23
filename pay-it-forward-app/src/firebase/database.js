import { database } from './firebase';

export const writeUserData =(userId, username, email) => 
    database.writeUserData(userId, username, email);