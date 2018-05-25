/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Controls from "./src/systems/controls";
import Physics from "./src/systems/physics";
import Camera from "./src/systems/camera";
import Collisions from "./src/systems/collisions";
import CameraRenderer from "./src/renderers/Camera";
import LevelOne from "./src/levels/LevelOne";
import Enemies from "./src/systems/enemies";

import { Client } from "bugsnag-react-native";
const bugsnag = new Client();

export default class App extends Component {
  render() {
    return (
      <GameEngine
        style={styles.bg}
        systems={[Collisions, Controls, Enemies, Physics, Camera]}
        renderer={CameraRenderer}
        entities={LevelOne}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#6d8ffc"
  }
});
