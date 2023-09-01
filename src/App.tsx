import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Home } from "@/components/home/Home";

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
