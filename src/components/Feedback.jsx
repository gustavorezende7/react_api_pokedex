import { Alert, Box, Button, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress aria-label="Carregando" />
    </Box>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <Alert severity="error" sx={{ my: 3 }} action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Tentar de novo</Button>}>
      {message}
    </Alert>
  );
}
