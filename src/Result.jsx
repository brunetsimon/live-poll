import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ratingsConst from "./contants";

const styles = {
  result: {
    padding: "30px",
    textAlign: "center"
  },
  icon: {
    fontSize: "80px"
  },
};

class Result extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props.rating);
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <img className={classes.media} src={ratingsConst[this.props.rating].img} alt="rating" />
          </CardContent>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Thank You For Your Vote !
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/client" size="small" color="primary">
              Select another poll
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Result);

