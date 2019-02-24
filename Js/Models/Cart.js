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
   *    @param {array} size: - the size in px of the cart [width, height]
   *    @param {number} mass: the mass of the cart
   *    @param {string} color: the color of the cart
   * }
   *
   * @constructor
   */
  constructor( options ) {

    // @public {number} - the style top of the cart ( y location ) 
    // This **must** be in percent for scaling
    this.y = options.y;

    // @public {obervableVariable} - left - the left coord of cart (x location);
    // The view will observe and change the location based on the x.
    // The view makes this value the tip of the car.
    this.x = new ObservableVariable( options.x );

    // @public {number} the velocity of the cart in m/s
    // The view will change the velocity slider when this is changed.
    this.velocity = new ObservableVariable( options.velocity );

    // @public {observableVariable} the mass
    // The view will change the mass slider when this is changed
    this.mass = new ObservableVariable( options.mass );

    // @public {string} the color of the car
    this.color = options.color;

    // @publix {number} this is the change in x (pixels) perframe
    this.deltaX = null;

    // calculate the deltaX
    this.calculateDeltaX();

    // @public {number} height in pixels;
    this.width = options.size[ 0 ];

    // @public {number} height in pixels;
    this.height = options.size[ 1 ];


    // @private {object} keep track of the original options for resets
    this.originalOptions = options;

    // @public {string} the cart number
    this.number = options.number;

  }
  /**
   * Restores the initial state of the Cart. This method is called when the 
   * simulation "Reset All" button is pressed. 
   * @public
   */
  reset() {
    // y is contant and doesn't need to be reset

    this.x.value = this.originalOptions.x;
   
    // direction is contant and doesn't need to be reset

    this.velocity.value = this.originalOptions.velocity;
    this.calculateDeltaX();
    this.mass.value = this.originalOptions.mass;

    // color and size are constant
  }
 
  /**
   * This caclculates the change in x based on the velocity
   * @public
   */
  calculateDeltaX(){
    const pixelsPerMeter = 80;
    const millisecondsPerSecond = 1000;
    // go from meters per second ( velocity )to pixels per millisecond

    // m/s * ( 80px / m ) * ( s / 1000 ms ) dimensional analysis
    this.changeX = this.velocity.value 
                   * pixelsPerMeter 
                   / millisecondsPerSecond;

  }


  /**
   * Restores the initial location. This method is called when the 
   * simulation "Reset Run" button is pressed. 
   * @public
   */
  resetLocation() {
    this.x.value = this.originalOptions.x;
  }

}

