import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Typography } from '@mui/material'

import './Item.scss'
import { useNavigate, useParams } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { UserService } from '../../services/UserServices'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export const Item = () => {

  const { name } = useParams()
  const [image, setImage] = useState()
  const [pokemon, setPokemon] = useState()

  const [expanded, setExpanded] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    reloadPage()
  }, [])
  
  const reloadPage = async () => {
    setPokemon(await UserService.getPokemonFromName(name))
    setImage(await UserService.getPokemonImage(name))
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleReturn = () => {
    navigate(`/`)
  }
  
  return (
    <Grid
      container
      spacing={0}
      className="item"
    >
      <Grid
        item
        xs={12}
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                { name.split('')[0].toUpperCase() }
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={ pokemon?.name.toUpperCase() }
            subheader={ 'Orden: ' + pokemon?.order}
          />
          <CardMedia
            component="img"
            height="400"
            image={ image }
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h5">STATS:</Typography>

              {
                pokemon?.stats.map(stat => (
                  <Typography paragraph>
                    { stat.stat.name.toUpperCase() } : { stat.base_stat }
                  </Typography>
                ))
              }
              
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="h5">TYPES:</Typography>

              {
                pokemon?.types.map(stat => (
                  <Typography paragraph>
                    { stat.type.name.toUpperCase() }
                  </Typography>
                ))
              }
              
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Button
          variant="contained"
          size="large"
          className='item__submit'
          color='secondary'
          onClick={ (e) => handleReturn() }
        >
          volver al buscador
        </Button> 
      </Grid>
    </Grid>
  )
}
