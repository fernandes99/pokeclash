import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setLoading } from "./store/reducers/global";

// Components
import { Loading } from "./components/loading";

// Pages
import { WelcomePage } from "./pages/welcome/index";
import { HomePage } from "./pages/home";

function App() {
  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.global);

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/bemvindo' element={<WelcomePage />} />
        </Routes>
      </Router>

      { global.loading && <Loading></Loading> }
    </>
  );
}

export default App;
