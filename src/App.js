import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import Tabs from "./components/Table/Tabs";

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <Header />
        <Tabs />
      </Container>
    </>
  );
}

export default App;
