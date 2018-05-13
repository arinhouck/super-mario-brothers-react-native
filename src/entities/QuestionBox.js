import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import QuestionBoxImage from "../assets/images/question-box.png";

export class QuestionBox extends PureComponent {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={QuestionBoxImage}
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

export default (world, pos, width = 32, height = 32) => {
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: true,
    friction: 1
  });
  Matter.World.add(world, [body]);
  return {
    platform: true,
    body: body,
    size: [width, height],
    renderer: <QuestionBox />
  };
};
