import ClientLayout from "../layout/ClientLayout/ClientLayout";
import CreateImagePage from "../pages/CreateImagePage/CreateImagePage";
import DetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";
import SearchImagePage from "../pages/SearchImagePage/SearchImagePage";
import UserInfoPage from "../pages/UserInfoPage/UserInfoPage";

export const clientRouter = [
    {
        url: "/",
        component: <ClientLayout Component={HomePage}/>
    },
    {
        url: "/image-detail/:id",
        component: <ClientLayout Component={DetailPage}/>
    },
    {
        url: "/user-info",
        component: <ClientLayout Component={UserInfoPage}/>
    },
    {
        url: "/image-search/:keyword",
        component: <ClientLayout Component={SearchImagePage}/>
    },
    {
        url: "/create-image",
        component: <ClientLayout Component={CreateImagePage}/>
    }
]