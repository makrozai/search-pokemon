import React, { useState } from 'react'
import { UserService } from '../services/UserServices'
import { UserContext } from './UserContext'

export const UserProvider = ({ children }) => {

  const [pokemons, setPokemons] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchPokemons = async (colors) => {
    setIsLoading(true)
    try {
      const userData = await UserService.getPokemonFromColor(colors)

      setPokemons(userData)
      setIsLoading(false)
      return userData

    } catch (error) {
      setIsLoading(false)
      setPokemons(null)
      console.error(error)
    }
  }

  return (
    <UserContext.Provider
      value={
        {
          pokemons,
          isLoading,
          searchPokemons
        }
      }
    >
      { children }
    </UserContext.Provider>
  )
}
