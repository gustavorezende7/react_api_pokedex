import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Chip, Container, LinearProgress, Paper, Typography } from "@mui/material";
import { ErrorMessage, Loading } from "../components/Feedback";
import { artworkUrl, fetchPokemonDetails } from "../services/api";

export default function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Refaz a requisição sempre que o id da rota mudar
  useEffect(() => {
    setLoading(true);
    setError("");
    fetchPokemonDetails(id)
      .then(setPokemon)
      .catch(() => setError("Pokémon não encontrado ou falha na API."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Container><ErrorMessage message={error} /><Button component={Link} to="/">Voltar</Button></Container>;

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>Voltar para a lista</Button>
      <Paper sx={{ p: 3, display: "flex", gap: 4, flexWrap: "wrap" }}>
        <Box component="img" src={artworkUrl(pokemon.id)} alt={pokemon.name} sx={{ width: 260, maxWidth: "100%", mx: "auto" }} />
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography variant="h4" fontWeight={700} sx={{ textTransform: "capitalize" }}>{pokemon.name}</Typography>
          <Box sx={{ my: 1, display: "flex", gap: 1 }}>
            {pokemon.types.map((t) => <Chip key={t.type.name} label={t.type.name} color="secondary" sx={{ textTransform: "capitalize" }} />)}
          </Box>
          <Typography>Altura: {pokemon.height / 10} m | Peso: {pokemon.weight / 10} kg</Typography>
          <Typography sx={{ textTransform: "capitalize", mb: 2 }}>
            Habilidades: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </Typography>
          {pokemon.stats.map((s) => (
            <Box key={s.stat.name} sx={{ mb: 1 }}>
              <Typography variant="body2">{s.stat.name}: {s.base_stat}</Typography>
              <LinearProgress variant="determinate" value={Math.min(100, (s.base_stat / 255) * 100)} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
