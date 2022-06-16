import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PokemonContext from "../../context/pokemons";
import { useContext } from "react";
import PokeStats from "./components/PokeStats";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import usePokemonsStore from "../../zustand/stores/pokemons";
import shallow from "zustand/shallow";
 
export default function PokeDetail(){
    const {id} = useParams();
    //const {getPokemonDetail, pokemonDetail,isLoading, hasError, errorMessage} = useContext(PokemonContext);
    //const getPokemonDetail = usePokemonsStore(state=>state.getPokemonDetail);
    //const pokemonDetail = usePokemonsStore(state=>state.pokemonDetail);
    //const isLoading = usePokemonsStore(state=>state.isLoading);
    //const hasError = usePokemonsStore(state=>state.hasError);
    //const errorMessage = usePokemonsStore(state=>state.errorMessage);
    const {getPokemonDetail, pokemonDetail,isLoading, hasError, errorMessage} = usePokemonsStore(state=>({getPokemonDetail: state.getPokemonDetail, pokemonDetail: state.pokemonDetail,isLoading: state.isLoading, hasError: state.hasError, errorMessage: state.errorMessage}),shallow);
    /**
     * Cada vez que se cargue la pantalla o cada vez que cambie el if solicitar el detalle del pokemon
     */
    useEffect(()=>{getPokemonDetail(id).catch(null)},[]);
    if(isLoading) return (<Loading title="Cargando informacion del pokemon"/>);
    return(
        <div>
            {hasError ? <ErrorMessage message={errorMessage}/>:(
                <>
                    <h3 style={{marginTop:15,marginBottom:30}}>Informacion General</h3>
                    <p>{`Nombre: ${pokemonDetail?.name}`}</p>
                    <p>{`Peso: ${pokemonDetail?.weight}`}</p>
                    <p>{`Altura: ${pokemonDetail?.height}`}</p>
                    <div>
                        <h3 style={{marginTop:30,marginBottom:30}}>Habilidades</h3>
                        <PokeStats stats={pokemonDetail?.stats ?? []}/>
                    </div>
                </>
            )}
        </div>
    );
}