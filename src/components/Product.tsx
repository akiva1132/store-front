import { useParams } from "react-router-dom";
import ImgMediaCard from "./ProductCard";
import { useProduct } from "../CustomHook/custom";

export default function Product() {
  const params = useParams();
  const [dataCard] = useProduct(params)
  if (dataCard)
    return (
      <ImgMediaCard/>
    );
}
