import Container from "@mui/material/Container";
import MainHeader from "./components/MainHeader/MainHeader";
import LabTabs from "./components/Table/Tabs";

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <MainHeader />
        <LabTabs />
      </Container>
    </>
  );
}

export default App;
