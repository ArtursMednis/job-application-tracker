import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import AccountForm from "../features/account/AccountForm";
import JobApplicationList from "../features/jobApplicationList/JobApplicationList";
import HomePage from "../features/home/HomePage";
import JobApplicationForm from "../features/jobApplicationForm/JobApplicationForm";
import RegisterForm from "../features/account/RegisterForm";
import LoginForm from "../features/account/LoginForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/account", element: <AccountForm /> },
      { path: "/applications", element: <JobApplicationList /> },
      { path: "/applications/:id", element: <JobApplicationForm /> },
      { path: "/applications/new", element: <JobApplicationForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/login", element: <LoginForm /> },
    ],
  },
]);
