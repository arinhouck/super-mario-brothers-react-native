import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import CoinImage from "../assets/images/coin.gif";
import CoinMovingImage from "../assets/images/coin-moving.gif";

export class Coin extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const moving = this.props.moving;

    return (
      <Image
        source={moving ? CoinMovingImage : CoinImage}
        style={[
          styles.platform,
          {
            left: x,
            top: y,
            width,
            height
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  platform: {
    position: "absolute"
  }
});

export default (world, pos, moving = false, width = 20, height = 28) => {
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 1,
    friction: 1,
    frictionAir: 0.59
  });
  Matter.World.add(world, [body]);
  return {
    body: body,
    moving: moving,
    size: [width, height],
    renderer: <Coin />
  };
};
