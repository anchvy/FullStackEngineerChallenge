import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html, body {
    height: 100%;
    background: #EEEEEE;
    font-size: 14px;
  }

  * {
    // reset css
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyle
