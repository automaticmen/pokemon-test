import { useState } from "react";
import PokemonContext from ".";
import apiCall from "../../api";
export default function PokemonProvider({children}){
    const [pokemons,setPokemons]=useState([]);
    const [pokemonDetail, setPokemonDetail] = useState({});
    const [isLoading,setIsloading] = useState(false);
    const [hasError,setHasError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const getPokemons = async ()=>{
        try {
            setIsloading(true);
            setHasError(false);
            setErrorMessage("");
            const pokemonResult = await apiCall({
                url:"https://pokeapi.co/api/v2/ability/?limit=20&offset=20"
            })
            setPokemons(pokemonResult.results);
        } catch (error) {
            setPokemons([]);
            setHasError(true);
            setErrorMessage("Algo ha pasado");
        }
        finally{
            setIsloading(false);
        }
    }
    const getPokemonDetail = async (id)=>{
        if (!id) Promise.reject("Id es requerido");
        try {
            setIsloading(true);
            setHasError(false);
            setErrorMessage("");


            const pokemonDetail = await apiCall({url:`https://pokeapi.co/api/v2/pokemon/${id}`});
            setPokemonDetail(pokemonDetail);
        } catch (error) {
            setPokemonDetail({});
            setHasError(true);
            setErrorMessage("Algo ha sucedido");
        }
        finally{
            setIsloading(false);
        }
    };
    return (
        <PokemonContext.Provider value={{
            getPokemons,
            pokemons,
            getPokemonDetail,
            pokemonDetail,
            isLoading,
            hasError,
            errorMessage,
            }}>
            {children}
        </PokemonContext.Provider>
    );
}