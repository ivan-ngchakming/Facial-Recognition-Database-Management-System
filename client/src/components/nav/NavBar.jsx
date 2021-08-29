import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'initial',
  },
  appBar: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuBtn: {
    
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }, 
  drawerCloseBtn: {
    float: "right"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: -drawerWidth,
    width: "100%",
    height: "100vh",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));



export default function NavBar({children}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const handleNavClick = (page) => {
    handleDrawerClose()
    history.push(page.url)
  };

  const menuData = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Facial Recognition",
      url: "/facial-recognition",
    },
    {
      text: "Images",
      url: "/images",
    },
    {
      text: "Profiles",
      url: "/profiles",
    }
  ]

  return(
    <div className={classes.root}>
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {[classes.appBarShift]: open})}
      >
        <Toolbar>
          <IconButton 
            edge="start"
            className={clsx(classes.menuBtn, {[classes.hide]: open})}
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
            className={classes.drawerCloseBtn}
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          {menuData.map((page, index) => (
            <ListItem 
              button 
              onClick={() => {handleNavClick(page)}}
              key={page.url}
            >
              <ListItemText key={"nav-text-" & page.text} primary={page.text}/>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <main
        className={clsx(classes.content, {[classes.contentShift]: open})}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
      
    </div>
  )
}

