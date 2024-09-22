import { useUserContext } from "../context/UserContext";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomSideBar } from "../components/CustomSideBar";
import { CustomFooter } from "../components/CustomFooter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const { buttons, user } = useUserContext();
  const navigate = useNavigate();

  return user && buttons ? (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <div className="flex flex-1">
        <CustomSideBar buttons={buttons} />
        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4">Main Content</h2>
          <p>
            This is the main content area. It will take up the rest of the
            space.
          </p>
        </main>
      </div>
      <CustomFooter />
    </div>
  ) : (
    <></>
  );
};
