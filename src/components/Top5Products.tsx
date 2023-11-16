import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useTop5Products } from "../CustomHook/custom";

export default function TopCategory() {
  const navigate = useNavigate();
  const [dataCard] = useTop5Products()
  if (dataCard)
    return (
      <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
          <Typography gutterBottom variant="h4" component="div">
            top 5 products
          </Typography>
        </ImageListItem>
        {dataCard.data.map((item) => (
          <ImageListItem key={item.images[0]}>
            <img
              srcSet={`${item.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.images[0]}?w=248&fit=crop&auto=format`}
              alt={item.images[0]}
              loading="lazy"
            />
            <ImageListItemBar
              onClick={() => navigate(`/Product/${item.id}`)}
              title={item.title}
              subtitle={`price :${item.price}`}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.images[0]}`}
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
