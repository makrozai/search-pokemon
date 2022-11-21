import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Button, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'

import './Items.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'

const style = {
  width: '100%',
  bgcolor: 'background.paper',
}

export const Items = () => {

  const [searchParams] = useSearchParams();
  const { pokemons, searchPokemons, isLoading } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    reloadPage()
  }, [])
  
  const reloadPage = async () => {
    await searchPokemons(searchParams.get("search"))
  }

  const handleSubmit = (name) => {
    navigate(`/items/${ name }`)
  }

  const handleReturn = () => {
    navigate(`/`)
  }
  
  return (
    <Grid
      container
      spacing={0}
      className="items"
    >
      <Grid
        item
        xs={12}
      >
        <div className='results'>
          {
            isLoading && (
              <Typography variant="h5" gutterBottom className='results__title'>
                cargando
              </Typography>  
            )
          }
          { pokemons && (
            <>
              <Typography variant="h5" gutterBottom className='results__title'>
                Pokemons de color: { pokemons?.name }
              </Typography>

              <Button
                variant="contained"
                size="large"
                className='results__submit'
                color='secondary'
                onClick={ (e) => handleReturn() }
              >
                volver al buscador
              </Button> 

              <List sx={style} >
                {
                  pokemons?.pokemons.map((pokemon, index) =>
                    <div key={ index }>
                      <ListItem button onClick={ () => handleSubmit(pokemon.name) } key={ index }>
                        <ListItemText primary={ pokemon.name } />
                      </ListItem>
                      <Divider />
                    </ div>
                  )
                }
              </List>
            </>
          )}
          {
            (!pokemons && !isLoading) && (
            <>
              <Typography variant="h5" gutterBottom className='results__title'>
                No se encontro ningun resultado, recuerda escribir el color en ingles
              </Typography>  
              <Button
                variant="contained"
                size="large"
                className='results__submit'
                color='secondary'
                onClick={ (e) => handleReturn() }
              >
                Regresar al buscador
              </Button>  
            </>
          ) 
          }
          
        </ div>
      </Grid>
    </Grid>
  )
}
