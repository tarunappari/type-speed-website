import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "./Graph";
import { auth, db } from "../FirebaseConfig";
import { toast } from "react-toastify";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  missedChars,
  extraChars,
  inCorrectChars,
  graphData,
  testTime,
}) => {

  let [restart, setRestart] = useState(false);

  let timeSet = new Set();
  let newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  function pushDataTODB() {
    if (isNaN(accuracy)) {
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

    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;

    resultsRef
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
    if (auth.currentUser) {
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
  margin-left: -3.5rem;
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
