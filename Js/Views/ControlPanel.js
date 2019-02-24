/**
 * Learning App
 * ControlPanel.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/23/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * The control panel on the right for the coef. of restitution and vectors
 *
 */

"use strict";

import Node from "../../../Screen/Node.js";
import TextPushButton from "../../../Buttons/TextPushButton.js";
import CheckButton from "../../../Buttons/CheckButton.js";

import Slider from "../../../Slider/SliderNode.js";

export default class ControlPanel {
  /**
   * make a control panel that toggles the velocity and mass of each cart
   * @constructor
   * @param {model} - the collision theory model
   * @return {node} - the control panel node
   */
  constructor( model ){

    let style = {
      width: "17%",
      maxWidth: "300px",
      minWidth: "250px",
      height: "35%",
      maxHeight: "400px",
      minHeight: "200px",
      borderRadius: "5%",
      position: "absolute",
      background: "#DDC",
      boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
      right: "50px",
      top: "20px",
      border: "3px solid orange"
    }
    
    // the control panel
    var controlPanel = new Node({
      style: style
    })

    // the restitution slider
    var restitution = new Slider({
      unit: "%",
      lowerBound: 0,
      upperBound: 100,
      startingValue: model.restitutionStarting * 100,
      backgroundStyle: {
        fontFamily: "courier",
        borderRadius: "8px", // slider background
        width: "100%",
        height: "40%", 
        background: "none",
        border: "none",
        boxShadow: "none",
      },
      round: 0,
      valueStyle: {
        border: "1px solid grey",
        fontSize: "15px",
        height: "9%",
        position: "absolute",
        margin: "0",
        width: "100px",
        top: "16%"
      },
      // title of the entire div
      title: "Collision Type",
      titleStyle: {
        fontSize: "20px",
        position: "absolute",
        top: "2%"
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "20px",
        fontWeight: 700,
        position: "absolute",
        left: "5px",
        top: "34%"
      },
      rightStyle: {
        fontSize: "20px",
        fontWeight: 700,
        position: "absolute",
        right: "65px",
        top: "34%",
        
      },
      leftText: "Inelastic", // labels the sides
      rightText: "Elastic",
      // the actual slider line
      sliderStyle: {
        width: "90%",
        height: "1px",
        border: "1px solid black",
        borderRadius : "10px",
        background : "#555",
        position: "absolute",
        top: "30%"
      },
      thumbStyle: {
        height: "25px",
        width: "13px",
        marginTop: "calc( -" + "25px" + " * 0.5"  + ")",
        zIndex: 10
      },
      listener: function(){
        // update the model restitution
        let value = restitution.value;
        value = value.substring( 0, value.length - 2 )
        model.restitution.value = Number.parseFloat( value ) / 100;
        model.newRun = true;
        model.alreadyCollided.value = false;

      }
    });
    // add a event listener so the model can reset the restitution slider
    model.restitution.setListener( function( newValue ) {
      restitution.setValue( Math.round( newValue * 100 ) )
    })


     // add the reset all button
    var resetAll = new TextPushButton({
      text: "Reset All", 
      style: { 
        borderRadius: "7px",
        width: "120px",
        height: "14%",
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
        model.resetAll()
      },
      hoverListener: function() {
        resetAllAnimation.play()
      },
      mouseout: function(){
        resetAllAnimation.cancel()
      }
    }).node;
    // add the animations on the hover
    const resetAllAnimation = resetAll.newAnimation({
      animation: [
        {  transform: "scale( 1, 1 )" },
        {  transform: "scale( 1.1, 1.1 )" },
      ],
      timing: {
        fill: "forwards",
        duration: 200
      }
    });
    resetAllAnimation.pause();

    // the velocity check box
    var velocityVector = new CheckButton({
      switch: model.velocityVectorOn.value,
      containerStyle: {
        position: "absolute",
        left: "10%",
        top: "65%",
      },
      label: "Velocity Vectors"
    });

    var momentumVector = new CheckButton({
      switch: model.momentumVectorOn.value,
      containerStyle: {
        position: "absolute",
        left: "10%",
        top: "85%",
      },
      label: "Momentum Vectors",
      listener: function() {
        let newValue = momentumVector.isSwitched.value;
        model.momentumVectorOn.value = newValue;
      }
    })
    // add listeners to reset when the model resets these values
    model.momentumVectorOn.setListener( function( newValue ){
      momentumVector.isSwitched.value = newValue
    });
    // add listeners to reset when the model resets these values
    model.velocityVectorOn.setListener( function( newValue ){
      velocityVector.isSwitched.value = newValue
    });



    controlPanel.appendChildren([
      restitution.node,
      resetAll,
      velocityVector.container,
      momentumVector.container,
    ]);

    return controlPanel;
  }
}