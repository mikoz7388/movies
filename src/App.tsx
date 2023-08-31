import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Home } from "@/components/Home";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Outlet />
      {location.pathname === "/" && <Home />}
      <Footer />
    </>
  );
}

export default App;
