import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import CarList from "./pages/CarList"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import type { JSX } from "react"
import { useAuthStore } from "./store"

type PrivateRouteProps = {
  children: JSX.Element;
}


//라우트 조건부로 하는거 

function PrivateRoute({children}: PrivateRouteProps) {
  const {isAuthenticated} = useAuthStore();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
} 

function App() {


  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              자동차 쇼핑몰
            </Typography>
          </Toolbar>
        </AppBar> 
        <Routes>
          <Route path="/" element = {<PrivateRoute><CarList/></PrivateRoute>} />
          <Route path="/login" element = {<Login/>}/>
        </Routes>
       
      </Container>
    </>
  )
}

export default App
