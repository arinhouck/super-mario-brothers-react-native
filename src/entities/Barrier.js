import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Matter from "matter-js";

export class Renderer extends Component {
  render() {
    const { width, height } = this.props.size;
    const body = this.props.body;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
      <View
        style={[
          styles.barrier,
          this.props.size,
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
  barrier: {
    position: "absolute",
    backgroundColor: "pink"
  }
});

export default (world, pos, height) => {
  const width = 20;
  const isStatic = true;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: isStatic,
    friction: 0
  });
  Matter.World.add(world, [body]);
  return {
    isStatic: isStatic,
    body,
    size: { width, height }
  };
};
