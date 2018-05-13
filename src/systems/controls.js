import Matter from "matter-js";

const direction = (touches, defaultDirection = "right") => {
  let move = touches.find(x => x.type === "move");

  if (move) {
    if (move.delta.locationX < -2) return "left";

    if (move.delta.locationX > 2) return "right";
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

const jumping = (mario, platforms, touches) => {
  let marioBody = mario.body;
  let jump = touches.find(x => x.type === "press");

  if (jump) {
    let collisions = Matter.Query.point(platforms.map(x => x.body), {
      x: marioBody.position.x,
      y: marioBody.position.y + 20
    });

    return collisions && collisions.length >= 1;
  }

  return false;
};

export default (entities, { touches }) => {
  let mario = entities.mario;
  let platforms = Object.keys(entities)
    .filter(key => entities[key].platform)
    .map(key => entities[key]);

  mario.direction = direction(touches, mario.direction);
  mario.moving = moving(touches, mario.moving);
  mario.jumping = jumping(mario, platforms, touches);

  if (mario.moving) {
    Matter.Body.applyForce(mario.body, mario.body.position, {
      x: mario.direction === "right" ? 2.5 : -2.5,
      y: 0
    });
    Matter.Body.setAngle(mario.body, 0);
  }

  if (mario.jumping) {
    Matter.Body.setVelocity(mario.body, {
      x: 0,
      y: -240
    });
    if (mario.moving) {
      Matter.Body.setAngularVelocity(
        mario.body,
        mario.direction === "right" ? 2.5 : -2.5
      );
    }
  }

  return entities;
};
