import { useUserContext } from "../context/UserContext";
import { useAuthWatcher } from "../hooks/CustomHooks";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomSideBar } from "../components/CustomSideBar";
import { CustomFooter } from "../components/CustomFooter";
import { ElementsMain } from "../components/ElementsMain";

export const CreateElementPage = () => {
  const { buttons } = useUserContext();

  useAuthWatcher();

  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <div className="flex flex-1">
        <CustomSideBar buttons={buttons} />
        <main className="flex-1 bg-gray-100 p-6">
          <ElementsMain />
        </main>
      </div>
      <CustomFooter />
    </div>
  );
};
