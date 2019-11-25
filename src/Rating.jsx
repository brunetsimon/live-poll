import React, { Component } from 'react';
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import { withStyles } from '@material-ui/core/styles';


const styles = {
  ball: {
    width: "100px",
    height: "100px",
    background: "hotpink",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
}

const left = -100;
const right = 100;

function Lock(props) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ last, movement: [mx, my], direction: [dx, dy], memo = [x.getValue(), y.getValue()] }) => {
    set({ x: clamp(memo[0] + mx, left, right) })
    return memo
  })
  return <animated.div {...bind()} style={{ x, y }} className={props.className} />
}

class Rating extends Component {


  constructor(props) {
    super(props);

    this.state = {

    };

  }



  render() {

    const { classes } = this.props;



    return (
      <Lock className={classes.ball} />
    );
  }
};

export default withStyles(styles)(Rating);
