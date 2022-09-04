import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";import DashboardLayout from "./Layouts/DashboardLayout";
import LoginSignupLayout from "./Layouts/LoginSignupLayout";
import Dashboard from "./Pages/Dashboard";
import EditProfile from "./Pages/EditProfile";
import Login from "./Pages/Login";
import Order from "./Pages/Order";
import Orders from "./Pages/Orders";
import Register from "./Pages/Register";
import Tags from "./Pages/Tags";

function AppRoutes() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard/" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<Order />} />
            <Route path="tags" element={<Tags />} />
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>

          <Route path="/login/" element={<LoginSignupLayout />}>
            <Route path="" element={<Login />} />
            <Route path=":id" element={<Register />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default AppRoutes;
