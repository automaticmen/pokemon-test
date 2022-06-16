import { useContext, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import PokemonContext from "../../context/pokemons";
import PokemonList from "./components/PokemonList";
import usePokemonsStore from "../../zustand/stores/pokemons";
import shallow from "zustand/shallow";
export default function Home(){
    //const {getPokemons,pokemons, isLoading,hasError, errorMessage} = useContext(PokemonContext);//Esta variante es con Context API
    const {
        getPokemons,
        pokemons, 
        isLoading,
        hasError, 
        errorMessage
    } = usePokemonsStore(state=>({
        getPokemons: state.getPokemons,
        pokemons: state.pokemons, 
        isLoading: state.isLoading,
        hasError: state.hasError, 
        errorMessage: state.errorMessage
    }),shallow);

    useEffect(()=>{getPokemons().catch(null);},[]);
    if (isLoading) return (<Loading title="Cargando Resultados"/>);
    return(
        <div>            
            {hasError ? <ErrorMessage message={errorMessage}/> : <PokemonList pokemons={pokemons}></PokemonList>}
        </div>
        );
}