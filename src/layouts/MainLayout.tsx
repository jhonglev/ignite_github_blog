import cover from "@/assets/cover.png";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#071422]">
      <div className="w-full">
        <img src={cover} alt="" />
        <div className="flex justify-center">
          <div className="w-full mx-72 -mt-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
