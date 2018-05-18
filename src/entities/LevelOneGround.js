import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import GroundImage from "../assets/images/level1-ground.png";

export class LevelOneGround extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={GroundImage}
        resizeMode={"repeat"}
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

export default (world, pos, width = 32) => {
  const height = 64;
  const isStatic = true;

  let body = Matter.Bodies.rectangle(pos[0], pos[1], width, height, {
    isStatic: isStatic,
    friction: 1
  });
  Matter.World.add(world, [body]);
  return {
    isStatic: isStatic,
    body: body,
    size: [width, height],
    renderer: <LevelOneGround />
  };
};
