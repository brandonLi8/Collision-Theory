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
    // alias self for listeners
    var self = this;

    this.model = model; 
    // create the basic view
    this.sim = new Sim( simOptions );

    this.screenView = new ScreenView( this.sim.simWrapper );

    // the node of just the sim ( not the footer )
    this.simNode = this.sim.sim;

    // the panel for the first cart
    this.cart1Panel = this.addControlPanel({
      left: "50px",
      top: "20px",
      border: "2px solid " + model.cart1.color
    });

    // the panel for the second car
    this.cart2Panel = this.addControlPanel({
      left: 50 * 2 + 250 + "px",
      top: "20px",
      border: "2px solid " + model.cart2.color
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
        top: "105px"
      },
      rightStyle: {
        fontSize: "20px",
        fontWeight: 700,
        position: "absolute",
        right: "65px",
        top: "105px",
        
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
        height: "25px",
        width: "13px",
        marginTop: "calc( -" + "25px" + " * 0.5"  + ")",
        zIndex: 10
      },
      listener: function(){
        let restitution = self.restitution.value;
        restitution = restitution.substring( 0, restitution.length - 2 )
        self.model.restitution = Number.parseFloat( restitution ) / 100;
      }
    } );

    // now add the pause and the play buttons

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
      hoverListener: function(){
        playButtonAnimation.play()
      },
      mouseout: function(){
        playButtonAnimation.cancel()
      },
      listener: function(){ self.playButtonClick(); }
    } );

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
      hoverListener: function(){
        pauseButtonAnimation.play()
      },
      mouseout: function(){
        pauseButtonAnimation.cancel()
      },
      listener: function(){ self.pauseButtonClick() }
    } );
    // add the animations on the hover
    const playButtonAnimation = this.playButton.jiggle( 200 );
    const pauseButtonAnimation = this.pauseButton.jiggle( 200 );
    playButtonAnimation.pause();
    pauseButtonAnimation.pause();


    // set the default button
    // since it is paused, show the play button
    if ( !model.isPlaying.value ) 
      this.pauseButton.setStyle({ display: "none" });

    // add a listener to the model isPlaying, when the model isplaying is 
    // changed update the buttons
    model.isPlaying.setListener( function( newValue ){
      if ( newValue === false ){ // now paused, show play button
        self.pauseButton.setStyle({
          display: "none"
        })
        self.playButton.setStyle({
          display: ""
        });
      }
      else if ( newValue ===  true ){
        self.pauseButton.setStyle({
          display: ""
        })
        self.playButton.setStyle({
          display: "none"
        });
      }
    } )


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
        borderBottom: "2px solid " + model.cart1.color,
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
        borderBottom: "2px solid " + model.cart2.color,
        borderRadius: "0",
      }
    } );


    // mass sliders 
    this.cart1Mass = this.addSlider( this.cart1Panel, {
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
        background: model.cart1.color
      },
      // add a listener that changes the model mass
      listener: function(){
        self.model.isPlaying.value = false;
        let value = self.cart1Mass.value;
        value = value.substring( 0, value.length - 2 )// get rid or the unit
        self.model.cart1.mass.value = Number.parseFloat( value );;
      }
    } );
    this.cart2Mass = this.addSlider( this.cart2Panel, {
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
        background: model.cart2.color
      },
      // add a listener that changes the model mass
      listener: function(){
        self.model.isPlaying.value = false;
        let value = self.cart2Mass.value;
        value = value.substring( 0, value.length - 2 )// get rid or the unit
        self.model.cart2.mass.value = Number.parseFloat( value );;
      }
    } );
 
    // velocity sliders
    this.cart1Velocity = this.addSlider( this.cart1Panel, {
      unit: model.velocityUnit,
      leftText: "" + model.velocityLowerBound, // labels the sides
      rightText: "" + model.velocityUpperBound,
      lowerBound: model.velocityLowerBound,
      upperBound: model.velocityUpperBound,
      startingValue: "25",
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
        width: "300px",
        height: "20px",
        marginLeft: "60%"
      },
      // title of the entire div
      title: "Velocity",
      titleStyle: {
        fontSize: "17px",
        fontWeight: "700",
        position: "absolute",
        left: "60px"
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
        background: model.cart1.color,
      },
      // add a listener that changes the model velocity
      listener: function(){
        self.model.isPlaying.value = false;
        let value = self.cart1Velocity.value;
        value = value.substring( 0, value.length - 3 )// get rid or the unit
        self.model.cart1.velocity.value = Number.parseFloat( value );;
      }
    } );

    // velocity sliders
    this.cart2Velocity = this.addSlider( this.cart2Panel, {
      unit: model.velocityUnit,
      leftText: "" + model.velocityLowerBound, // labels the sides
      rightText: "" + model.velocityUpperBound,
      lowerBound: model.velocityLowerBound,
      upperBound: model.velocityUpperBound,
      startingValue: "25",
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
        marginLeft: "60%"
      },
      // title of the entire div
      title: "Velocity",
      titleStyle: {
        fontSize: "17px",
        fontWeight: "700",
        position: "absolute",
        left: "60px"
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
        background: model.cart2.color,
      },
      // add a listener that changes the model velocity
      listener: function(){
        self.model.isPlaying.value = false;
        let value = self.cart2Velocity.value;
        value = value.substring( 0, value.length - 3 )// get rid or the unit
        self.model.cart2.velocity.value = Number.parseFloat( value );
      }
    } );

    // now add listeners to the cart x coordinates
    this.model.cart1.x.setListener( function() {
      self.cart1.setStyle({
        // subtract 180 because the cart postion because the model position
        // is the tip of the cart
        left: self.model.cart1.x - 180 + "px"
      })
    })
    this.model.cart2.x.setListener( function() {
      self.cart2.setStyle({
        left: self.model.cart2.x + "px"
      })
    })
   
    // now add the carts
    this.cart1 = this.addCart({
      type: "img",
      src: "./assets/" + model.cart1.color + "Car.png",
      style: {
        top: model.cart1.y + "px",
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
       let coord = Number.parseInt( self.cart1.DOMobject.style.left.substring(
          0,
          self.cart1.DOMobject.style.left.length - 2 ) );
        self.model.cart1.x.value = coord + 180;
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
    this.cart2 = this.addCart({
      type: "img",
      src: "./assets/" + model.cart2.color + "Car.png",
      style: {
        top: model.cart2.y + "px",
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
        let coord = Number.parseInt( self.cart2.DOMobject.style.left.substring(
          0,
          self.cart2.DOMobject.style.left.length - 2 ) );
        self.model.cart2.x.value = coord ;
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
    // set the x values
    this.model.cart1.x.value = this.model.cart1.x.value;
    this.model.cart2.x.value = this.model.cart2.x.value;
    // now add the vector check box

    this.velocityVector = this.addCheckBox( this.controlPanel, {
      listener: function( self ) { },
      scope: this,
      containerStyle: {
        margin: "80px auto"
      },
      label: "Velocity Vectors"
    })

    this.velocityVector = this.addCheckBox( this.controlPanel, {
      listener: function( self ) { },
      scope: this,
      containerStyle: {
        margin: "-60px auto"
      },
      label: "Momentum Vectors"
    })
    // now listen to velocity changes and mirror them in the slider
    this.model.cart1.velocity.setListener( function( newValue ){
      self.cart1Velocity.setValue( newValue )
    } );
    this.model.cart2.velocity.setListener( function( newValue ){
      self.cart2Velocity.setValue( newValue )
    } );
    // do the same with mass changed
    this.model.cart1.mass.setListener( function( newValue ){
      self.cart1Mass.setValue( newValue )
    } );
    this.model.cart2.mass.setListener( function( newValue ){
      self.cart2Mass.setValue( newValue )
    } );

    // add the reset run button
    this.resetRun = this.addTextButton( this.simNode, {
      text: "Reset Run", 
      style: { 
        border: "2px solid #05F",
        borderRadius: "7px",
        width: "120px",
        height: "40px",
        background: "#DC143C",
        boxShadow: "0 0 1px 0 rgb( 40, 40, 40 )",
        position: "absolute",
        left: "calc( 50% + 120px )",
        bottom: "60px",
        color: "#FFF"
      },

      hoverStyle: { 
        background: "#ab123a"
      },

      listener: function(){
        self.model.resetRun()
      },
      hoverListener: function() {
        resetRunAnimation.play()
      },
      mouseout: function(){
        resetRunAnimation.cancel()
      }
    });
    // add the animations on the hover
    const resetRunAnimation = this.resetRun.newAnimation({
      animation: [
        {  transform: "scale( 1, 1 )" },
        {  transform: "scale( 1.1, 1.1 )" },
      ],
      timing: {
        fill: "forwards",
        duration: 200
      }
    });
    resetRunAnimation.pause();

    // add the reset all button
    this.resetAll = this.addTextButton( this.controlPanel, {
      text: "Reset All", 
      style: { 
        border: "2px solid #05F",
        borderRadius: "7px",
        width: "120px",
        height: "40px",
        background: "#DC143C",
        boxShadow: "0 0 1px 0 rgb( 40, 40, 40 )",
        position: "absolute",
        left: "calc( 50% - 60px )",
        top: "calc( 50% - 20px )",
        color: "#FFF"
      },

      hoverStyle: { 
        background: "#ab123a"
      },

      listener: function(){
        self.model.resetAll()
      },
      hoverListener: function() {
        resetAllAnimation.play()
      },
      mouseout: function(){
        resetAllAnimation.cancel()
      }
    });
    // add the animations on the hover
    const resetAllAnimation = this.resetAll.newAnimation({
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
  };
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
  /**
   * @param {object} options - information at Buttons/CheckButton.js
   * @return {checkButton} - the button
   */
  addCheckBox( parent, options ){
    return this.sim.addCheckButton( parent, options );
  }

  /**
   * @param {object} options - add a cart image
   * @return {node} - the cart
   */
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
    // now pause
    this.model.isPlaying.value = false;
  }
  /**
   * @public 
   * called when the play button is pressed
   */
  playButtonClick(){
    // change the button
    this.model.isPlaying.value = true; // now play

    // now run!
    this.model.run();
  }


}



