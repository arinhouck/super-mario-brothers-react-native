import { collisionAbove, add, remove, guid } from "../utils/index";
import Coin from "../entities/Coin";
import Matter from "matter-js";

const collideWithQuestionBox = (mario, entities) => {
  let questionBoxes = Object.keys(entities)
    .filter(key => key.includes("questionBox") && entities[key].hit == false)
    .map(key => entities[key]);

  const collision =
    mario.jumping &&
    collisionAbove(mario.body, questionBoxes.map(qb => qb.body));
  if (collision) {
    const { x, y } = collision.bodyA.position;

    const questionBox = questionBoxes.find(qb => {
      return qb.body.position.x == x && qb.body.position.y == y;
    });

    if (questionBox) {
      const coinId = `coin-${guid()}`;
      const coin = add(
        coinId,
        Coin(entities.physics.world, questionBox.body.position, true),
        entities
      );
      Matter.Body.setVelocity(coin.body, {
        x: 0,
        y: -200
      });
      setTimeout(() => {
        remove(coinId, entities);
      }, 1000);
      questionBox.hit = true;
    }
  }
};

export default (entities, { touches }) => {
  const mario = entities.mario;

  collideWithQuestionBox(mario, entities);

  return entities;
};
