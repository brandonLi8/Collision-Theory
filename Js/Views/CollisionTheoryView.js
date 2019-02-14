/**
 * Learning App
 * MainView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Functionality:
 *  - display the view for the sim
 */
'use strict';
// import modules
import ScreenView from "../../../Screen/ScreenView.js";
import Node from "../../../Screen/Node.js";
import Sim from "../../../SimCore/SimView.js"
// modules

export default class View {
  /**
   * set up the basic structure.
   */
  constructor(){ 
    this.sim = new Sim({
      backgroundSrc: "../CollisionTheory/Assets/flatiron.png",
      home: "../sims",
      title: "Collision Theory",
      author: "Brandon Li"
    });
    this.screen = new ScreenView( this.sim.screenView.rootNode )
    this.simNode = this.sim.sim;
  }
  /**
   * @param {object} options - the style of the control panel itself
   * @return {node} - the control panel
   */
  addControlPanel( options ){
    return this.sim.addControlPanel( options )
  }


}



