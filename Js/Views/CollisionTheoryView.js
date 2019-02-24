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

import TextPushButton from "../../../Buttons/TextPushButton.js";

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

    this.screenView = new ScreenView( 
      this.sim.simWrapper,
      { userSelect: "none" }
      );

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

    // add the reset all button
    var resetRun = new TextPushButton({
      text: "Reset Run", 
      style: { 
        borderRadius: "7px",
        width: "120px",
        height: "7%",
        background: "#DC143C",
        boxShadow: "0 0 1px 0 rgb( 40, 40, 40 )",
        position: "absolute",
        left: "calc( 50% - 60px )",
        top: "45%",
        color: "#FFF"
      },

      hoverStyle: { 
        background: "#ab123a"
      },

      listener: function(){
        model.resetRun()
      },
      hoverListener: function() {
        resetRunAnimation.play()
      },
      mouseout: function(){
        resetRunAnimation.cancel()
      }
    }).node;
    // add the animations on the hover
    const resetRunAnimation = resetRun.newAnimation({
      animation: [
        {  transform: "scale( 1, 1 )" },
        {  transform: "scale( 1.1, 1.1 )" },
      ],
      timing: {
        fill: "forwards",
        duration: 200
      }
    });
    resetRunAnimation.cancel();


    var resetCart = new TextPushButton({
      text: "Reset Carts", 
      style: { 
        borderRadius: "7px",
        width: "10%",
        height: "6%",
        background: "#DC143C",
        boxShadow: "0 0 1px 0 rgb( 40, 40, 40 )",
        position: "absolute",
        color: "#FFF",
        left: "56%",
        bottom: "8%",
        minWidth: "120px"
      },
      textStyle: {
        fontSize: "1em"
      },

      hoverStyle: { 
        background: "#ab123a"
      },

      listener: function(){
        model.isPlaying.value = false;
        model.cart1.resetLocation()
        model.cart2.resetLocation();
      },
      hoverListener: function() {
        resetCartAnimation.play()
      },
      mouseout: function(){
        resetCartAnimation.cancel()
      }
    }).node;
    // add the animations on the hover
    const resetCartAnimation = resetCart.jiggle( 200 )
    resetCartAnimation.cancel();

    // in this rendering order
    this.simNode.appendChildren([
      this.background,
      this.cart1Panel,
      this.cart2Panel,
      this.controlPanel,
      this.cart1,
      this.cart2,
      this.playButton.node,
      this.pauseButton.node,
      resetRun,
      resetCart
    ])

    if ( !model.isPlaying.value ) this.simNode.removeChild( resetRun )
      
    model.alreadyCollided.setListener( function( newValue ){
      if ( newValue === true )
        self.simNode.addChild( resetRun )
      else {
        self.simNode.removeChild( resetRun )
      }
    } );

  }

}



