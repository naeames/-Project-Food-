import React from 'react'
import Axios from 'axios'
import {connect} from "react-redux"
import {listUsers} from "../../Actions/action"
import Button from '@material-ui/core/Button';
import { Link, withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Bc1 from "../../images/Bc1.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
function SharedPost(props) {
    const classes = useStyles();

React.useEffect(() => {
async function getUsers() {
const response = await Axios.get(" http://localhost:7000/api/users");
props.listUsers(response.data)
}
getUsers();
},)
return (
    <div style={{ backgroundImage: "url(" + Bc1 + ")",height:'800px' }}> 
<div>

<AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Recipes And Stories
          </Typography>
          <Typography variant="h6" className={classes.title}>
            "People who like to eat ... are always the best."
          </Typography>
          <Link to="/home">
            <Button variant="contained" color="primary">
              Chat</Button>
          </Link>
          <Link to="/">
                    <Button variant="contained" color="primary" style={{}}>Home</Button>
                </Link>
              
        </Toolbar>
      </AppBar>
</div>

    
<div style={{backgroundColor:'white',borderRadius:'5px',width:'200px',height:'100px',margin:'50px',padding:'40px'}}>
   {props.users.map (e => e.tasks.map(e=>e.text) )} 
</div>

</div>
)
}
const mapstateToProps = state =>({
users : state.listUsers
})
export default connect(mapstateToProps,{listUsers})(SharedPost)
