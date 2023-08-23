import styled from "styled-components";
import React, { useState, useEffect, useRef, useMemo, createRef } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTimeModeContext } from "../Context/TimeModeContext";
import Stats from "./Stats";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useThemeContext } from "../Context/ThemeContext";

const TypeBox = () => {
  
  let {theme} = useThemeContext()
  
  let [testStarted, setTestStarted] = useState(false);
  let [testEnded, setTestEnded] = useState(false);

  let [currWordIndex, setCurrWordIndex] = useState(0);
  let [currCharIndex, setCurrCharIndex] = useState(0);

  let [words, setWords] = useState(() => generate(50));
  let inputRef = useRef(null);

  let { testTime } = useTimeModeContext();
  let [countDown, setCountDown] = useState(testTime);
  let [intervalId, setIntervalId] = useState(null);

  let [correctChars, setCorrectChars] = useState(0);
  let [extraChars, setExtraChars] = useState(0);
  let [missedChars, setMissedChars] = useState(0);
  let [inCorrectChars, setIncorrectChars] = useState(0);
  let [correctWords, setCorrectWords] = useState(0);

  let [graphData, setGraphData] = useState([]);

  useEffect(() => {
    focusInput();
    wordsRef[0].current.childNodes[0].className = "current";
  }, []);

  //testReset function which will reset everything whenever the testTime is clicked in b/w the test
  function resetTest() {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStarted(false);
    setTestEnded(false);
    setWords(generate(50));
    focusInput();
    resetWordsRef();
  }

  function resetWordsRef() {
    wordsRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });

    wordsRef[0].current.childNodes[0].className = "current";
  }

  useEffect(() => {
    resetTest();
  }, [testTime]);

  //func to calculate WPM
  let calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  //func to calculate means how many words were typed correctly
  let calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  //func to starttimer and to end the test
  function startTimer() {
    let intervalId = setInterval(timer, 1000);

    setIntervalId(intervalId);

    function timer() {
      //this is for graphData mean sec to sec analysis how many chars we have type in a sec
      setCountDown((latestcountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latestcountDown + 1,
                correctChars / 5 / (testTime - latestcountDown + 1) / 60,
              ],
            ];
          });
          return correctChars;
        });

        if (latestcountDown === 1) {
          inputRef.current.blur();
          setTestEnded(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestcountDown - 1;
      });
    }
  }

  function focusInput() {
    inputRef.current.focus();
  }

  function handleInput(e) {
    if (!testStarted) {
      startTimer();
      setTestStarted(true);
    }

    let allCurrChars = wordsRef[currWordIndex].current.childNodes;

    //logic for space button when we click the space then the control should have move to next word
    if (e.keyCode === 32) {
      let correctCharsInWords =
        wordsRef[currWordIndex].current.querySelectorAll(".correct");

      if (correctCharsInWords.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        //moving to another word in b/w the word
        setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
        allCurrChars[currCharIndex].classList.remove("current");
      }

      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      wordsRef[currWordIndex + 1].current.childNodes[0].className = "current";
      return;
    }

    //if user click backspace we have correct them
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        //only allowing user to send if index is not 0 if it is 0 then
        // it will go back to previous word we are not allowing that

        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }

          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (allCurrChars.length === currCharIndex) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    //if typed char is matched with currchar then it have green color else it will have red one
    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allCurrChars[currCharIndex].className = "incorrect";
      setIncorrectChars(inCorrectChars + 1);
    }

    //if word reaches to end character then should be in right of the char thts y we are adding current-right which will give right cursor
    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-right";
    } else {
      allCurrChars[currCharIndex + 1].className = "current";
    }

    setCurrCharIndex(currCharIndex + 1);
  }

  let wordsRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [words]);

  return (
    <Main>
      {testEnded ? null : <UpperMenu countDown={countDown} />}
      <WordsContainer onClick={focusInput}>
        {testEnded ? (
          <div className="statsDiv">
            <Stats
              wpm={calculateWPM()}
              accuracy={calculateAccuracy()}
              correctChars={correctChars}
              inCorrectChars={inCorrectChars}
              missedChars={missedChars}
              extraChars={extraChars}
              graphData={graphData}
              testTime={testTime}
            />
          </div>
        ) : (
            words &&
              words.map((word, index) => (
                <span key={index} ref={wordsRef[index]} className="word">
                  {word.split("").map((char) => (
                    <span className="char">{char}</span>
                  ))}
                </span>
              ))
        )}
        {testEnded ? (null):(<div className="reset" onClick={resetTest}>
            <RestartAltIcon />
        </div>)}
      </WordsContainer>
      <input type="text" onKeyDown={handleInput} ref={inputRef} />
    </Main>
  );
};

export default TypeBox;

let Main = styled.div`
  && > input {
    opacity: 0;
  }

  .current {
    border-left: 2px solid;
    animation: blinking 1s infinite;
  }

  .current-right {
    border-right: 2px solid;
    animation: blinking-right 1s infinite;
  }
`;

let WordsContainer = styled.div`
  display: flex;
  max-width: 85vw;
  gap: 0.1rem;
  max-height: 50vw;
  flex-wrap: wrap;
  padding: 0.5rem;
  margin: 0 6rem;
  align-items: center;
  .statsDiv {
    margin-left: 9rem;
    justify-self: center;
    align-self: center;
  }
  && > span {
    padding: 0 0.2rem;
    font-size: 1.3rem;
    align-self: flex-start;
  }
  .reset{
    min-width: 100%;
    margin-top: 0.7rem;
    text-align: end;
    color: ${({theme})=>theme.timer};
    padding-right: 1.9rem;
    cursor: pointer;
  }
`;
