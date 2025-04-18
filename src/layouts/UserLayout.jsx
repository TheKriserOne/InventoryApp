import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const UserLayout = () => {
    return (
        <>
            <Header/>
            <div className="pageWrapper">
                <div className="bg-white contentArea">
                    {/******** Middle Content ********/}
                    <div className="p-4">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserLayout;