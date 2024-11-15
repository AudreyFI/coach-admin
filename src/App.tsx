import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Members from "./pages/members";
import Subscriptions from "./pages/subscriptions";

function App() {
  return (
    <>
      <Header />
      <span className="absolute left-0 top-0 -z-10 aspect-square w-full max-w-xl -translate-x-1/2 translate-y-1/4 scale-[200%] overflow-clip md:translate-y-1/2"></span>
      <main>
        <Routes>
          <Route path="/" element={<Members />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
