import Account from "./Account";
import styled from 'styled-components'
import logo from '../Images/logo.svg'

const Header = () =>{


    return(
        <HeaderCotainer>
            <div className="logo">
                <img src={logo} alt="logo" />
                <h2 className="title">FlashType</h2>
            </div>
            <div className="profile">
                <Account />
            </div>
        </HeaderCotainer>
    )
}

export default Header;

let HeaderCotainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:84%;
    margin: 0 auto;
    position: sticky;
    top: 0;
    background-color:  ${({theme})=> theme.background} ;
    z-index: 2;
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.6rem;
        cursor: pointer;
        h2{
            padding-top: 1.1rem;
            color: ${({theme})=> theme.timer};
        }
        img{
            width: 4rem;
        }
    }
`