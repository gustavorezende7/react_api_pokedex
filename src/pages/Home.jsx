import { useEffect, useMemo, useState } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import SearchFilters from "../components/SearchFilters";
import { ErrorMessage, Loading } from "../components/Feedback";
import { fetchAllPokemon, fetchPokemonNamesByType, fetchTypes } from "../services/api";

const PER_PAGE = 12;

export default function Home() {
  const [all, setAll] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [typeNames, setTypeNames] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchAllPokemon(), fetchTypes()])
      .then(([list, t]) => { setAll(list); setTypes(t); })
      .catch(() => setError("Não foi possível carregar os Pokémon. Verifique sua conexão."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!type) { setTypeNames(null); return; }
    let cancelled = false;
    fetchPokemonNamesByType(type)
      .then((names) => { if (!cancelled) setTypeNames(new Set(names)); })
      .catch(() => { if (!cancelled) setError("Erro ao filtrar por tipo."); });
    return () => { cancelled = true; };
  }, [type]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return all.filter((p) => p.name.includes(term) && (!typeNames || typeNames.has(p.name)));
  }, [all, search, typeNames]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (v) => { setSearch(v); setPage(1); };
  const handleType = (v) => { setType(v); setPage(1); };

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={700}>Pokémon</Typography>
      <SearchFilters search={search} onSearch={handleSearch} type={type} types={types} onType={handleType} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

      {!loading && !error && (
        <>
          <Typography color="text.secondary" sx={{ mb: 2 }}>{filtered.length} resultado(s)</Typography>
          {visible.length === 0 ? (
            <Typography>Nenhum Pokémon encontrado.</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
              {visible.map((p) => <PokemonCard key={p.id} id={p.id} name={p.name} />)}
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" />
          </Box>
        </>
      )}
    </Container>
  );
}
