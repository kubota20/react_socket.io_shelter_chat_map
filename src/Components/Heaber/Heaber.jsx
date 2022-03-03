import { AppBar, Toolbar, Typography } from '@material-ui/core'

// styles
import { useStyles } from './styles'

const Heaber = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Shelter Map
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Heaber
