import { Switch } from "react-router-dom";
import DrawerHOC from "./HOC/Drawer/DrawerHOC";
import ModalHOC from "./HOC/Modal/ModalHOC";
import CreateProjectPage from "./pages/CreateProjectPage/CreateProjectPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ManagementProjectPage from "./pages/ManagementProjectPage/ManagementProjectPage";
import ManagementUserPage from "./pages/ManagementUserPage/ManagementUserPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashBoardTemplate from "./templates/DashboardTemplate/DashBoardTemplate";
import LoginTemplate from "./templates/LoginTemplate/LoginTemplate";

function App() {
  return (
    <>
      <DrawerHOC />
      <ModalHOC />
      <Switch>
        <LoginTemplate exact path="/" Component={LoginPage} />
        <LoginTemplate exact path="/register" Component={RegisterPage} />
        <DashBoardTemplate exact path="/dashboard/:id" Component={DashboardPage} />
        <DashBoardTemplate exact path="/dashboard" Component={DashboardPage} />
        <DashBoardTemplate
          exact
          path="/create-project"
          Component={CreateProjectPage}
        />
        <DashBoardTemplate
          exact
          path="/management-project"
          Component={ManagementProjectPage}
        />
        <DashBoardTemplate
          exact
          path="/management-user"
          Component={ManagementUserPage}
        />
        <LoginTemplate path="*" Component={LoginPage} />
      </Switch>
    </>
  );
}

export default App;
