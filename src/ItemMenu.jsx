import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import { Grow, Paper, MenuList, ListItemIcon, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

class ItemMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };


  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleItemClick = action => () => {
    this.props.callback(action, this.props.pollId);
    this.handleMenuClose();
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {

    let open = Boolean(this.state.anchorEl);
    return (

      <div>

        <IconButton
          aria-label="more"
          aria-controls={this.props.pollId + "-menu"}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Popper
          anchorEl={this.state.anchorEl}
          open={open}
        >
          <ClickAwayListener onClickAway={this.handleMenuClose}>
            <Grow in={open}>
              <Paper>
                <MenuList>
                  <MenuItem onClick={this.handleItemClick("open")}>
                    <ListItemIcon>
                      {this.props.isOpen ? <LockIcon /> : <LockOpenIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      {this.props.isOpen ? "Close" : "Re-Open"}
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={this.handleItemClick("delete")}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>
                      Delete
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>

        </Popper>
      </div >

    );
  }
}


export default ItemMenu;
