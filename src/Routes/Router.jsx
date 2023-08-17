import {
    createBrowserRouter,
} from "react-router-dom"
import Main from "../Layout/Main";
import StepOne from "../Pages/Steps/StepOne";
import StepTwo from "../Pages/Steps/StepTwo";
import ResultPage from "../Pages/ResultPage/ResultPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <StepOne />
            },
            {
                path: '/step-two',
                element: <StepTwo />
            },
            {
                path: '/result',
                element: <ResultPage />
            },
        ]
    }

]);

export default router;