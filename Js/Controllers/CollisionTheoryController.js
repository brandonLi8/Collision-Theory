/**
 * Learning App
 * CController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/12/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - create instance of view and the view.
 *  - tell the view to render the basic structure
 */

'use strict';
// import modules
import CollisionTheoryView from "../Views/CollisionTheoryView.js";

/**
 * @public 
 * provide a class for outside modules
 */
export default class Controller {
  /**
   * @public 
   * @constructor
   * create the instance of the view and the model.
   */
  constructor(){
    // create intance of the view
    this.view = new CollisionTheoryView();
    this.sim = this.view.simNode 
    // the panel for the first cart
    this.cart1Panel = this.view.addControlPanel({
      left: "50px",
      top: "20px",
      border: "1px solid orange"
    });
    // the panel for the second car
    this.cart2Panel = this.view.addControlPanel({
      left: 50 * 2 + 250 + "px",
      top: "20px",
      border: "1px solid orange"
    });
    // the main control panel
    this.controlPanel = this.view.addControlPanel({
      right: "50px",
      height: "300px",
      top: "20px",
      border: "3px solid orange"
    });
    // the slider
    this.restitution = this.view.addSlider({
      parent: this.controlPanel,
      unit: "",
      backgroundStyle: {
        fontFamily: "courier",
        borderRadius: "13px", // slider background
        width: "200px",
        margin:  "5% auto", // of the entire container
      },
      valueStyle: {
        background: "#EEE", // the background behind the box showing the value
        border: "1px solid grey",
        fontSize: "13px",
        paddingLeft : "1px",
        paddingRight : "1px",
        height: "20px",
        borderRadius: "4px",
        marginLeft: "70%"
      },
      // title of the entire div
      title: "Restitution",
      titleStyle: {
        fontSize: "20px",
        position: "absolute",
        left: "13%"
      },
      // sides before and after the slider showing the values
      leftStyle: {
        fontSize: "10px"
      },
      rightStyle: {
        fontSize: "10px"
      },
      leftText: "left", // labels the sides
      rightText: "right",
      // the actual slider line
      sliderStyle: {
        width: "60%",
        height: "1px",
        border: "1px solid black",
        borderRadius : "10px",
        background : "#555",
      },
      thumbStyle: {
        height: "15px",
        marginTop: "calc( -" + "15px" + " * 0.5"  + ")",
      },
    });
    // add the play/pause button
    this.state = "pause";
    this.addPlayAndPauseButtons(); // add these buttons
  }
  /**
   * @public 
   * called when the pause button is pressed
   */
  pauseButtonClick(){
    // change the buttons
    this.state = "play";
    this.playButton.node.setStyle({
      display: ""
    })
    this.pauseButton.node.setStyle({
      display: "none"
    })
  }
  /**
   * @public 
   * called when the play button is pressed
   */
  playButtonClick(){
    // change the button
    this.state = "pause";
    this.pauseButton.node.setStyle({
      display: ""
    })
    this.playButton.node.setStyle({
      display: "none"
    })
  }
  /**
   * @public 
   * render the basic pause and play buttons 
   */
  addPlayAndPauseButtons(){
    this.pauseButton = this.view.addImageButton({
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
      listener: function( scope ){ scope.pauseButtonClick() }
    });
    this.playButton = this.view.addImageButton({
      style: {
        position: "absolute",
        left: "calc( 50% - 45px )",
        bottom: "calc( 90px - 45px )",
        display: "none",
        boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
        borderRadius: "50%",
        width: "90px"
      },
      src: "./assets/playButton.png",
      hover: "./assets/playButtonHover.png", 
      scope: this,
      listener: function( scope ){ scope.playButtonClick() }
    });
    var playButtonAnimation = this.playButton.node.jiggle( 
                                200 );
    playButtonAnimation.pause();
    this.playButton.node.addEventListener( "mouseover", function( _ ){
      playButtonAnimation.play()
    })
    this.playButton.node.addEventListener( "mouseout", function( _ ){
      playButtonAnimation.cancel()
    })
    var pauseButtonAnimation = this.pauseButton.node.jiggle( 
                                200 );
    pauseButtonAnimation.pause();
    this.pauseButton.node.addEventListener( "mouseover", function( _ ){
      pauseButtonAnimation.play()
    })
    this.pauseButton.node.addEventListener( "mouseout", function( _ ){
      pauseButtonAnimation.cancel()
    })
    // append the children
    this.sim.appendChildren([ this.pauseButton.node, this.playButton.node ]);
  }

}

