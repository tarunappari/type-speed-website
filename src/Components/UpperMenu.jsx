
import { useTimeModeContext } from "../Context/TimeModeContext";
import styled from 'styled-components'

const UpperMenu = ({countDown}) =>{

    let {setTestTime} = useTimeModeContext();

    function updateTime(e){
        setTestTime(e.target.id)
    }

    return(
        <UpperMenuContainer>
            <div className="timer">
               {countDown}
            </div>
            <div className="modes">
                <div id={15} onClick={updateTime} className="mode">15s</div>
                <div id={30} onClick={updateTime} className="mode">30s</div>
                <div id={60} onClick={updateTime} className="mode">60s</div>
             </div>
        </UpperMenuContainer>
    )
}

export default UpperMenu;

let UpperMenuContainer = styled.div`
    font-size:1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    width: 83%;
    margin: 0 6rem;
    .modes{
        display: flex;
        gap: 0.3rem;
        cursor: pointer;
    }
    .mode{
        color: ${({theme}) => theme.textColor};
    }
    .timer{
        font-size: 1.6rem;
        color: ${({theme}) => theme.timer};
    }
    .mode:hover{
        color:${({theme}) => theme.timer} ;
    }

`;