import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import GoombaImage from "../assets/images/goomba.gif";
import DeadGoombaImage from "../assets/images/goomba-dead.png";

export class Goomba extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const dead = this.props.dead;

    return (
      <Image
        source={dead ? DeadGoombaImage : GoombaImage}
        style={[
          styles.entity,
          {
            left: x,
            top: y
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  entity: {
    position: "absolute"
  }
});

export default (world, pos, width = 32, height = 32) => {
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 1,
    friction: 1,
    frictionAir: 0.68
  });

  Matter.World.add(world, [body]);
  return {
    enemy: true,
    dead: false,
    body: body,
    direction: "right",
    size: [width, height],
    renderer: <Goomba />
  };
};
