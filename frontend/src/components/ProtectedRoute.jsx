//rep a wraper for protected route.
import { Navigate } from "react-router-dom";
import { JwtDecode, jwtDecode } from "jwt-decode";
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({children}){ //this is to check if we are authorised before allowing anyone to access the route. therefore they should first be logged in
    const [IsAuthorized, setIsAuthorized] = useState(null)
// //as soon as the protected route is loaded the code will run the auth function to see if there is any token 
// incase we ahve a token and it is not expired te setauthrorized is true incase it is not or it is absent setauthorized is false 
// therefore returnign the navigate component back to /login
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refresh_token = async () =>{
         // refreshes the access token automatically.
         const refresh_token = localStorage.getItem(REFRESH_TOKEN)
         try{
            //send a request using django to get an access token and send response to the /api/token/refresh route with the refresh token giving out an access token
            const res = await api.post("/api/token/refresh",
                {refresh: refresh_token
            });
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // the access here contains the access token
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }

         }catch (error){
            console.log(error)
            setIsAuthorized(false)
         }
    }
    const auth = async () =>{
        //checks if we have an access token, if we ahve one checks whether it has expired, if its expired it auto replies.
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        } 
        const decoded = jwtDecode(token) //auto decodes and gives the access to the value and the expiration date
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000 //the essence of dividing by 1000 is to ensure that the date is displayed in seconds and not milliseconds

        if (tokenExpiration < now){
            await refresh_token
        }
        else{
            setIsAuthorized(true)
        }

    }

    if (IsAuthorized === null){
        return <div> Loading ...</div>
    }// checks if we are have a token. incase system is not able to refresh the token the users is forced to use the login page.
    return IsAuthorized ? children : <Navigate to="/login"/>


}

export default ProtectedRoute;