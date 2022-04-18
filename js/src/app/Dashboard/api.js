import ajax from '../../config/ajax'

const getListAllPokemonInfo = () => (
  ajax.get('/pokemoninfo').then( res => res.data || [])
)

const getListPokemonInfo = id => (
  ajax.get(`/pokemoninfo/${id}`).then( res => res.data || {})
)

export {
 getListPokemonInfo,
 getListAllPokemonInfo
}
