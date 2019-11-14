import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';


const styles = {
  back: {
    float: "left"
  },
  title: {
    marginTop: "20px",
    marginBottom: "10vh",
    fontSize: "1.7em"
  },
  clearfix: {
    content: "",
    clear: "both",
    display: "table",
  },
  container: {
    width: "100vw",
    maxWidth: "600px",
    padding: "10px",
    textAlign: "center",
    margin: "0 auto"
  },
}

class ListUsers extends Component {


  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
      isFetching: false,
      fetchError: false,
    };

  }

  listAllUsers() {
    this.setState({isFetching: true});
    let API_URL = "";
    if (process.env.NODE_ENV === 'production') {
      API_URL = "/api/users";
    } else {
      API_URL = "https://votenow.se/api/users";
    }

    console.log("in ListAllusers");
    
    if (this.props.user == null) {      
      throw new Error('Not authenticated. Make sure you\'re signed in!');
    } else {
      console.log(this.props.user);
      
      this.props.user.getIdToken().then((token) => {
        axios.get(API_URL, {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
          console.log(response);
          this.setState({users: response.data.users});
        }).catch((error) => {
          console.log(error);
          this.setState({fetchError: true});
        }).finally(() => {
          console.log("finally");
          this.setState({isLoading: false, isFetching: false});
        });
      });
    }
  }

  render() {


    if(this.props.user != null && this.state.isFetching === false && this.state.users.length < 1 && this.state.fetchError === false) {
      console.log("user not null");
      this.listAllUsers();
      
    }
    const { classes } = this.props;

    let listUsers = null;
    if(this.state.isLoading || this.state.users.length < 1) {

    } else {
      console.log(this.state.users);
      
      listUsers = this.state.users.map(user => (
        <ListItem key={user.uid} role={undefined}>
          <ListItemText primary={`${user.email}`} />
        </ListItem>
      ));
    }
    

    return (
      <div className={classes.container}>
        <IconButton className={classes.back} aria-label="Back" onClick={this.props.history.goBack}>
          <ArrowBackIcon />
        </IconButton>
        <div className={classes.clearfix}></div>
        <Typography className={classes.title} component="h1" variant="h4" gutterBottom>List of all users</Typography>
        <List>
          {this.state.isLoading ? (<HourglassEmptyIcon />) : listUsers}
        </List>
      </div >
    );
  }
};

export default withStyles(styles)(ListUsers);
