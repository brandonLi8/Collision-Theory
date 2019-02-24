/**
 * Portfolio
 * WeightNode.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/23/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This view for the weights
 *
 */

"use strict";

import Node from "../../../Screen/Node.js";

export default class WeightNode {
  /**
   * @constructor
   * @param {cart} the cart that the weight is on top of
   * @param {model} the model for the sim
   * @return {node} the weight for the cart
   */
  constructor( cart, model ){
    let intialWeightHeight = 0

    let cartY = "calc(" + cart.y + "% - " 
          + ( cart.height + intialWeightHeight - 2 )  + "px" + ")"

    let weightNode = new Node({
      // image type
      type: "img",
      // the image is based on the color
      src: "./assets/weight.png",
      style: {
        top: cartY,
        position: "absolute",
        width: cart.width / 3 + "px",
        height: intialWeightHeight + "px",

      },
     
    });
    cart.x.setListener( function(){
      let newLeft; 
      // subtract 180 because the cart postion because the model position
      // is the tip of the cart
      if ( cart.number === 1 )
        newLeft = cart.x.value - cart.width + cart.width / 3  - 5 + "px"
      else 
        newLeft = ( cart.x.value + cart.width/3 + 5 )+ "px"
      weightNode.setStyle({
        left: newLeft
      })
    } );

    cart.mass.setListener( function( newValue ){
      intialWeightHeight = ( newValue - 1 ) * window.innerHeight / 50;

      let cartY = "calc(" + cart.y + "% - " 
          + ( cart.height + intialWeightHeight - 2 )  + "px" + ")"
      weightNode.setStyle({ 
        height: intialWeightHeight + "px",
        top: cartY
      });
    })

    cart.x.value = cart.x.value;
    return weightNode
  }
}