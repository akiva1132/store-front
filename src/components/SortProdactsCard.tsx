import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TypeprodactsCard from "../types/TypeprodactsCard";

export default function CardsProdact(props: TypeprodactsCard) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, margin: "30px" }}>
      <CardMedia sx={{ height: 140 }} image={props.img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          price: {props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button onClick={() => navigate(`/Product/${props.id}`)} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
