import Header from "./widgets/Header";
import { BrowserRouter } from "react-router-dom";
import UserWrapper from "./widgets/home/UserWrapper";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <UserWrapper />
    </BrowserRouter>
  );
}

export default App;
