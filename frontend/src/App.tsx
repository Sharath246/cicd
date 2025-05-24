import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./onboarding/login/login.tsx";
import Home from "./home/home.tsx";
import Register from "./onboarding/register/register.tsx";
import Landing from "./landing/landing.tsx";
import { Dashboard } from "./home/dashboard/dashboard.tsx";
import { Provider } from "react-redux";
import { AppStore } from "./store.ts";
import WorkSpace from "./workspace/workspace.tsx";

function App() {
  return (
    <Provider store={AppStore}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/home" element={<Dashboard />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
