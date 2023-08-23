
import { GlobalStyle } from "./Global";
import {ThemeProvider} from "styled-components";
import { useThemeContext } from "./Context/ThemeContext";
import { TimeModeContextProvider } from "./Context/TimeModeContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./Pages/HomePage";
import { Route, Routes } from 'react-router-dom';
import UserPage from './Pages/UserPage';

function App() {

  let {theme} = useThemeContext()

  return (

    <TimeModeContextProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer />
             <GlobalStyle />

             <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/user' element={<UserPage />} />
             </Routes>

          </ThemeProvider>
    </TimeModeContextProvider>
  );
}

export default App;


