import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { Outlet, useLocation } from "react-router-dom";
import { Home } from "@/components/Home";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Container>
        <Outlet />
        {location.pathname === "/" ? <Home /> : null}
      </Container>
      <Footer />
    </>
  );
}

export default App;
