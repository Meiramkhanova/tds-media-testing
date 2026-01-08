import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NewUserPage from "./pages/NewUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-user" element={<NewUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
