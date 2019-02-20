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
import ObservableVariable from "../../../Observe/ObservableVariable.js";

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
      velocity: 25,
      color: "blue",
      changeX: 0
    });

    // @public {Cart} the second car cart 
    this.cart2 = new Cart({ // the cart on the left
      y: 453,
      x: 1440 - padding - this.cartSize,
      direction: "left", // goes in the right direction
      size: this.cartSize,
      mass: 1,
      velocity: 25,
      color: "red",
      changeX: 0
    });
 
    // @public {ObservableVariable} is the simulation playing
    this.isPlaying = new ObservableVariable( false );
    // @public {bool} 
    this.newRun = true;
    // this tells if it is inside a run or not // this handles functionality
    // of the pause button.

    // @public the mass information
    this.massUnit = "kg";
    this.massLowerBound = 1;
    this.massUpperBound = 10;

    // @public the velocity information
    this.velocityUnit = "m/s";
    this.velocityLowerBound = 0;
    this.velocityUpperBound = 50;

    // @public the coefficient of restitution
    this.restitution = 0;

  }
  /**
   * @public 
   * this is the logic to the sim
   * move the carts when the play is pressed
   */
  run(){
    // alias self
    var self = this;

    // stats
    const pixelsPerMeter = 80;
    const millisecondsPerSecond = 1000;

    if ( this.newRun ){ // only on a new run, calculate velocities
      // go from meters per second to pixels per millisecond
      // m/s * ( 80px / m ) * ( s / 1000 ms ) dimensional analysis
      this.cart1.changeX = this.cart1.velocity.value * 80 / 1000;

      // since its the other direction, multiple by -1
      this.cart2.changeX = -1 * this.cart2.velocity.value * 80 / 1000;
      this.newRun = false; // no longer a new run
      // this will turn into a new run on the "reset run" button and the 
      // reset all button
    }


    var ableToCollide = false;
    if ( self.cart1.x.value < self.cart2.x.value ){
      // only if the cart1 is less that the second cart
      // or the first cart is in front of the other cart, we can collid
      ableToCollide = true;
    }

    function moveCart( timestamp ) {
      self.cart1.x.value += self.cart1.changeX;
      self.cart2.x.value += self.cart2.changeX;

      if ( ableToCollide && self.cart1.x.value >= self.cart2.x.value ){
        collideCarts();
      }
      if ( self.isPlaying.value === true )
        setTimeout( moveCart , 1 );
    }

    setTimeout( moveCart, 1 );

    function collideCarts(){
      self.cart1.changeX *= -1;
      self.cart2.changeX *= -1;
    }

    
  }
  /**
   * Restores the initial locations of the cart. This method is called when the 
   * simulation "Reset Run" button is pressed. 
   * @public
   */

  resetRun(){
    // reset the locations
    this.cart1.resetLocation();
    this.cart2.resetLocation();
    // new run 
    this.newRun = true;
    // pause
    this.isPlaying.value = false;
  }
  /**
   * Restores everything. This method is called when the 
   * simulation "Reset All" button is pressed. 
   * @public
   */
  resetAll(){
    // reset the locations
    this.cart1.reset();
    this.cart2.reset();
    // new run 
    this.newRun = true;
    // pause
    this.isPlaying.value = false;
  }

}