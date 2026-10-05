import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 15000,
});

export const getIdFromUrl = (url) => Number(url.split("/").filter(Boolean).pop());

export const artworkUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export async function fetchAllPokemon() {
  const { data } = await api.get("/pokemon", { params: { limit: 1025 } });
  return data.results.map((p) => ({ name: p.name, id: getIdFromUrl(p.url) }));
}

export async function fetchTypes() {
  const { data } = await api.get("/type");
  return data.results
    .map((t) => t.name)
    .filter((n) => n !== "unknown" && n !== "stellar");
}

export async function fetchPokemonNamesByType(type) {
  const { data } = await api.get(`/type/${type}`);
  return data.pokemon.map((p) => p.pokemon.name);
}

export async function fetchPokemonDetails(id) {
  const { data } = await api.get(`/pokemon/${id}`);
  return data;
}
