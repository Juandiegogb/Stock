import { useUserContext } from "../context/UserContext";
import { useAuthWatcher } from "../hooks/CustomHooks";
import { CustomNavbar } from "../components/CustomNavbar";
import { CustomSideBar } from "../components/CustomSideBar";
import { CustomFooter } from "../components/CustomFooter";

export const CreateElementPage = () => {
  const { buttons } = useUserContext();

  useAuthWatcher();

  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <div className="flex flex-1">
        <CustomSideBar buttons={buttons} />
        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4">Create element</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            blanditiis reprehenderit cumque explicabo iure est impedit?
            Explicabo accusamus voluptatibus doloremque ratione, dolore quos
            tempora minima incidunt laudantium eum. Nam, nisi!
          </p>
        </main>
      </div>
      <CustomFooter />
    </div>
  );
};
