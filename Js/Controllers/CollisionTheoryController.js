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
      border: "2px solid blue"
    });
    // the panel for the second car
    this.cart2Panel = this.view.addControlPanel({
      left: 50 * 2 + 250 + "px",
      top: "20px",
      border: "2px solid red"
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
      unit: "%",
      backgroundStyle: {
        fontFamily: "courier",
        borderRadius: "8px", // slider background
        width: "250px",
        height: "100px", 
        background: "none",
        border: "none",
        boxShadow: "none" 
      },
      valueStyle: {
        border: "1px solid grey",
        fontSize: "16px",
        height: "23px",
        position: "absolute",
        margin: "0",
        width: "60px",
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
    });
    // add the play/pause button
    this.state = "pause";
    this.addPlayAndPauseButtons(); // add these buttons

    // now add the first panel items
    this.cart1Panel.addChild( this.view.addTextButton({
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
        borderBottom: "2px solid blue",
        borderRadius: "0",
        padding: 0,
      }
    }) );
    let cart1Mass = this.view.addSlider({
      parent: this.cart1Panel,
      unit: "kg",
      leftText: "1",
      rightText: "10",
      lowerBound: "1",
      upperBound: "10",
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
        marginLeft: "70%"
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
        background: "blue"
      }
    });
    let cart1Velocity = this.view.addSlider({
      parent: this.cart1Panel,
      unit: "m/s",
      leftText: "1", // labels the sides
      rightText: "10",
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
        background: "blue"
      }
    });

    // now add the second panel items
    this.cart2Panel.addChild( this.view.addTextButton({
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
        borderBottom: "2px solid red",
        borderRadius: "0",
      }
    }) );
    let cart2Mass = this.view.addSlider({
      parent: this.cart2Panel,
      unit: "kg",
      leftText: "1", // labels the sides
      rightText: "10",
      lowerBound: "1",
      upperBound: "10",
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
        marginLeft: "70%"
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
        background: "red"
      }
    });
    let cart2Velocity = this.view.addSlider({
      parent: this.cart2Panel,
      unit: "m/s",
      leftText: "1", // labels the sides
      rightText: "10",
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
        background: "red"
      }
    });

    let cart1 = this.view.addCart({
      type: "img",
      src: "./assets/blueCar.png",
      style: {
        bottom: "218px",
        left: "180px",
        position: "absolute"
      }
    })
    let cart2 = this.view.addCart({
      type: "img",
      src: "./assets/redCar.png",
      style: {
        bottom: "218px",
        right: "180px",
        position: "absolute",
      }
    })

  }
  /**
   * @public 
   * called when the pause button is pressed
   */
  pauseButtonClick(){
    // change the buttons
    this.state = "pause";
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
    this.state = "play";
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
        display: "none",
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

