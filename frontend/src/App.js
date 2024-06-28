import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Loading from "./Pages/Loading";
import ScorePage from "./Pages/ScorePage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<HomePage />}/>

      <Route path="/loading">
        <Route path=":title" element={ <Loading />}/>
      </Route>

      <Route path="/homepage">
        <Route path=":errCode" element={ <HomePage />}/>
      </Route>

      <Route path="/review"  element={<ScorePage />}/>

    </Route>
  )
)
function App() {

  return (
      <RouterProvider router={router}/>
  );
}
export default App;
