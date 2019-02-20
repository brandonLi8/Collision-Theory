/**
 * Learning App
 * CollisionTheoryModel.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/17/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Model for Collision Theory
 * 
 */
"use strict";

// import modules
import Cart from "./Cart.js";

export default class Model {
  /**
   * @public 
   * @constructor
   * Construct the Simulation
   */
  constructor(){
    var self = this;
    // @private the padding on both sides of the cart
    const padding = 180

    // @private the size of the cart
    this.cartSize = 180;

    // @public {Cart} the first cart 
    this.cart1 = new Cart({ // the cart on the left
      y: 453,
      x: padding + this.cartSize,
      direction: "right", // goes in the right direction
      size: this.cartSize,
      mass: 1,
      velocity: 5,
      color: "blue"
    });

    // @public {Cart} the second car cart 
    this.cart2 = new Cart({ // the cart on the left
      y: 453,
      x: 1440 - padding - this.cartSize,
      direction: "left", // goes in the right direction
      size: this.cartSize,
      mass: 1,
      velocity: 5,
      color: "red"
    });
 
    // @public {ObservableVariable} is the simulation playing
    this.isPlaying = false;


    // @public the mass information
    this.massUnit = "kg";
    this.massLowerBound = 1;
    this.massUpperBound = 10;

    // @public the velocity information
    this.velocityUnit = "m/s";
    this.velocityLowerBound = 0;
    this.velocityUpperBound = 10;

  }
  /**
   * @public 
   * this is the logic to the sim
   * move the carts when the play is pressed
   */
  run( mass1Slider, mass2Slider, velocity1Slider, velocity2Slider ){
    console.log( this.cart1, this.cart2 )
    // velocity1Slider.setValue( 20 )

  //   var start = null;
  //   var element = this.cart1;

  //   function step(timestamp) {
  //     if (!start) start = timestamp;
  //     var progress = timestamp - start;
  //     element.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  //     if (progress < 2000) {
  //       window.requestAnimationFrame(step);
  //     }
  //   }

  // window.requestAnimationFrame(step);
  }

}