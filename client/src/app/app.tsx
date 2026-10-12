import { Outlet, Route, Routes } from "react-router";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>Home</h1>} />
        <Route path="*" element={<h1>Coming soon</h1>} />
      </Route>
    </Routes>
  );
}
