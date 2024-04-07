import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAVaAiO1GiaDNSFLKmDSRqDDnPhPqRJWGE",
    authDomain: "mern-blog-website-677c6.firebaseapp.com",
    projectId: "mern-blog-website-677c6",
    storageBucket: "mern-blog-website-677c6.appspot.com",
    messagingSenderId: "223618414292",
    appId: "1:223618414292:web:00c93411ad9b688ee36d41"
};

const app = initializeApp(firebaseConfig);

//google auth
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result?.user
        })
        .catch((err) => {
            console.log(err);
        })
    return user
}