import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import BrickImage from "../assets/images/brick.png";

export class Brick extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={BrickImage}
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

export default (world, pos, width = 32, height = 32) => {
  const isStatic = true;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: isStatic,
    friction: 1
  });
  Matter.World.add(world, [body]);
  return {
    isStatic: isStatic,
    body: body,
    hit: false,
    size: [width, height],
    renderer: <Brick />
  };
};
