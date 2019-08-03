import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const database = firebase.initializeApp({
    apiKey: "AIzaSyDF3NWgCsjg-hMfLMpynQ8ZZH0U2VEybRA",
    authDomain: "todo-c8df2.firebaseapp.com",
    databaseURL: "https://todo-c8df2.firebaseio.com",
    projectId: "todo-c8df2",
    storageBucket: "",
    messagingSenderId: "435828250970",
    appId: "1:435828250970:web:69ec7565d64b509e"
}).firestore()