import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "./Graph";
import { auth, db } from "../FirebaseConfig";
import { toast } from "react-toastify";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const Stats = ({  //here we are getting the info from typebox that we have to show in the stats
  wpm,
  accuracy,
  correctChars,
  missedChars,
  extraChars,
  inCorrectChars,
  graphData,
  testTime,
}) => {


  let timeSet = new Set(); //this is a data structure which will only contain unique values
                           //we are filtering graphdata bcaz we have reduntant data per sec we can more than one word
                           //so many timevalues will come
  let newGraph = graphData.filter((i) => { 
    if (!timeSet.has(i[0])) {  //0th index have time value we are chechking that if timeset has that value or not
      timeSet.add(i[0]);  // if not we are adding it to timeset and return iso we can have unique time seconds
      return i;
    }
  });

  function pushDataTODB() {
    if (isNaN(accuracy)) { //if user cant even type one word in the test so accurcy will be NaN so we are not adding this test to DB
      toast.error("Invalid test", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
      return;
    }

    const resultsRef = db.collection("Results"); //if firestore didnt have any collection with the name of results
                                                 //then itll create in db then return its refernce

    const { uid } = auth.currentUser;  //this will return userId from the currentUser

    resultsRef  //we are adding result to the db here
      .add({
        wpm: wpm,
        accuracy: accuracy,
        timeStamp: new Date(),
        characters: `${correctChars}/${inCorrectChars}/${missedChars}/${extraChars}`,
        userId: uid,
        testTime:testTime,
      })
      .then((res) => {
        toast.success("Result saved", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "Dark",
        });
      })
      .catch((err) => {
        toast.error("Not able to save results", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "Dark",
        });
      });
  }

  useEffect(() => {
    if (auth.currentUser) {  //if user is loggedin then result will add to db collection else shows warning to login
      pushDataTODB();
    } else {
      toast.warn("Login to save results", { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
    }
  }, []);

  return (
    <div>
        <ContainerDiv>
          <StatsContainer>
            <div className="left-part">
              <div>
                <div className="title">WPM</div>
                <div className="subTitle" style={{ textAlign: "center" }}>
                  {wpm}
                </div>
              </div>
              <div>
                <div className="title">Accuracy</div>
                <div className="subTitle">
                  {isNaN(accuracy) ? (
                    <div style={{ textAlign: "center" }}>{0}%</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>{accuracy}%</div>
                  )}
                </div>
              </div>
              <div className="charsDiv">
                <div className="title">Characters</div>
                <div className="subTitle chars">
                  {correctChars}/{inCorrectChars}/{missedChars}/{extraChars}{" "}
                </div>
                <div className="hover-div">correct/incorrect/missed/extra</div>
              </div>
            </div>
            <div className="right-part">
              <Graph graphData={newGraph} />
            </div>
          </StatsContainer>
          <div className="lower">
            <div className="restart" onClick={() =>window.location.reload()}>
              <h3>Restart</h3>
              <RotateLeftIcon />
            </div>
            <div className="restart">
              <h3 className="title">Time</h3>
              <h3 className="subTitle" style={{ fontSize: "20px" }}>
                {testTime}s
              </h3>
            </div>
          </div>
        </ContainerDiv>
    </div>
  );
};

export default Stats;


let ContainerDiv = styled.div`
  .title {
    color: ${({ theme }) => theme.correct};
  }
  .subTitle {
    color: ${({ theme }) => theme.timer};
    font-size: 1.5rem;
  }
  .lower {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .restart {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .restart:hover{
            color : ${({theme})=>theme.timer};
            cursor: pointer;
        }
`;

let StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 95%;
  align-items: center;
  gap: 2rem;
  margin-left: 4.5rem;
  .left-part {
    width: 18%;
    margin-right: 3rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
  .right-part {
    width: 50vw;
  }
  color: ${({ theme }) => theme.correct};
  .hover-div {
    position: absolute;
    left: 9rem;
    color: ${({ theme }) => theme.timer};
    background-color: ${({ theme }) => theme.textColor};
    padding: 0.2rem 0.8rem;
    border-radius: 0.5rem;
    top: 22.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .hover-div::before {
    content: "";
    position: absolute;
    left: 45%;
    bottom: 50%;
    transform: rotate(45deg);
    border: 0.7rem solid ${({ theme }) => theme.textColor};
    z-index: -1;
  }
  .charsDiv{
    cursor: pointer;
  }
  .charsDiv:hover .hover-div {
    opacity: 1;
  }
`;
