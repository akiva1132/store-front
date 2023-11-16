import  { useEffect, useState } from "react";
import Typecategore from "../types/Typecategore";
import { URL } from "../config";


const useFetch = () => {
  const [dataProduct, setPataProduct] = useState<Typecategore | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `${URL}/products/top5/categories`
      );
      const dataj = await data.json();
      setPataProduct(dataj);
    };
    data();
  }, []);
  return [dataProduct];
};
export default useFetch;
