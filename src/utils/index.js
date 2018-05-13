import Matter from "matter-js";

const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const collision = (body, entities, { x: offsetX, y: offsetY }) => {
  let collisions = Matter.Query.ray(
    entities,
    {
      x: body.position.x,
      y: body.position.y
    },
    {
      x: body.position.x + offsetX,
      y: body.position.y + offsetY
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
