import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button} from 'material-ui';

const Navigation = () =>
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Electromobility LivePoll
      </Typography>
      <Button component={Link} to="/client" color="inherit">Client</Button>
      <Button component={Link} to="/server" color="inherit">Server</Button>
      {/* <Button component={Link} to="/admin" color="inherit">Admin</Button> */}
    </Toolbar>
  </AppBar>

export default Navigation;