import React, { createContext, useState, ReactNode } from "react";
import { CartItem } from "../components/shoppingCart";
interface AuthContextProps {
  shopingCart:CartItem[] | null;
  setShopingCart: React.Dispatch<React.SetStateAction<CartItem[]| null>>;
}


export const ShopingCartContext = createContext<AuthContextProps | undefined>(undefined);
interface CartProviderProps {
  children: ReactNode;
}
const userString = localStorage.getItem("cart");
const products: CartItem[] | null = userString ? JSON.parse(userString) : null;

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [shopingCart, setShopingCart] = useState<CartItem[] | null>(products);

  return (
    <ShopingCartContext.Provider value={{ shopingCart, setShopingCart }}>
      {children}
    </ShopingCartContext.Provider>
  );
};

