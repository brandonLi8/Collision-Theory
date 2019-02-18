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

    // @public {Cart} the first cart 
    this.cart1 = new Cart( // the cart on the left
      { left: "180px" },
      0,
      "right", // goes in the right direction
      this.cart1Color
    );

    // @public {Cart} the first cart 
    this.cart2 = new Cart( // the cart on the left
      { right: "180px" },
      0,
      "right", // goes in the right direction
      this.cart2Color
    );

  }
}