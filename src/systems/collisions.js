import { collisionAbove, add, remove, guid } from "../utils/index";
import Coin from "../entities/Coin";
import BrickParticle from "../entities/BrickParticle";
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

const buildParticle = (entities, brick, pair) => {
  const brickParticleId = `particle-${guid()}`;
  const particle = add(
    brickParticleId,
    BrickParticle(entities.physics.world, brick.entity.body.position, pair),
    entities
  );

  Matter.Body.setVelocity(particle.body, {
    x: particle.velocity[0],
    y: particle.velocity[1]
  });
};

const collideWithBrick = (mario, entities) => {
  let bricks = Object.keys(entities)
    .filter(key => key.includes("brick"))
    .map(key => {
      return { key: key, entity: entities[key] };
    });

  const collision =
    mario.jumping &&
    collisionAbove(mario.body, bricks.map(qb => qb.entity.body));
  if (collision) {
    const { x, y } = collision.bodyA.position;

    const brick = bricks.find(qb => {
      return qb.entity.body.position.x == x && qb.entity.body.position.y == y;
    });

    if (brick) {
      remove(brick.key, entities);
      const velocity = 30;

      const particleVelocities = [
        [velocity, -velocity * 2],
        [velocity, -velocity],
        [-velocity, -velocity * 2],
        [-velocity, -velocity]
      ];
      particleVelocities.forEach(pair => {
        buildParticle(entities, brick, pair);
      });
    }
  }
};
export default (entities, { touches }) => {
  const mario = entities.mario;

  collideWithQuestionBox(mario, entities);
  collideWithBrick(mario, entities);

  return entities;
};
