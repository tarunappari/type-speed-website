import { useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { styled } from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useThemeContext } from "../Context/ThemeContext";

const UserPage = () => {
  let [userData, setUserData] = useState([]);

  let [graphData, setGraphData] = useState([]);

  let {theme} = useThemeContext()

  let [dataLoading, setDataLoading] = useState(true);

  let [user, loading] = useAuthState(auth);

  let navigate = useNavigate();

  function fetchUserData() {
    const resultsRef = db.collection("Results");
    let { uid } = auth.currentUser;

    let tempData = [];
    let tempGraph = [];

    resultsRef //thi will check currUsedId and uid in the results collection in db and return matched one
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc") //we are ordeing in desc order
      .get()
      .then((snapshot) => { //gives a snapshot which contin entire results collection of that matachd id
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraph.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0], //we are only taking date
            doc.data().wpm, 
          ]);
        });
        setUserData(tempData);
        setGraphData(tempGraph.reverse());
        setDataLoading(false);
      });
  }

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div style={{
        display:'flex',
        minHeight:'100vh',
        justifyContent:'center',
        alignItems:'center',
      }}>
        <CircularProgress style={{fontSize:"10rem",backgroundColor:`${({theme})=>theme.timer}`}}/>
      </div>
    );
  }

  return (
    <UserPageContainer>
      <div className="back-space" onClick={() => navigate("/")}>
        <KeyboardBackspaceIcon />
      </div>
      <UserInfo totalTestsTaken={userData.length} />
      {graphData.length === 0 ? (
        <h1>Take test to see your stats</h1>
      ) : (
        <div style={{
            display:'flex',
            flexDirection:'column',
            gap: '3rem',
            marginBottom: '2rem'
        }}>
          <div className="graph-userPage">
            <Graph graphData={graphData} />
          </div>
          <h1 className="h1">Tests Information</h1>
          <TableUserData userData={userData} />
        </div>
      )}
    </UserPageContainer>
  );

  //
};

export default UserPage;

let UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 90vw;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  .back-space {
    position: fixed;
    top: 1rem;
    left: 1rem;
    font-size: 2rem;
    transition: 0.2s ease;
  }
  .back-space:hover {
    color: ${({ theme }) => theme.timer};
    cursor: pointer;
  }
  .table {
    width: 90vw;
    margin: auto;
  }
  .graph-userPage {
    width: 80vw;
    margin: auto;
  }
  .table {
    margin-bottom: 2rem;
  }
  .userInfoContainer {
    min-width: 40vw;
    display: flex;
    padding: 2.5rem;
    gap: 1rem;
    justify-content: space-around;
    .user {
      display: flex;
      border-right: 2px solid ${({ theme }) => theme.textColor};
      padding-right: 1rem;
      align-items: center;
      gap: 1rem;
      .profile {
        font-size: 5rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }
    }
    .testsTaken {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
  }
  .h1 {
    margin-top: 1rem;
    margin-bottom: -2.5rem;
    align-self: flex-start;
    min-width: 85vw;
    margin-left: 3.5rem;
  }
`;
