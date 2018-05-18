import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Barrier from "../entities/Barrier";
import LevelOneGround from "../entities/LevelOneGround";
import Mario from "../entities/Mario";
import QuestionBox from "../entities/QuestionBox";
import Pipe from "../entities/Pipe";
import Cloud from "../entities/Cloud";
import Brick from "../entities/Brick";
import Goomba from "../entities/Goomba";
import Hill from "../entities/Hill";
import BrickParticle from "../entities/BrickParticle";

const HEIGHT = 320;

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

const { width, height } = Dimensions.get("window");
const cx = width / 2;
const cy = height / 2;
const offsetY = (height - HEIGHT) / 2;
const platformHeight = 20;
const platformWidth = Math.min(width, 430);
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
world.gravity = { x: 0, y: 5 };

const FLOOR_Y = HEIGHT - 36;

export default {
  physics: { engine: engine, world: world },
  questionBox1: QuestionBox(world, { x: cx + 20, y: HEIGHT - 100 }),
  brick1: Brick(world, { x: cx + 52, y: HEIGHT - 100 }),
  questionBox2: QuestionBox(world, { x: cx + 84, y: HEIGHT - 100 }),
  ground1: LevelOneGround(world, [0, offsetY + HEIGHT], width * 2),
  pipe1: Pipe(world, { x: cx + 210, y: FLOOR_Y }),
  hill1: Hill(world, { x: 129, y: FLOOR_Y - 3 }),
  cloud1: Cloud(world, { x: 300, y: 60 }),
  ground2: LevelOneGround(world, [width * 2 + 96, offsetY + HEIGHT], width * 2),
  goomba1: Goomba(world, { x: 350, y: FLOOR_Y }),
  camera: { offsetX: 0 },
  barrier1: Barrier(world, { x: 5, y: cy }, height),
  mario: Mario(world, { x: 40, y: offsetY + HEIGHT - platformHeight / 2 - 20 })
};
