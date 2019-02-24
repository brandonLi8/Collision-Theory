/**
 * Learning App
 * CartControlPanel.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/22/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * The control panels for the carts
 *
 */

"use strict";

import Node from "../../../Screen/Node.js";
import TextPushButton from "../../../Buttons/TextPushButton.js";
import Slider from "../../../Slider/SliderNode.js";

export default class CartControlPanel {
  /**
   * make a control panel that toggles the velocity and mass of each cart
   * @constructor
   * @param {cart} - the cart that this panel is representing
   * @param {model} - the collision theory model
   * @return {node} - the control panel node
   */
  constructor( cart, model ){
    var position;
    // get the position based on window size
    if ( cart.number === 1 )
      position = "2%";
    else {
      if ( window.innerWidth < 1200 ) 
        position = "calc( 4% + 200px )"
      else if ( window.innerWidth < 1500 ) 
        position = "calc( 4% + 250px )"
      else 
        position = "calc( 4% + 300px )"
    }

    let style = {
      top: "20px",
      border: "2px solid " + cart.color,
      width: "18%", // width
      maxWidth: "300px",
      minWidth: "200px",
      left: position,
      height: "27%",
      borderRadius: "5%",
      position: "absolute",
      background: "#DDC",
      boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around"
    }

    // the control panel
    var controlPanel = new Node({
      style: style
    })
    // the label to the panel
    var label = new TextPushButton({
      text: "Cart " + cart.number, 
      // @optional the styling ( overriding doesnt delete all of it )
      style: { 
        border: "none",
        display: "flex",
        background: "none",
        boxShadow: "none",
        margin: "0 auto",
      },
      hoverStyle: {
        background: "none",
        cursor: "default"
      },
      textStyle: { 
        fontSize: "19px",
        margin: "auto",
        textAlign: "center",
        fontFamily: "Courier",
        borderBottom: "2px solid " + cart.color,
        borderRadius: "0",
        padding: 0,
      }
    });
    // make it responsive by hiding when the screen height is too small
    if ( window.innerHeight < 655 ) label.node.setStyle({ display: "none" })

    // the mass slider
    var massSlider = new Slider({
      unit: model.massUnit,
      leftText: "" + model.massLowerBound,
      rightText: "" + model.massUpperBound,
      lowerBound: model.massLowerBound,
      upperBound: model.massUpperBound,
      startingValue: model.massStarting,
      backgroundStyle: {
        background: "none",
        border: "none",
        boxShadow: "none",
        fontFamily: "courier",
        margin: "0",
        width: "95%",
      },
      valueStyle: {
        fontSize: "13px",
        paddingLeft : "1px",
        paddingRight : "1px",
        height: "20px",
        marginLeft: "70%",
        width: "100px"
      },
      // title of the entire div
      title: "Mass",
      titleStyle: {
        fontSize: "20px",
        position: "absolute",
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "15px"
      },
      rightStyle: {
        fontSize: "15px"
      },
      // the actual slider line
      sliderStyle: {
        width: "90%",
        height: "1px",
        border: "1px solid black",
        borderRadius : "10px",
        background : "#555",
      },
      thumbStyle: {
        background: cart.color
      },
      // add a listener that changes the model mass
      listener: function(){
        model.isPlaying.value = false;
        // the slider value
        let value = massSlider.value;
        // get rid or the unit
        value = value.substring( 0, value.length - model.massUnit.length )
        cart.mass.value = Number.parseFloat( value );
        model.newRun = true
        model.alreadyCollided.value = false;

      }
    });

    // the velocity slider
    var velocitySlider = new Slider({
      unit: model.velocityUnit,
      leftText: "" + model.velocityLowerBound, // labels the sides
      rightText: "" + model.velocityUpperBound,
      lowerBound: model.velocityLowerBound,
      upperBound: model.velocityUpperBound,
      startingValue: model.velocityStarting,
      backgroundStyle: {
        background: "none",
        border: "none",
        boxShadow: "none",
        fontFamily: "courier",
        width: "95%",
      },
      valueStyle: {
        fontSize: "13px",
        right: "10px",
        position: "absolute",
        width: "40px",
        height: "20px",
        paddingLeft: "10px",
        whiteSpace: "nowrap"
      },
      // title of the entire div
      title: "Velocity",
      titleStyle: {
        fontSize: "17px",
        fontWeight: "700",
        position: "absolute",
        right: "70px",
      },
      valueAndTitleContainerStyle: {
        height: "25px"
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "15px"
      },
      rightStyle: {
        fontSize: "15px"
      },
      // the actual slider line
      sliderStyle: {
        width: "90%",
        height: "1px",
        border: "1px solid black",
        borderRadius : "10px",
        background : "#555",
      },
      thumbStyle: {
        background: cart.color,
      },
      // add a listener that changes the model velocity
      listener: function(){
        model.isPlaying.value = false;
        let value = velocitySlider.value;
        // get rid or the unit
        value = value.substring( 0, value.length - model.velocityUnit.length ) 
        if ( cart.number === 2 ) value *= -1;
        // for the right car, the velocity is negative
        cart.velocity.value = Number.parseFloat( value );
        model.newRun = true
        model.alreadyCollided.value = false;
      }
    } );

    // now listen to velocity changes and mirror them in the slider
    cart.velocity.setListener( function( newValue ){
      newValue = Math.round( newValue * Math.pow( 10, 2 ) ) 
                 / Math.pow( 10, 2 ) // round the new value
      velocitySlider.setValue( Math.abs( newValue ) )
    } );
    // do the same with mass changed
    cart.mass.setListener( function( newValue ){
      newValue = Math.round( newValue * Math.pow( 10, 2 ) ) 
                 / Math.pow( 10, 2 )
      massSlider.setValue( newValue )
    } );

    controlPanel.appendChildren([
      label.node,
      massSlider.node,
      velocitySlider.node,
    ]);

    return controlPanel;
  }
}