import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Link } from "react-router-dom";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './Chat.css';
import Bc3 from "../../images/Bc3.jpg"


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random/?food,healthy,breakfast)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


let socket;

const Chat = ({ location,props }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div style={{ backgroundImage: "url(" + Bc3 + ")" }}>
    <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div style={{display:"flex", justifyContent:"spacebetween"}}>
                    <Typography variant="h6" className={classes.title}>
                        Recipes And Stories
          </Typography>
                    <Typography variant="h6" className={classes.title} style={{marginLeft:"250px"}}>
                        "People who like to eat ... are always the best."
          </Typography>

          <Link to="/dashboard" style={{marginLeft:'85px'}}>
                    <Button variant="contained" color="primary" >Profile</Button>
                </Link>

          <Link to="/" style={{marginLeft:'15px'}}>
                    <Button variant="contained" color="primary" >Home</Button>
                </Link>
                   
               
                    </div>
                </Toolbar>
            </AppBar>

           </div>
    <div className="outerContainer" style={{ width: '100%', height:'610px',padding:'50px'}}>
      <div className="container" style={{ width: '65%', height:'100%',padding:'0px'}}>
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
    
    </div>
  );
}

export default Chat;
