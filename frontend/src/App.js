import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import Changepassword from "./components/user/Changepassword";
import Otp from "./components/user/Otp";
import Forgotpassword from "./components/user/Forgotpassword";
import Home from "./components/home/Home";
import SigninProvider from "./context/LoggedInStateContext/SigninProvider";
import RecordProvider from "./context/RecordContext/RecordProvider";

function App() {
  return (
    <div>
      <RecordProvider>
        <SigninProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/login" element={<User></User>}></Route>
              <Route path="/changepassword" element={<Changepassword></Changepassword>}></Route>
              <Route path="/otp" element={<Otp></Otp>}></Route>
              <Route path="/forgot" element={<Forgotpassword></Forgotpassword>}></Route>
              <Route path="/changepassword" element={<Changepassword></Changepassword>}></Route>
            </Routes>
          </Router>
        </SigninProvider>
      </RecordProvider>
    </div>
  );
}

export default App;
