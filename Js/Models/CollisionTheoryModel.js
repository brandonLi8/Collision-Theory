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

    const originalPadding = "180px"; // the padding between the edge of the 
    // screen and the cart

    // @public {String} the color scheme of the first cart
    this.cart1Color = "blue";

    // @public {String} the color scheme of the second cart
    this.cart2Color = "red";

    // @private the padding on both sides of the cart
    var padding = 180
    // @private the size of the cart
    var cartSize = 180;

    // @public {Cart} the first cart 
    this.cart1 = new Cart( // the cart on the left
      453,
      padding + cartSize,
      0,
      "right", // goes in the right direction
      cartSize
    );

    // @public {Cart} the second car cart 
    this.cart2 = new Cart( // the cart on the left
      453,
      1440 - padding - cartSize,
      0,
      "left", // goes in the right direction
      cartSize
    );

    // @public {boolean} the state of the simulation
    this.paused = true;
    this.play = false;

    // @public the mass information
    this.massUnit = "kg";
    this.massLowerBound = 1;
    this.massUpperBound = 10;

    // @public the velocity information
    this.velocityUnit = "m/s";
    this.velocityLowerBound = 0;
    this.velocityUpperBound = 10;

  }
}