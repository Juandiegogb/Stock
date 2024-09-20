import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { AdminPage } from "./pages/AdminPage";
import { Toaster, toast } from "sonner";
import { UserProvider } from "./context/UserContext";
import { UsersPage } from "./pages/UsersPage";
import { CreateElementPage } from "./pages/CreateElementPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors closeButton duration={700} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/createElement" element={<CreateElementPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
