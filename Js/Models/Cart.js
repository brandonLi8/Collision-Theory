/**
 * Learning App
 * Cart.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/17/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Model for a cart
 * 
 */
"use strict";

export default class Cart {
  /**
   * @public 
   *
   * Construct the Simulation
   * @param {number} - the top of the cart ( y location )
   * @param {number} - left - the left coord of cart 
   * the left is 0, the width is 1440
   * @param {number} velocity - the velocity of the cart in m/s
   * @param {string} orientation - "left" || "right" - direction it's going
   * @param {number} cartSize - the size in px of the cart
   *
   * @constructor
   */
  constructor( top, left, velocity, orientation, cartSize ) {

    // if it is the left car( the car that goes in the right direction)
    // we wont the left to be the front of the car, so we have to subtract
    // the cart size 
    if ( orientation === "right" ) left -= cartSize;


    // @public {string} - the top of the cart ( y location )
    this.top = top + "px";

    // @public {string} - left - the left coord of cart ( x location )
    this.left = left + "px";

    // @public {number} the velocity of the cart in m/s
    this.velocity = velocity;

    // @public (read-only) {string} orientation - direction it's going
    this.orientation = orientation;

    // make original copies for reset 
    // @private
    this.originalVelocity = velocity;

    // create copies for reset
    // @private
    this.originalTop = top;

    // @private 
    this.originalLeft = left;

  }
  /**
   * Restores the initial state of the Cart. This method is called when the 
   * simulation "Reset All" button is pressed. Note that orientation is constant
   * and doesn't have to be reset. 
   * @public
   */
  reset() {
    this.velocity = this.originalVelocity;
    this.left = this.originalLeft + "px";
    this.top = this.originalTop + "px";
  }

}

