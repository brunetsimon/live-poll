import React, { Component } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from 'material-ui';

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
