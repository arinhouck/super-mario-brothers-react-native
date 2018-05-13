import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import MarioImage from "../assets/images/mario.png";
import MarioWalkingImage from "../assets/images/mario-walking.gif";
import MarioJumpingImage from "../assets/images/mario-jumping.gif";

export class Mario extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const angle = this.props.body.angle;
    const direction = this.props.direction;

    const velocity = this.props.body.velocity;
    const walking = Math.abs(velocity.x) > 0.01;
    const jumping = Math.abs(velocity.y) > 0.02;

    return (
      <Image
        source={
          jumping ? MarioJumpingImage : walking ? MarioWalkingImage : MarioImage
        }
        style={[
          styles.platform,
          {
            left: x,
            top: y,
            transform: [
              { rotateZ: angle + "rad" },
              { rotateY: (direction === "right" ? 180 : 0) + "deg" }
            ]
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  mario: {
    position: "absolute"
  }
});

export default (world, pos, width = 30, height = 40) => {
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 1.2,
    friction: 1,
    frictionAir: 0.68
  });

  Matter.World.add(world, [body]);
  return {
    body: body,
    size: [width, height],
    direction: "right",
    jumpVelocity: -300,
    moving: false,
    renderer: <Mario />
  };
};
