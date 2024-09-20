import { useUserContext } from "../context/UserContext";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomSideBar } from "../components/CustomSideBar";
import { CustomFooter } from "../components/CustomFooter";
import { CustomMain } from "../components/CustomMain";
import { UsersMain } from "../components/UsersMain";

export const UsersPage = () => {
  const { buttons } = useUserContext();
  return (
    <div className="flex flex-col min-h-screen" oncharge>
      <CustomNavbar />
      <div className="flex flex-1">
        <CustomSideBar buttons={buttons} />
        <CustomMain content={<UsersMain />} />
      </div>
      <CustomFooter />
    </div>
  );
};
