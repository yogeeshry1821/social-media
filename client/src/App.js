
import { CssBaseline, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginpage";
import ProfilePage from "scenes/profilepage";
import {themeSettings} from "./theme"
import { ThemeProvider } from "@emotion/react";
function App() {
  const mode= useSelector((state)=>state.mode)
  const theme=useMemo(()=>createTheme(themeSettings(mode),[mode]))
  return (

    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
