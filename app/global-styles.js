import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height:100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }


  #app {
    height: 100%;
    width: 100%;
  }
  .page{
    height:100%;
  }
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .main-container{
    width:1024px;
    padding-bottom:120px;
    margin:0 auto;
    min-height:100%;
    margin-top:-56px;
    padding-top:56px;
  }

  .clearfix:after {
    display:block; 
    content:"clear"; 
    clear:both; 
    line-height:0;
    visibility:hidden;
}
`;

export default GlobalStyle;
