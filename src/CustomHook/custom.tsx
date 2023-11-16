import  { useEffect, useState } from "react";
import TypeProducts from "../types/TypeProducts";
import {URL} from "../config"
import Typecategore from "../types/Typecategore";
import TypeProductsSort from "../types/TypeProductsSort";
import { Params } from "react-router-dom";

export const useTop5Categories = () => {
  const [dataProduct, setDataProduct] = useState<Typecategore | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `${URL}/products/top5/categories`
      );
      const dataj = await data.json();
      setDataProduct(dataj);
    };
    data();
  }, []);
  return [dataProduct];
};



export const useTop5Products = () => {
  const [dataCard, setDataCard] = useState<TypeProducts | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(`${URL}/products/top5/products`);
      const dataj = await data.json();
      setDataCard(dataj);
    };
    data();
  }, []);
  return [dataCard];
}

export const useProduct = (params:Readonly<Params<string>>) => {
  const [dataCard, setDataCard] = useState<TypeProductsSort | null>(null);
  useEffect(() => {
    const data = async () => {
      const data = await fetch(
        `${URL}/products/product/${params.id}`
      );
      const dataj = await data.json();
      console.log("gilad")
      console.log(dataj);
      setDataCard(dataj.data);
    };
    data();
  }, []);
  
  return [dataCard];
}
