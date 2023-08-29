import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../FirebaseConfig"
import { AccountCircle } from "@mui/icons-material"



const UserInfo = ({totalTestsTaken}) =>{

    //this will current user
    let [user] = useAuthState(auth)

    return(
        <div className="userInfoContainer">
            <div className="user">
                <div>
                    <AccountCircle className="profile"/>
                </div>
                <div className="info">
                   <div>
                       {user.email}
                   </div>
                   <div>
                       {user.metadata.creationTime}
                   </div>
                </div>
            </div>
            <div className="testsTaken">
                <h4>Total Tests Taken</h4>
                <h2>{totalTestsTaken}</h2>
            </div>
        </div>
    )
}

export default UserInfo