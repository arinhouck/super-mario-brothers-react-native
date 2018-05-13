import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";
import Matter from "matter-js";
import QuestionBoxImage from "../assets/images/question-box.png";
import QuestionBoxHitImage from "../assets/images/question-box-hit.png";

export class QuestionBox extends PureComponent {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const hit = this.props.hit;

    return (
      <Image
        source={hit ? QuestionBoxHitImage : QuestionBoxImage}
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
    renderer: <QuestionBox />
  };
};
