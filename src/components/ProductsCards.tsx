import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import TypeProductsCards from "../types/TypeProductsCards";
import { useNavigate } from "react-router-dom";

export default function ActionAreaCard(props: TypeProductsCards) {
  const navigate = useNavigate();
  return (
    <Box sx={{ margin: "50px", maxWidth: 345 }}>
      <Card sx={{ maxWidth: 100, borderRadius: 50 }}>
        <CardActionArea onClick={() => navigate(`/Products/${props.id}`)}>
          <CardMedia
            component="img"
            height="100"
            width="70"
            image={props.img}
            alt="green iguana"
          />
        </CardActionArea>
      </Card>
      <Typography gutterBottom variant="h5" component="div">
        {props.name}
      </Typography>
    </Box>
  );
}
