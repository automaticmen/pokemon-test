import create from "zustand"
import apiCall from "../../api";


/**Recordar que la fuincion create lo que recibe es un callback. El callback recibe set y get. 
 * Recordar que regresa un objeto */
const usePokemonsStore = create((set,get)=>{
    return {
        getPokemons: async ()=>{
            /**Implementar la funcion */
            try {
                set({hasError:false,errorMessage:"",isLoading:true});
                const pokemonResult = await apiCall({
                    url:"https://pokeapi.co/api/v2/ability/?limit=20&offset=0"
                })
                set({pokemons:pokemonResult.results});
            } catch (error) {
                set({pokemons:[],hasError:true,errorMessage:"Algo ha pasado verifica la conexion"});
            }
            finally{
                set({isLoading:false});
            }
        },
        pokemons: [],
        getPokemonDetail: async (id)=>{
            /**Implementar la funcion */
            if (!id) return;
            try {
                set({hasError:false,errorMessage:"",isLoading:true});
                const pokemonDetail = await apiCall({url:`https://pokeapi.co/api/v2/pokemon/${id}`});
                set({pokemonDetail:pokemonDetail});
            } catch (error) {
                set({hasError:true,errorMessage:"El bosque cogio candela",pokemonDetail:{}});
            }
            finally{
                set({isLoading:false});
            }
        },
        pokemonDetail: {},
        isLoading: false,
        hasError:false,
        errorMessage:"",
    }
});

export default usePokemonsStore;

/**



        } catch (error) {
            setPokemonDetail({});
            setHasError(true);
            setErrorMessage("Algo ha sucedido");
        }
        finally{
            setIsloading(false);
        } */