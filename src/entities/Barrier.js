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
  let width = 20;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: true,
    friction: 0
  });
  Matter.World.add(world, [body]);
  return {
    body,
    size: { width, height }
  };
};
