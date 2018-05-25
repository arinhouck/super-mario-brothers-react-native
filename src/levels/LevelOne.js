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
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
world.gravity = { x: 0, y: 5 };

const FLOOR_Y = HEIGHT - 36;
const FLOOR_Y2 = HEIGHT - 100;
const FLOOR_Y3 = HEIGHT - 200;

export default {
  physics: { engine: engine, world: world },
  hill1: Hill(world, { x: 129, y: FLOOR_Y - 3 }),
  ground1: LevelOneGround(world, [2048 / 2, offsetY + HEIGHT], 2048),
  ground2: LevelOneGround(world, [2048 + 256 / 2 + 96, offsetY + HEIGHT], 256),
  ground3: LevelOneGround(
    world,
    [2048 + 256 + 96 + 2048 / 2 + 96, offsetY + HEIGHT],
    2048
  ),
  questionBox1: QuestionBox(world, { x: 512, y: FLOOR_Y2 }),
  brick1: Brick(world, { x: 512 + 96, y: FLOOR_Y2 }),
  questionBox2: QuestionBox(world, { x: 512 + 96 + 32, y: FLOOR_Y2 }),
  brick2: Brick(world, { x: 512 + 96 + 32 + 32, y: FLOOR_Y2 }),
  questionBox3: QuestionBox(world, { x: 512 + 96 + 32 + 32 + 32, y: FLOOR_Y2 }),
  brick3: Brick(world, { x: 512 + 96 + 32 + 32 + 32 + 32, y: FLOOR_Y2 }),
  questionBox4: QuestionBox(world, { x: 512 + 96 + 32 + 32, y: FLOOR_Y3 }),
  pipe1: Pipe(world, { x: 650 + 270 + 32 / 2, y: FLOOR_Y }),
  pipe2: Pipe(world, { x: 650 + 270 + 270 + 32 + 32 / 2, y: FLOOR_Y }),
  pipe3: Pipe(world, { x: 650 + 270 + 520 + 32 + 32 / 2, y: FLOOR_Y }),
  hill2: Hill(world, { x: 650 + 270 + 520 + 96 + 160 / 2, y: FLOOR_Y - 3 }),
  pipe4: Pipe(world, { x: 650 + 270 + 810 + 96, y: FLOOR_Y }),
  cloud1: Cloud(world, { x: 300, y: 60 }),
  goomba1: Goomba(world, { x: 704 + 192 + 96, y: FLOOR_Y }),
  goomba2: Goomba(world, { x: 704 + 192 + 96 + 270, y: FLOOR_Y }),
  camera: { offsetX: 0 },
  barrier1: Barrier(world, { x: 5, y: cy }, height),
  mario: Mario(world, { x: 40, y: FLOOR_Y })
};
