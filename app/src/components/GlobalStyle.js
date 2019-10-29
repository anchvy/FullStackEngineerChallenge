import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html, body {
    color: #282828;
    height: 100%;
    background: #EEEEEE;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  * {
    // reset css
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyle
