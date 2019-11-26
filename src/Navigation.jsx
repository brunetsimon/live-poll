import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home"
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PollIcon from '@material-ui/icons/Poll';

const styles = {
  title: {
    flexGrow: 1,
  },
  list: {
    width: "250px"
  }
}


class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false,
    };
  }

  handleDrawer = open => () => {
    this.setState({ showDrawer: open })
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              VoteNow.se
            </Typography>
            <Button color="inherit" component={Link} to="/admin">Admin</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.showDrawer} onClose={this.handleDrawer(false)}>
          <div
            className={classes.list}
            role="presentation"
            onClick={this.handleDrawer(false)}
            onKeyDown={this.handleDrawer(false)}
          >

            <List>
              <ListItemLink primary="HomePage" to="/" icon={<HomeIcon />} />
              <ListItemLink primary="Vote" to="/client" icon={<HowToVoteIcon />} />
              <ListItemLink primary="Display result" to="/server" icon={<PollIcon />} />
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <Link to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


export default withStyles(styles)(Navigation);
