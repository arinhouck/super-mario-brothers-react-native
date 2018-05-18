import Matter from "matter-js";

import {
  collisionLeft,
  collisionRight,
  collisionAbove,
  remove
} from "../utils/index";

const changeDirection = (enemy, staticBodies) => {
  if (collisionLeft(enemy.body, staticBodies)) {
    enemy.direction = "right";
  }
  if (collisionRight(enemy.body, staticBodies)) {
    enemy.direction = "left";
  }
};

const squash = (enemy, enemyKey, mario, entities) => {
  if (
    enemy.dead == false &&
    collisionAbove(enemy.body, [mario.body], -40, enemy.width + 10)
  ) {
    enemy.dead = true;
    setTimeout(() => {
      remove(enemyKey, entities);
    }, 700);
  }
};

const move = enemy => {
  if (enemy.dead == false) {
    Matter.Body.applyForce(enemy.body, enemy.body.position, {
      x: enemy.direction === "right" ? 4 : -4,
      y: 0
    });
  }
};

export default (entities, { touches }) => {
  let staticBodies = Object.keys(entities)
    .filter(key => entities[key].isStatic)
    .map(key => entities[key].body);

  let mario = entities.mario;

  Object.keys(entities)
    .filter(key => entities[key].enemy)
    .forEach(enemyKey => {
      let enemy = entities[enemyKey];

      squash(enemy, enemyKey, mario, entities);
      changeDirection(enemy, staticBodies);
      move(enemy);
    });

  return entities;
};
