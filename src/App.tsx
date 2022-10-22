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
import { StorePage } from "./pages/store";

import { message } from "antd";

function App() {
  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.global);

  useEffect(() => {
    dispatch(setLoading(false));
    message.info('TESSTE!');
  }, []);

  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/bemvindo' element={<WelcomePage />} />
            <Route path='/loja' element={<StorePage />} />
        </Routes>
      </Router>

      { global.loading && <Loading /> }
    </>
  );
}

export default App;
