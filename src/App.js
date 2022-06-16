import Rutas from "./routes"
import PokemonProvider from "./context/pokemons/Provider";

function App() {
  return <PokemonProvider>
    <Rutas />
  </PokemonProvider>;
}

export default App;