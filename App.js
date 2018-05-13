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
import LevelOne from "./src/levels/LevelOne";
import Camera from "./src/systems/camera";
import CameraRenderer from "./src/renderers/Camera";

export default class App extends Component {
  render() {
    return (
      <GameEngine
        style={styles.bg}
        systems={[Controls, Physics, Camera]}
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
