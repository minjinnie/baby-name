import { Route, Routes } from "react-router";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route index element={<h1>Home</h1>} />
          <Route path="*" element={<h1>Coming soon</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
