/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from "react";
import {
withStyles,
Paper,
Icon,
Typography,
Card,
CardActionArea,
CardMedia,
CardContent,
CardActions,
Button
} from "material-ui";
import ratingsConst from "./contants";

const styles = {
result: {
padding: "30px",
textAlign: "center"
},
icon: {
fontSize: "80px"
}
};

class Result extends Component {
render() {
const { classes } = this.props;
console.log(this.props.rating);
return (
<div>
<Card className={classes.card}>
<CardContent>
<Typography
className={classes.title}
color="textSecondary"
gutterBottom
>
Thank You For Your Vote !
</Typography>
<Typography variant="h5" component="h7">
<img src={ratingsConst[this.props.rating].img} />
</Typography>
</CardContent>
</Card>
</div>
);
}
}

export default withStyles(styles)(Result);

