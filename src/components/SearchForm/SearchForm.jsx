import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, FormControl, FormGroup, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from '../../hooks/useForm'
import { UserContext } from '../../context/UserContext'

import './SearchForm.scss'

export const SearchForm = () => {
  
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const { isLoading } = useContext(UserContext)
  const navigate = useNavigate()

  const { colors, errors, onInputChange, validationForm } = useForm({
    colors: '',
  })
  
  const handleSubmit = async () => {
    if (!validationForm()) {
      navigate(`/items?search=${colors}`)
    }
  }

  return (
    <div className={ `search-form ${ matches ? '' : 'search-form--mobile' }` }>
      <Typography variant="h5" gutterBottom className='search-form__title'>
        Busca tus pokemones por color
      </Typography>

      <FormControl>
        <FormGroup className='search-form__group'>
          <TextField
            required
            name='colors'
            value={ colors }
            onChange={ onInputChange }
            placeholder="Introduce el color"
            type='text'
            error={ errors.colors }
          />
        </FormGroup>
        <div>
          {
            isLoading ? (
              <Button
                variant="contained"
                disabled
                size="large"
                className='search-form__submit'
              >
                <CircularProgress size={14} />
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                className='search-form__submit'
                color='secondary'
                onClick={ (e) => handleSubmit() }
              >
                COTÍZALO
              </Button>
            )
          }
        </div>
      </FormControl>
    </div>
  )
}