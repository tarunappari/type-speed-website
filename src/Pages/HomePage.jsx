import Header from '../Components/Header';
import TypeBox from '../Components/TypeBox';
import Footer from '../Components/Footer'
import { styled } from 'styled-components';

const HomePage = () =>{


    return(
        <Container>
             <Header />
             <TypeBox />
             <Footer /> 
        </Container>
    )
}

export default HomePage;

let Container = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-rows:10% 80% 10%;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    
`;
