export default (entities, { screen }) => {
  let mario = entities.mario;
  let camera = entities.camera;
  let targetX = screen.width * 0.5;

  if (mario.body.position.x > targetX) {
    let diff = targetX - mario.body.position.x - camera.offsetX;
    camera.offsetX += diff * 0.05;
  }

  return entities;
};
