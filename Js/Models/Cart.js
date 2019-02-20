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

// modules 
import ObservableVariable from "../../../Observe/ObservableVariable.js";

"use strict";

export default class Cart {
  /**
   * @public 
   *
   * Construct the Simulation
   * options = {
   *    @param {number} - y: the y coordinate of the cart
   *    @param {number} - x: the x coordinate of the TIP of the car
   *    @param {number} velocity : the velocity of the cart in m/s
   *    @param {string} direction : "left" || "right" - direction it's going
   *    @param {number} size: - the size in px of the cart 
   *    @param {number} mass: the mass of the cart
   *    @param {string} color: the color of the cart
   * }
   *
   * @constructor
   */
  constructor( options ) {

    // @private {object} keep track of the original options for resets
    this.originalOptions = options;

    // @public {number} - the top of the cart ( y location )
    this.y = options.y;

    // @public {obervableVariable} - left - the left coord of cart (x location)
    this.x = new ObservableVariable( options.x );

    // @public {number} the velocity of the cart in m/s
    this.velocity = new ObservableVariable( options.velocity );

    // @public (read-only) {string} orientation - direction it's going
    this.direction = options.direction;

    // @public the mass
    this.mass = new ObservableVariable( options.mass );

    // @public the velocity
    this.color = options.color;

    // @public the size
    this.size = options.size;
  }
  /**
   * Restores the initial state of the Cart. This method is called when the 
   * simulation "Reset All" button is pressed. 
   * @public
   */
  reset() {
    // y is contant and doesn't need to be reset

    this.x = new ObservableVariable( this.originalOptions.x );
   
    // direction is contant and doesn't need to be reset

    this.velocity = new ObservableVariable( this.originalOptions.velocity );

    this.mass = new ObservableVariable( this.originalOptions.mass );

    // color and size are contant
  }

}

