import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./common/home/home.jsx";
import "./App.css";
import { AuthProvider } from "./common/context/AuthContext.jsx";
import { ProtectedRouter, ProtectedRouterCompany} from "./ProtectedRouter.jsx";
import { PerfilUsuario } from "./user/pages/PerfilUsuario/PerfilUsuario.jsx";
import { Start } from "./user/pages/Start/Start";
import About from "./user/pages/About/About";

import { PerfilIdUser } from "./user/pages/PerfilUsuario/PerfilIdUser.jsx";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/registerUser" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route element={<ProtectedRouter />}>
            <Route path="/profileUser" element={<PerfilUsuario />}></Route>
            <Route path="/start" element={<Start />}></Route>
            {/* <Route path="/Publicar" element={<Publicar/>}></Route> */}
            <Route path="/profile/:id" element={<PerfilIdUser/>}></Route>
          </Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
