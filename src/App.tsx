import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NewUserPage from "./pages/NewUserPage";
import EditUserPage from "./pages/EditUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-user" element={<NewUserPage />} />
          <Route path="/users/:id/edit" element={<EditUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
