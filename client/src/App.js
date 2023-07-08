import React, { useEffect } from "react";
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import authenRouter from "./routers/authenRouter";
import { clientRouter } from "./routers/clientRouter";
function App() {
  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/image/layDanhSachHinhAnh").then((res) => {
  //     console.log(res);
  //   })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [])
  return (
    <BrowserRouter>
      <Routes>
        {authenRouter.map(({ url, component }) => {
          return <Route key={url} path={url} element={component} />
        })}
        {
          clientRouter.map(({url, component}) => {
            return <Route key={url} path={url} element={component}/>
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
