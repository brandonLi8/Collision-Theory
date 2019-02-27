/**
 * Learning App
 * stateButtons.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/23/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * View for the reset run button and the reset carts buttons
 *
 */

"use strict";

import Node from "../../../Screen/Node.js";
import TextPushButton from "../../../Buttons/TextPushButton.js";


export default class StateButtons {
  /**
   * Set up the buttons
   * @constructor
   * @return {array} - [ resetRunNode, resetCartNode ]
   */
  constructor( model ){
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
      text: "Return Carts", 
      style: { 
        borderRadius: "7px",
        width: "10%",
        height: "6%",
        background: "#DC143C",
        boxShadow: "0 0 1px 0 rgb( 40, 40, 40 )",
        position: "absolute",
        color: "#FFF",
        left: "80%",
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
        model.alreadyCollided.value = false;
        model.newRun = true;
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

    return [ resetRun, resetCart ];
  }
}