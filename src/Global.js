import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
     
     *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        transition: 0.2s;
     }

     body{
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.textColor};
     }

     @keyframes blinking {
      from{
         border-left-color: ${({ theme }) => theme.correct};;
      }
      to{
         border-left-color: ${({ theme }) => theme.background};;
      }
     }

     @keyframes blinking-right {
     from{
        border-right-color: ${({ theme }) => theme.correct};
     }
     to{
        border-right-color: ${({ theme }) => theme.background};
     }
   }

   .correct{
        color: ${({ theme }) => theme.correct};
    }
    .incorrect{
        color: ${({ theme }) => theme.incorrect};
    }
    .extra{
        color:${({ theme }) => theme.extra};
    }


    /* Styling the main scrollbar */
   ::-webkit-scrollbar {
        width: 0.3rem;  /* Width of the scrollbar */
    }

/* Styling the thumb part of the scrollbar */
::-webkit-scrollbar-thumb {
  background-color:  ${({ theme }) => theme.textColor};  /* Color of the scrollbar thumb */
  border-radius: 5px;      /* Rounded corners for the thumb */
}
   
`;
