import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import BrickParticleImage from "../assets/images/brick-particle.png";
import { collisionCategories } from "../utils/constants";

export class BrickParticle extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={BrickParticleImage}
        style={[
          styles.platform,
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
  platform: {
    position: "absolute"
  }
});

export default (world, pos, velocity) => {
  const height = 16;
  const width = height;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 2,
    friction: 1,
    frictionAir: 0.31,
    collisionFilter: {
      category: collisionCategories.background,
      mask: collisionCategories.background
    }
  });
  Matter.World.add(world, [body]);
  return {
    body: body,
    velocity,
    size: [width, height],
    renderer: <BrickParticle />
  };
};
