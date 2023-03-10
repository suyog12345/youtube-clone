import React from "react";
import './loginScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../redux/actions/auth.action";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const LoginScreen =()=>{

    const dispatch=useDispatch();


    const accessToken=useSelector(state=>state.auth.accessToken)

    const handleLogin=()=>{
        dispatch(login())
    }

    const history = useNavigate();

    useEffect(()=>{
        if(accessToken)
        {
        history('/')
        }
    },[accessToken,history])



    return(
        <div className="login">
            <div className="login__container">
                <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"/>
                <button onClick={handleLogin}>Login with Google</button>
                <p>This project is made using Youtube API</p>
                <p>by Suyog Sinnarkar</p>
            </div>
        </div>
    )
}
export default LoginScreen;