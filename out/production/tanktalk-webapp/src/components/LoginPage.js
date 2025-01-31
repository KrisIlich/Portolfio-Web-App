import React from 'react';
import { auth } from '../firebase-config';
import { useNavigate} from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const LoginPage = () => {

    const navigate = useNavigate();
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                navigate('/');
                })
            .catch((error) => {
                console.error(error)
                });
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};

export default LoginPage;