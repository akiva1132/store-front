import React, { createContext, useState, useEffect } from "react";
import {URL} from "../config"

type category = {
  img: string;
  category_name: string;
  category_id: string;
};
interface UserContextProviderProps {
  children: React.ReactNode;
}
interface UserContextType {
  category: category[] | null;
  setCategory: React.Dispatch<React.SetStateAction<category[] | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function CategoryData(props: UserContextProviderProps) {
  const [category, setCategory] = useState<category[] | null>(null);
  useEffect(() => {
    const data = async () => {
      let data = await fetch(`${URL}/products/`);
      let jdata = await data.json();
      setCategory(jdata);
    };
    data();
  }, []);
  return (
    <UserContext.Provider value={{ category, setCategory }}>
      {props.children}
    </UserContext.Provider>
  );
}
