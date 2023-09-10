import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Home } from "@/components/home/Home";

function App() {
  const location = useLocation();

  console.log("rendering App");

  return (
    <>
      <Header />
      <Outlet />
      {location.pathname === "/" && <Home />}
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;
