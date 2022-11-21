import axios from 'axios'

export const UserService = {
  
  getPokemonFromColor: async (colors) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${ colors }`)
    return { id: data.id, name: data.name, pokemons: data.pokemon_species }
  },

  getPokemonFromName: async (name) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ name }`)
    return data
  },

  getPokemonImage: async (name) => {
    const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=3uGOQc7MoxdolLwVDlOG0sJJF4SzNfUD&q=${ name }&limit=1&offset=0&rating=g&lang=en`)
    return data.data[0].images.downsized_large.url
  }



  



}