import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useTop5Categories } from "../CustomHook/custom";

export default function TopProdact() {
  const navigate = useNavigate();
  const [dataProduct] =useTop5Categories()
 
  if (dataProduct)
    return (
      <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
          <Typography gutterBottom variant="h4" component="div">
            top 5 categories
          </Typography>
        </ImageListItem>
        {dataProduct.data.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={item.img}
              src={item.img}
              alt={item.img}
              loading="lazy"
            />
            <ImageListItemBar
              onClick={() => navigate(`/Products/${item.category_id}`)}
              title={item.category_name}
              subtitle=""
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.img}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
}
