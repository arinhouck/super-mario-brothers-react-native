import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import HillImage from "../assets/images/hill.png";
import { collisionCategories } from "../utils/constants";

export class Hill extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={HillImage}
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

export default (world, pos, width = 160) => {
  const height = 70;
  const isStatic = true;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: isStatic,
    friction: 1,
    collisionFilter: {
      category: collisionCategories.background,
      mask: collisionCategories.background
    }
  });
  Matter.World.add(world, [body]);
  return {
    body: body,
    size: [width, height],
    renderer: <Hill />
  };
};
