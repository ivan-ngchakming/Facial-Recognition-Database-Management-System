import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {},
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuBtn: {
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  }, 
  drawerPaper: {
    width: drawerWidth,
  }
}));



export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return(
    <div>
      <AppBar className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
        <Toolbar>
          <IconButton 
            edge="start"
            className={classes.menuBtn}
            color="inherit"
            aria-label="open-drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          {['Home', 'Faces', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
    </div>
  )
}

