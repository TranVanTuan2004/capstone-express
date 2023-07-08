import CreateImagePage from "../pages/CreateImagePage/CreateImagePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export default [
    {
        url: "/signin",
        component: <SignInPage/>
    },
    {
        url: "/signup",
        component: <SignUpPage/>
    },
]