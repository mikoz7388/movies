import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  console.log("rendering App");

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;
