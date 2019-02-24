/**
 * Portfolio
 * CheckButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/22/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This view is the view for the cart. This script handles functionalities
 * on drags, etc.
 *
 */
"use strict";

import Node from "../../../Screen/Node.js";
import WeightNode from "./WeightNode.js"


export default class CartNode {
  /**
   * Set up the cart based on the model
   * @param {cart} cart - the model
   * @param {model} model for the sim
   * @constructor
   * @return {object} - the cart node and the weight node
   */
  constructor( cart, model ){
    // the initial position is the percentage of the bottom - height
    let cartY = "calc(" + cart.y + "% - " + cart.height + "px" + ")"

    var weight = new WeightNode( cart, model )

    let cartNode = new Node({
      // image type
      type: "img",
      // the image is based on the color
      src: "./assets/" + cart.color + "Car.png",
      style: {
        top: cartY,
        position: "absolute",
        cursor: "pointer",
      },
      // allow drag
      draggable: true,

      drag: function(){
        model.isPlaying.value = false;
        let top = cartNode.DOMobject.style.top;
        top = top.substring( 0, top.length - 2 )
        // make sure that it doesn't go below the street 
        
        let boundry = window.innerHeight * 0.92 * 0.69 - cart.height
        if ( top > boundry ){
          cartNode.setStyle({
            top: cartY,
          })
        }
        if ( model.alreadyCollided.value === true ) model.newRun = true
        model.alreadyCollided.value = false;
        
        let weightHeight = weight.DOMobject.style.height
        weightHeight = weightHeight.substring( 0, weightHeight.length - 2 )
        weightHeight = Number.parseFloat( weightHeight )
        weight.setStyle({
          top: top - weightHeight + "px"
        })

        let left = cartNode.DOMobject.style.left;
        left = left.substring( 0, left.length - 2 );
        left = Number.parseFloat( left );
        if ( cart.number === 1 ) left += cart.width

        cart.x.value = left;

      },

      dragClose: function(){
        // get the 'left' in terms of a number
        let xCoord = cartNode.DOMobject.style.left;
        xCoord = xCoord.substring( 0, xCoord.length - 2 );
        xCoord = Number.parseInt( xCoord )
        // cancel out
        if ( cart.number === 2 ) xCoord -= cart.width;

        cart.x.value = xCoord + cart.width;

        let otherCart = model.getOtherCart( cart );
        if ( cart.number === 1 ){
          if ( cart.x.value > otherCart.x.value 
              && cart.x.value < otherCart.x.value + cart.width  ){
            cart.x.value = otherCart.x.value - 20
          }
          if ( cart.x.value > otherCart.x.value + cart.width 
              && cart.x.value < otherCart.x.value + 2*cart.width  ){
            cart.x.value = otherCart.x.value + 2 * cart.width + 20
          }
        }
        else {
          if ( cart.x.value < otherCart.x.value 
              && cart.x.value > otherCart.x.value - cart.width  ){
            cart.x.value = otherCart.x.value + 20
          }
          if ( cart.x.value < otherCart.x.value - cart.width 
              && cart.x.value > otherCart.x.value - 2*cart.width  ){
            cart.x.value = otherCart.x.value - 2 * cart.width - 20
          }
        }
        cartNode.newAnimation({
          animation: [
            {  top: cartNode.DOMobject.style.top },
            {  top: cartY },
          ],
          timing: {
            duration: 500
          }
        });
        cartNode.setStyle({
          top: cartY,
        });
        let weightHeight = weight.DOMobject.style.height
        weightHeight = weightHeight.substring( 0, weightHeight.length - 2 )
        weightHeight = Number.parseFloat( weightHeight )

        let weightY = "calc(" + cart.y + "% - " 
          + ( cart.height + weightHeight - 2 )  + "px" + ")"
        weight.newAnimation({
          animation: [
            {  top: weight.DOMobject.style.top },
            {  top: weightY },
          ],
          timing: {
            duration: 500
          }
        })
        weight.setStyle({
          top: weightY
        })
      },
    });

    // now add listeners to the cart x coordinates
    cart.x.setListener( function() {
      let newLeft; 
      // subtract 180 because the cart postion because the model position
      // is the tip of the cart
      if ( cart.number === 1 )
        newLeft = cart.x - 180 + "px"
      else 
        newLeft = cart.x + "px"
      cartNode.setStyle({
       
        left: newLeft
      })
    } );
    // set it to the model location
    cart.x.value = cart.x.value;
    
    
    return {
      cart: cartNode,
      weight: weight
    }
  }

}