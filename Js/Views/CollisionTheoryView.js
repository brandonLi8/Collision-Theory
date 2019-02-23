/**
 * CollisionTheory
 * CollisionTheoryView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Functionality:
 *  - Display the view for the sim
 *
 */
'use strict';
// import modules
import ScreenView from "../../../Screen/ScreenView.js";
import Node from "../../../Screen/Node.js";
import Sim from "../../../SimCore/SimView.js"
import Slider from "../../../Slider/SliderNode.js";
// views
import CartNode from "./CartNode.js"
import BackgroundNode from "./BackgroundNode.js"
import CartControlPanel from "./CartControlPanel.js"
import ControlPanel from "./ControlPanel.js"
import PlayButtonNode from "./PlayButtonNode.js"


// modules

export default class View {
  /**
   * Set up the basic structure
   * @param SimOptions {object} - the sim that describes the simulation
   * @constructor
   *
   */
  constructor( simOptions, model ){
    // alias self for listeners
    var self = this;

    // create the basic view
    this.sim = new Sim( simOptions );

    this.screenView = new ScreenView( this.sim.simWrapper );

    // the node of just the sim ( not the footer )
    this.simNode = this.sim.sim;

    // add the background image
    this.background = new BackgroundNode();

    // the first panel
    this.cart1Panel = new CartControlPanel( model.cart1, model )

    // the second panel
    this.cart2Panel = new CartControlPanel( model.cart2, model );


    // the main control panel
    this.controlPanel = new ControlPanel( model );

    this.cart1 = new CartNode( model.cart1, model );
    this.cart2 = new CartNode( model.cart2, model );

    this.playButtonNode = new PlayButtonNode( model )
    this.playButton = this.playButtonNode[ 0 ];

    this.pauseButton = this.playButtonNode[ 1 ];


    // in this rendering order
    this.simNode.appendChildren([
      this.background,
      this.cart1Panel,
      this.cart2Panel,
      this.controlPanel,
      this.cart1,
      this.cart2,
      this.playButton.node,
      this.pauseButton.node
    ])

  }

}



