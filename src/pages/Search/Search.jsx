import React from 'react'
import { Grid } from '@mui/material'
import { SearchForm } from '../../components'

import './Search.scss'

export const Search = () => {

  return (
    <Grid
      container
      spacing={0}
      className="search"
    >
      <Grid
        item
        xs={12}
      >
        <SearchForm />
      </Grid>
    </Grid>
  )
}
