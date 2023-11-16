import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Product from "./components/Product.tsx";
import Products from "./components/Products.tsx";
import Header from "./components/Header.tsx";
import HomePage from "./components/homePage.tsx";
import { CategoryData } from "./Context/CategoryContext.tsx";
import { CartProvider } from "./Context/ShopingCartContext.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/Products/:name",
        element: <Products />,
      },
      {
        path: "/Product/:id",
        element: <Product />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CategoryData>
      <CartProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CartProvider>
    </CategoryData>
  </React.StrictMode>
);
