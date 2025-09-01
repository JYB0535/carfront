import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material"
import CarList from "./pages/CarList"

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
        <CarList/>
      </Container>
    </>
  )
}

export default App
