import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class AlertDelete extends Component {


  handleClose = () => {
    this.props.onClosePop(false);
  }

  handleClick = answer => () => {
    this.props.onClose(answer);
  }

  render() {
    

    return(
      <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={this.props.open}
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete this poll and all the votes connected to it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClick(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClick(true)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default AlertDelete;
