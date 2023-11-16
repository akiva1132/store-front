import RecipeReviewCard from "./ProductsCards";
import { useContext } from "react";
import { UserContext } from "../Context/CategoryContext";
import Box from "@mui/material/Box";
import TopCategory from "./Top5Products";
import TopProdact from "./Top5Categories";
import MapView from "./OpenLayers";

export default function HomePage() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { category } = context;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
          flexFlow: "wrap"
        }}
      >
        {category?.map((arr) => (
          <RecipeReviewCard
            id={arr.category_id}
            img={arr.img}
            name={arr.category_name}
          ></RecipeReviewCard>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          margin: "50px",
          justifyContent: "space-around",
          alignItems: "center",
          flexFlow: "wrap"
        }}
      >
        <TopProdact></TopProdact>
        <TopCategory></TopCategory>
      </Box>
      <MapView></MapView>
    </Box>
  );
}
