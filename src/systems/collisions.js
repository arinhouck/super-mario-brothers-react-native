import { collisionAbove } from "../utils/index";

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
      questionBox.hit = true;
    }
  }
};

export default (entities, { touches }) => {
  const mario = entities.mario;

  collideWithQuestionBox(mario, entities);

  return entities;
};
