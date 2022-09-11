import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";import DashboardLayout from "./Layouts/DashboardLayout";
import LoginSignupLayout from "./Layouts/LoginSignupLayout";
import Dashboard from "./Pages/Dashboard";
import EditProfile from "./Pages/EditProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Expenses from "./Pages/Expenses";
import Register from "./Pages/Register";
import Tags from "./Pages/Tags";
import NotFound from "./Pages/NotFound";

function AppRoutes() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/dashboard/" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="tags" element={<Tags />} />
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>

          <Route path="/login/" element={<LoginSignupLayout />}>
            <Route path="" element={<Login />} />
            <Route path=":id" element={<Register />} />
        </Route>
        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );

}

export default AppRoutes;
