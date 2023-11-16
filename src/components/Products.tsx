import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CardsProdact from "./SortProdactsCard";
import Box from "@mui/material/Box";
import SortLine from "./SortLine";
import Grid from "@mui/material/Grid";
import "./Products.css";
import TypeProducts from "../types/TypeProducts";
import TypeProductsSort from "../types/TypeProductsSort";
import {URL} from "../config"



export default function Products() {
  const params = useParams();
  const [dataCard, setDataCard] = useState<TypeProducts | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(3000);
  const [sortList, setSortList] = useState<TypeProductsSort[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL}/products/all/${params.name}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${errorText}`
          );
        }
        const dataJson = await response.json();
        setDataCard(dataJson);
        setSortList(dataJson.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(event.target.value));
    if (dataCard) {
      const sortArr = dataCard.data.filter(
        (item) => item.price <= Number(event.target.value)
      );
      setSortList(sortArr);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} className="sortLineContainer">
        <SortLine handle={handleChange} value={selectedValue} />
      </Grid>
      <Grid item xs={12} md={9} className="gridItem">
        <Box
          sx={{ display: "flex", flexFlow: "wrap" }}
          className="productsContainer"
        >
          {sortList?.map((arr) => (
            <CardsProdact
              key={arr.id}
              img={arr.images[0]}
              id={arr.id}
              title={arr.title}
              price={arr.price}
            ></CardsProdact>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
