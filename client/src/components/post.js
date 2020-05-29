import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Bc1 from "../images/Bc1.jpg";

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

function Post() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [iduser, setIduser] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setIduser(localStorage.getItem("iduser"));
    async function getUsers() {

      const response = await axios.get(
        `http://localhost:7000/api/users/${iduser}`
      );
      setTasks(response.data);
    }
    getUsers();
  }, [tasks]);

  const addPost = () => {
    axios.put(
      `http://localhost:7000/api/users/newtask/${iduser}`, { text: text }
    );
  }

  return (
    <div style={{ backgroundImage: "url(" + Bc1 + ")",height:'600px' }}>
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
                <Link to="/listusers">
                    <Button variant="contained" color="primary" style={{}}>All posts</Button>
                </Link>
        </Toolbar>
      </AppBar>
      <h1>Posts</h1>
    <div style={{display:"flex"}}> 
      <div style={{display:"flex",flexDirection:"column"}}>
      <input style={{width:"500px", height:"300px", borderRadius:"20px", margin:"10px"}} onChange={(e) => setText(e.target.value)} type="text" placeholder="Enter Your Post" className="new-task" />
      <Button variant="contained" color="primary" style={{width:"100px", height:"30px", borderRadius:"5px", margin:"10px"}} onClick={addPost}>SHARE</Button>
      </div>
      <div style={{display:"flex",flexDirection:"column",marginLeft:'100px'}}> 
      {tasks.map((elt, index) => (
        <div key={index} >
          <p style={{backgroundColor:'white',borderRadius:'5px',width:'200px',height:'100px',margin:'50px',padding:'40px'}}>{elt.text}</p>
        </div>  
      ))} </div>  </div>

    </div>
  );
}

export default Post;