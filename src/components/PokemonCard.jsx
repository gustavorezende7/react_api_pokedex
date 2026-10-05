import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { artworkUrl } from "../services/api";

export default function PokemonCard({ id, name }) {
  return (
    <Card elevation={3}>
      <CardActionArea component={Link} to={`/item/${id}`}>
        <CardMedia component="img" image={artworkUrl(id)} alt={name} loading="lazy" sx={{ height: 160, objectFit: "contain", p: 2, bgcolor: "grey.100" }} />
        <CardContent>
          <Typography variant="caption" color="text.secondary">#{String(id).padStart(4, "0")}</Typography>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
