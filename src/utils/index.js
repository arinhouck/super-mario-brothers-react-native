import Matter from "matter-js";

const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const remove = (id, entities) => {
  if (entities[id].body)
    Matter.Composite.remove(entities.physics.world, entities[id].body);

  delete entities[id];
};
const add = (key, entity, entities) => {
  entities[key] = entity;
  return entity;
};

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

const collision = (body, entities, { x: offsetX, y: offsetY }, width = 1) => {
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
    width
  );
  return collisions && collisions.length >= 1 ? collisions[0] : false;
};

const collisionAbove = (body, entities, y = -70, width = 1) => {
  return collision(body, entities, { x: 0, y: y }, width);
};

const collisionLeft = (body, entities) => {
  return collision(body, entities, { x: -30, y: 0 });
};
const collisionRight = (body, entities) => {
  return collision(body, entities, { x: 30, y: 0 });
};

const collisionBelow = (body, entities) => {
  return collision(body, entities, { x: 0, y: 20 });
};

module.exports = {
  distance,
  remove,
  add,
  guid,
  collisionAbove,
  collisionBelow,
  collisionLeft,
  collisionRight
};
