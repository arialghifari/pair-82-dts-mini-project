import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import DetailMovie from "./containers/DetailMovie";
import DetailSeries from "./containers/DetailSeries";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Page404 from "./containers/Page404";
import Search from "./containers/Search";

function App() {
  return (
    <div>
      <Header />
      <div className="mt-20"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute loginOnlyPage={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute loginOnlyPage={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <DetailMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/series/:id"
          element={
            <ProtectedRoute>
              <DetailSeries />
            </ProtectedRoute>
          }
        />
        <Route path="/search/:query" element={<Search />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
