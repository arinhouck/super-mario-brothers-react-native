import Matter from "matter-js";

const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const collision = (body, entities, value = { x: 0, y: 0 }) => {
  let collisions = Matter.Query.ray(
    entities,
    {
      x: body.position.x,
      y: body.position.y
    },
    {
      x: body.position.x + value.x,
      y: body.position.y + value.y
    },
    1
  );
  return collisions && collisions.length >= 1 ? collisions[0] : false;
};

const collisionAbove = (body, entities) => {
  return collision(body, entities, { x: 0, y: -70 });
};

const collisionBelow = (body, entities) => {
  return collision(body, entities, { x: 0, y: 20 });
};

module.exports = {
  distance,
  collisionAbove,
  collisionBelow
};
