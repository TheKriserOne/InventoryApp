import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const FullLayout = () => {
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
          <div className="bg-white contentArea">
              {/******** Middle Content ********/}
              <div className="p-4">
                  <Outlet />
              </div>
          </div>
      </div>
    </main>
  );
};

export default FullLayout;
