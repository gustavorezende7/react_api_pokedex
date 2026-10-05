import { Box, MenuItem, TextField } from "@mui/material";

export default function SearchFilters({ search, onSearch, type, types, onType }) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 3 }}>
      <TextField label="Buscar por nome" value={search} onChange={(e) => onSearch(e.target.value)} sx={{ flex: 2, minWidth: 220 }} />
      <TextField select label="Tipo" value={type} onChange={(e) => onType(e.target.value)} sx={{ flex: 1, minWidth: 160 }}>
        <MenuItem value="">Todos</MenuItem>
        {types.map((t) => (
          <MenuItem key={t} value={t} sx={{ textTransform: "capitalize" }}>{t}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
