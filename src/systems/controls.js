import Matter from "matter-js";
import { collisionAbove, collisionBelow } from "../utils/index";

const direction = (touches, defaultDirection = "right") => {
  let move = touches.find(x => x.type === "move");

  if (move) {
    if (move.delta.locationX < -5) return "left";

    if (move.delta.locationX > 5) return "right";
  }

  return defaultDirection;
};

const moving = (touches, defaultMoving = false) => {
  let start = touches.find(x => x.type === "start");

  if (start) return true;

  let end = touches.find(x => x.type === "end");

  if (end) return false;

  return defaultMoving;
};

const jumping = (mario, staticEntities, touches) => {
  let marioBody = mario.body;
  let jump = touches.find(x => x.type === "press" || x.type === "move");

  const isPress = jump && jump.type === "press";
  const isMoveUp = jump && jump.type === "move" && jump.delta.locationY < -5;
  if (isPress || isMoveUp) {
    const onGround = collisionBelow(marioBody, staticEntities);
    return onGround;
  }

  return false;
};

export default (entities, { touches }) => {
  let mario = entities.mario;
  let staticEntities = Object.keys(entities)
    .filter(key => entities[key].isStatic)
    .map(key => entities[key].body);

  mario.direction = direction(touches, mario.direction);
  mario.moving = moving(touches, mario.moving);
  mario.jumping = jumping(mario, staticEntities, touches);

  if (mario.moving) {
    Matter.Body.applyForce(mario.body, mario.body.position, {
      x: mario.direction === "right" ? 7.2 : -7.2,
      y: 0
    });
    Matter.Body.setAngle(mario.body, 0);
  }

  if (mario.jumping) {
    Matter.Body.setVelocity(mario.body, {
      x: 0,
      y: collisionAbove(mario.body, staticEntities)
        ? mario.jumpVelocity / 2
        : mario.jumpVelocity
    });
  }

  return entities;
};
