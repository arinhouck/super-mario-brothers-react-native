import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import PipeImage from "../assets/images/pipe.png";

export class Pipe extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={PipeImage}
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

export default (world, pos, height = 64) => {
  const width = 64;
  const isStatic = true;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: isStatic,
    friction: 1
  });
  Matter.World.add(world, [body]);
  return {
    isStatic: isStatic,
    body: body,
    size: [width, height],
    renderer: <Pipe />
  };
};
