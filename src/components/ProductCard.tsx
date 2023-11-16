import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ShopingCartContext } from "../Context/ShopingCartContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartItem } from "./shoppingCart";
import {URL} from "../config"

type Product = CartItem;



export default function ImgMediaCard() {
  const authContext = useContext(ShopingCartContext);
  const cartItems = authContext?.shopingCart;
  const setCartItems = authContext?.setShopingCart;

  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const handleAddToCart = () => {
    if (setCartItems && product) {
      const existingProduct = cartItems?.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        setCartItems((prevCartItems) =>
        prevCartItems?.map((item) =>
          item.id === existingProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ) || []
      );
      } else {
        setCartItems((prevCartItems) => [
          ...(prevCartItems || []),
          product,
        ]);
      }
    }
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect  
    };

    fetch(`${URL}/products/product/${id}`, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! Status: ${res.status}, Error: ${errorText}`
          );
        }
        return res.json();
      })
      .then((result) => {
        result.data.quantity = 1
        setProduct(result.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: 900, marginTop: "50px", marginLeft: "200px" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="400"
          image={product?.images[0]}
        />
        {product && (
          <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" component="div">
            praice: {product.price}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        )}
        <CardActions>
          <Button onClick={handleAddToCart} size="small">
            add to shopping cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
