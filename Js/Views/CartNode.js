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

export default class CartNode {
  /**
   * Set up the cart based on the model
   * @param {cart} cart - the model
   * @param {model} model for the sim
   * @constructor
   * @return {node} - the cart node
   */
  constructor( cart, model ){
    // the initial position is the percentage of the bottom - height
    let cartY = "calc(" + cart.y + "% - " + cart.height + "px" + ")"

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
        let top = cartNode.DOMobject.style.top;
        top = top.substring( 0, top.length - 2 )
        // make sure that it doesn't go below the street 
        
        let boundry = window.innerHeight * 0.92 * 0.69 - cart.height
        if ( top > boundry ){
          cartNode.setStyle({
            top: cartY,
          })
        }
        // cart.x = 
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
    
   

    return cartNode;
  }

}
// 1//if ( self.model.cart1.x.value > self.model.cart2.x.value ){
//     //       // when on top of each other shift
//     //       if ( self.model.cart1.x.value 
//     //           - self.model.cart2.x.value <= self.model.cartSize / 2 )
//     //         self.model.cart1.x.value = self.model.cart2.x.value - 40
//     //       else if ( self.model.cart1.x.value 
//     //           - self.model.cart2.x.value >= self.model.cartSize / 2 &&
//     //           self.model.cart1.x.value 
//     //           - self.model.cart2.x.value <= 2*self.model.cartSize  )
//     //         self.model.cart1.x.value = self.model.cart2.x.value 
//     //                                    + 2 * self.model.cartSize 
//     //                                    + 40
//     //     }
// //2
//  if ( self.model.cart1.x.value > self.model.cart2.x.value ){
//     //       // when on top of each other shift
//     //       if ( self.model.cart1.x.value 
//     //           - self.model.cart2.x.value <= self.model.cartSize / 2 )
//     //         self.model.cart2.x.value = self.model.cart1.x.value + 40
//     //       else if ( self.model.cart1.x.value 
//     //           - self.model.cart2.x.value >= self.model.cartSize / 2 &&
//     //           self.model.cart1.x.value 
//     //           - self.model.cart2.x.value <= 2*self.model.cartSize  )
//     //         self.model.cart2.x.value = self.model.cart1.x.value 
//     //                                    - 2 * self.model.cartSize 
//     //                                    - 40
//     //     } 