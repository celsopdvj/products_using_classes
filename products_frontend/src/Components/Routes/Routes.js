import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import NewProduct from "../NewProduct/NewProduct";
import Product from "../Product/Product";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Product }  path="/" exact />
           <Route component = { NewProduct }  path="/NewProduct" />
       </BrowserRouter>
   )
}

export default Routes;