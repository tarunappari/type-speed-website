
import Select from "react-select";
import { themeOptions } from "../Utils/ThemeOptions";
import { useThemeContext } from "../Context/ThemeContext";
import styled from 'styled-components'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";

const Footer = () =>{

    let {theme,setTheme} = useThemeContext();

    function handleChange(e){
        setTheme(e.value);
        localStorage.setItem('theme',JSON.stringify(e.value));
    }
      

    return(
        <FooterContainer>
            <div className="profileLinks">
                <Link to='https://github.com/tarunappari' className="icon" target="_blank"><GitHubIcon /></Link>
                <Link to='https://www.linkedin.com/in/tarun-appari-77ba93280/' className="icon" target="_blank"><LinkedInIcon /></Link>
                <Link to='https://www.facebook.com/tarun.appari' className="icon" target="_blank"><FacebookIcon /></Link>
                <Link to='https://www.instagram.com/_imnomonk____/' className="icon" target="_blank"><InstagramIcon /></Link>
            </div>
            <div>
            <Select 
                styles={{
                    menu : (styles,{isFocused}) =>({
                        ...styles,
                        color:'grey',
                        backgroundColor : (isFocused) ? theme.textColor : theme.background,
                    }),
                    menuList : (styles,{isFocused}) =>({
                        ...styles,
                        color : (isFocused) ? theme.background : theme.textColor,
                        backgroundColor : (isFocused) ? theme.textColor : theme.background,
                        borderRadius:'10px',
                        padding:'0'
                    }),
                    option : (styles,{isFocused}) =>({
                        ...styles,
                        color : (isFocused) ? theme.background : theme.textColor,
                        backgroundColor : (isFocused) ? theme.textColor : theme.background,
                        borderRadius : '3px'
                    }),
                    valueContainer : (styles,{isFocused}) =>({
                        ...styles,
                        cursor : 'pointer'
                    }),
                    singleValue : (styles) =>({
                        ...styles,
                        margin:'0',
                        padding:'0',
                        color : theme.textColor,
                    }),
                    control : (styles,{isFocused}) =>({
                        ...styles,
                        margin:'0',
                        padding:'0',
                        backgroundColor: theme.background,
                        border : (isFocused) ? 'black' : 'white',
                        outline : (isFocused) ? 'black' : 'white',
                    }),
                    dropdownIndicator :  (styles) =>({
                        ...styles,
                        color : theme.textColor,
                    }),

                }}
                   onChange={handleChange}
                   options={themeOptions}
                   menuPlacement="top"
                   defaultValue = {{label:theme.label,value:theme}}
                />
            </div>
        </FooterContainer>
    )
}

export default Footer;

let FooterContainer = styled.div`
    display: flex;
    flex-direction: row !important;
    justify-content: space-between !important;
    margin: 0 6rem;
    width: 80vw !important;
    margin-bottom: 2rem;
    margin-left: 8rem;
    .profileLinks{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        .icon{
            color : ${({theme})=>theme.textColor};
            transition: 0.3s ease;
            width:2rem;
        }
        .icon:hover{
            color : ${({theme})=>theme.timer};
            cursor: pointer;
            font-size:1.7rem;
        }
    }
`