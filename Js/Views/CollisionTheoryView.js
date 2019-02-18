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
// modules

export default class View {
  /**
   * Set up the basic structure
   * @param SimOptions {object} - the sim that describes the simulation
   * @constructor
   *
   */
  constructor( simOptions, model ){ 
    // create the basic view
    this.sim = new Sim( simOptions );

    this.screenView = new ScreenView( this.sim.simWrapper );

    // the node of just the sim ( not the footer )
    this.simNode = this.sim.sim;

    // This get ugly: construct the basic view for the collisionTheory sim

    // the panel for the first cart
    this.cart1Panel = this.addControlPanel({
      left: "50px",
      top: "20px",
      border: "2px solid " + model.cart1Color
    });
    // the panel for the second car
    this.cart2Panel = this.addControlPanel({
      left: 50 * 2 + 250 + "px",
      top: "20px",
      border: "2px solid " + model.cart2Color
    });

    // the main control panel
    this.controlPanel = this.addControlPanel({
      right: "50px",
      height: "300px",
      top: "20px",
      border: "3px solid orange"
    });

    // the coefficient restitution
    this.restitution = this.addSlider( this.controlPanel, {
      unit: "%",
      lowerBound: 0,
      upperBound: 100,
      startingValue: 0,
      backgroundStyle: {
        fontFamily: "courier",
        borderRadius: "8px", // slider background
        width: "250px",
        height: "100px", 
        background: "none",
        border: "none",
        boxShadow: "none" 
      },
      round: 0,
      valueStyle: {
        border: "1px solid grey",
        fontSize: "16px",
        height: "23px",
        position: "absolute",
        margin: "0",
        width: "100px",
        top: "50px"
      },
      // title of the entire div
      title: "Collision Type",
      titleStyle: {
        fontSize: "20px",
        position: "absolute",
        top: "15px"
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "20px",
        fontWeight: 700,
        position: "absolute",
        left: "5px",
        top: "90px"
      },
      rightStyle: {
        fontSize: "20px",
        fontWeight: 700,
        position: "absolute",
        right: "65px",
        top: "90px"
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
        top: "90px"
      },
      thumbStyle: {
        height: "15px",
        marginTop: "calc( -" + "15px" + " * 0.5"  + ")",
      },
    } );

    // now add the pause and the play buttons
    this.pauseButton = this.addImageButton( this.simNode, {
      style: {
        position: "absolute",
        left: "calc( 50% - 37.5px )",
        bottom: "calc( 90px - 37.5px )",
        boxShadow:  "0 0 3px 0 rgb( 40, 40, 40 )",
        borderRadius: "50%",
        padding: 0,
        width: "75px"
      },
      src: "./assets/pauseButton.png",
      hover: "./assets/pauseButtonHover.png", 
      scope: this,
      hoverListener: function( _ ){
        pauseButtonAnimation.play()
      },
      mouseout: function( _ ){
        pauseButtonAnimation.cancel()
      },
      listener: function( scope ){ scope.pauseButtonClick() }
    } );
    this.playButton = this.addImageButton( this.simNode, {
      style: {
        position: "absolute",
        left: "calc( 50% - 45px )",
        bottom: "calc( 90px - 45px )",
        boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
        borderRadius: "50%",
        width: "90px"
      },
      src: "./assets/playButton.png",
      hover: "./assets/playButtonHover.png", 
      scope: this,
      hoverListener: function( _ ){
        playButtonAnimation.play()
      },
      mouseout: function( _ ){
        playButtonAnimation.cancel()
      },
      listener: function( scope ){ scope.playButtonClick() }
    } );
    // add the animations on the hover
    const playButtonAnimation = this.playButton.jiggle( 200 );
    const pauseButtonAnimation = this.pauseButton.jiggle( 200 );
    playButtonAnimation.pause();
    pauseButtonAnimation.pause();


    // set the default button
    // since it is paused, show the play button
    if ( !model.play && model.pause ) 
      this.pauseButton.setStyle({ display: "none" });

    // add the sliders to each panel

    // labels
    this.addTextButton( this.cart1Panel, {
      text: "Cart 1", 
      // @optional the styling ( overriding doesnt delete all of it )
      style: { 
        border: "none",
        display: "flex",
        background: "none",
        boxShadow: "none",
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
        borderBottom: "2px solid " + model.cart1Color,
        borderRadius: "0",
        padding: 0,
      }
    } );
    this.addTextButton( this.cart2Panel, {
      text: "Cart 2", 
      // @optional the styling ( overriding doesnt delete all of it )
      style: { 
        border: "none",
        display: "flex",
        background: "none",
        boxShadow: "none",
        padding: 0,
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
        padding: 0,
        borderBottom: "2px solid " + model.cart2Color,
        borderRadius: "0",
      }
    } );


    // mass sliders
    let cart1Mass = this.addSlider( this.cart1Panel, {
      unit: model.massUnit,
      leftText: "" + model.massLowerBound,
      rightText: "" + model.massUpperBound,
      lowerBound: model.massLowerBound,
      upperBound: model.massUpperBound,
      startingValue: "1",
      backgroundStyle: {
        background: "none",
        border: "none",
        boxShadow: "none",
        fontFamily: "courier",
        width: "200px",
        marginTop: "-5px"
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
        fontSize: "10px"
      },
      rightStyle: {
        fontSize: "10px"
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
        background: model.cart1Color
      }
    } );
    let cart2Mass = this.addSlider( this.cart2Panel, {
      unit: model.massUnit,
      leftText: "" + model.massLowerBound,
      rightText: "" + model.massUpperBound,
      lowerBound: model.massLowerBound,
      upperBound: model.massUpperBound,
      startingValue: "1",
      backgroundStyle: {
        background: "none",
        border: "none",
        boxShadow: "none",
        fontFamily: "courier",
        width: "200px",
        marginTop: "-5px"
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
        fontSize: "10px"
      },
      rightStyle: {
        fontSize: "10px"
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
        background: model.cart2Color
      }
    } );
 
    // velocity sliders
    let cart1Velocity = this.addSlider( this.cart1Panel, {
      unit: model.velocityUnit,
      leftText: "" + model.velocityLowerBound, // labels the sides
      rightText: "" + model.velocityUpperBound,
      lowerBound: model.velocityLowerBound,
      upperBound: model.velocityUpperBound,
      startingValue: "5",
      backgroundStyle: {
        background: "none",
        border: "none",
        boxShadow: "none",
        fontFamily: "courier",
        width: "200px",
        marginTop: "20px"
      },
      valueStyle: {
        fontSize: "13px",
        paddingLeft : "0",
        paddingRight : "5px",
        marginRight: "-10px",
        width: "200px",
        height: "20px",
        marginLeft: "70%"
      },
      // title of the entire div
      title: "Starting Velocity",
      titleStyle: {
        fontSize: "14px",
        fontWeight: "700",
        position: "absolute",
        left: "20px"
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "10px"
      },
      rightStyle: {
        fontSize: "10px"
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
        background: model.cart1Color,
      }
    } );

    // velocity sliders
    let cart2Velocity = this.addSlider( this.cart2Panel, {
      unit: model.velocityUnit,
      leftText: "" + model.velocityLowerBound, // labels the sides
      rightText: "" + model.velocityUpperBound,
      lowerBound: model.velocityLowerBound,
      upperBound: model.velocityUpperBound,
      startingValue: "5",
      backgroundStyle: {
        background: "none",
        border: "none",
        boxShadow: "none",
        fontFamily: "courier",
        width: "200px",
        marginTop: "20px"
      },
      valueStyle: {
        fontSize: "13px",
        paddingLeft : "0",
        paddingRight : "5px",
        marginRight: "-10px",
        width: "200px",
        height: "20px",
        marginLeft: "70%"
      },
      // title of the entire div
      title: "Starting Velocity",
      titleStyle: {
        fontSize: "14px",
        fontWeight: "700",
        position: "absolute",
        left: "20px"
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "10px"
      },
      rightStyle: {
        fontSize: "10px"
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
        background: model.cart2Color,
      }
    } );

    // now add the carts
    this.cart1 = this.addCart({
      type: "img",
      src: "./assets/" + model.cart1Color + "Car.png",
      style: {
        ...model.cart1.location,
        position: "absolute",
        cursor: "pointer",
      },
      draggable: true,
      drag: function( self ){
        // make sure that it doesn't go below the street 
        let top = self.cart1.DOMobject.style.top.substring(
          0,
          self.cart1.DOMobject.style.top.length - 2 );
        if ( top > 453 ){
          self.cart1.setStyle({
            top: "453px",
          })
        }
      },
      dragClose: function( self ){
        self.cart1.newAnimation({
          animation: [
            {  top: self.cart1.DOMobject.style.top },
            {  top: "453px" },
          ],
          timing: {
            duration: 500
          }
        });
        self.cart1.setStyle({
          top: "453px",
        })
      },
      dragScope: this
    });

    // now add the carts
    this.cart2 = this.addCart({
      type: "img",
      src: "./assets/" + model.cart2Color + "Car.png",
      style: {
        ...model.cart2.location,
        position: "absolute",
        cursor: "pointer",
      },
      draggable: true,
      drag: function( self ){
        // make sure that it doesn't go below the street 
        let top = self.cart2.DOMobject.style.top.substring(
          0,
          self.cart2.DOMobject.style.top.length - 2 );
        if ( top > 453 ){
          self.cart2.setStyle({
            top: "453px",
          })
        }
      },
      dragClose: function( self ){
        self.cart2.newAnimation({
          animation: [
            {  top: self.cart2.DOMobject.style.top },
            {  top: "453px" },
          ],
          timing: {
            duration: 500
          }
        });
        self.cart2.setStyle({
          top: "453px",
        })
      },
      dragScope: this
    });

  }
  /**
   * @param {object} options - the style of the control panel itself
   * @return {node} - the control panel
   */
  addControlPanel( options ){
    return this.sim.addControlPanel( options )
  }
  /**
   * @param {object} options - information at Button/TextPushButton.js
   * @return {node} - the button
   */
  addTextButton( parent, options ){
    return this.sim.addTextButton( parent, options );
  }
  /**
   * @param {object} options - information at Slider/SliderNode.js
   * @param {node} parent - the parent of the new slider
   * @return {node} - the button
   */
  addSlider(  parent, options ){
    let slider = new Slider( options );

    parent.addChild( slider.node )
    return slider;
  }
  /**
   * @param {object} options - information at Buttons/ImageButton.js
   * @return {node} - the button
   */
  addImageButton( parent, options ){
    return this.sim.addImageButton( parent, options );
  }

  addCart( options ){
    let cart = new Node( options )
    this.simNode.addChild( cart )
    return cart;
  }


   /**
   * @public 
   * called when the pause button is pressed
   */
  pauseButtonClick(){
    // change the buttons
    // this.state = "pause";
    this.playButton.setStyle({
      display: ""
    })
    this.pauseButton.setStyle({
      display: "none"
    })
  }
  /**
   * @public 
   * called when the play button is pressed
   */
  playButtonClick(){
    // change the button
    // this.state = "play";
    this.pauseButton.setStyle({
      display: ""
    })
    this.playButton.setStyle({
      display: "none"
    })
  }


}



