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
   * @param {object} location - the location of the cart, ex:{ right: "50px" }
   * @param {number} velocity - the velocity of the cart in m/s
   * @param {string} orientation - "left" || "right" - direction it's going
   * @param {string} color - the color of the cart
   *
   * @constructor
   */
  constructor( location, velocity, orientation, color ) {

    // @public {object} the style for the coordinates
    this.location = location;

    // @public {number} the velocity of the cart in m/s
    this.velocity = velocity;

    // @public (read-only) {string} orientation - direction it's going
    this.orientation = orientation;

    // make original copies for reset 
    // @private
    this.originalVelocity = velocity;

    // @private
    this.originalLocation = location;

  }
  /**
   * Restores the initial state of the Cart. This method is called when the 
   * simulation "Reset All" button is pressed. Note that orientation is constant
   * and doesn't have to be reset. 
   * @public
   */
  reset() {
    this.velocity = this.originalVelocity;
    this.location = this.originalLocation;
  }

}

