/**
 * CollisionTheory
 * CollisionTheoryView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/26/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Functionality:
 *  - Make a node for the vectors 
 *
 */
'use strict';
// import modules

import Vector from "../../../Vector/Vector.js"
// modules

export default class VectorNode {
  /**
   * @constructor - make a vector node
   * @param {cart} the model for the cart that the vector represents
   * @param {model} the collision theory model
   * @param {string} type - either "momentum" or "velocity"
   */
  constructor( cart, model, type ){
    var self = this;

    var vectorHeight = 22
    var color;
    if ( type === "momentum" ){
      color = "#067F26";
      vectorHeight = 40;
    }
     if ( type === "velocity" ){
      color = "#FFC600";
    }


    var center;
    if ( cart.number === 1 ){
      center = cart.x.value - cart.width/2
    }
    else {
      center = cart.x.value + cart.width/2
    }

    let cartY = "calc(" + cart.y + "% - " 
          + ( cart.height/2  + vectorHeight/2 )  + "px" + ")"

    this.vector = new Vector({
      length: 0,
      height: vectorHeight,
      orientation: 0,
      color: color,
      x: center,
      y: null,
      style: {
        top: cartY,
      },
      precentStem: 40,
    });

    // add a listener to the change in velocity
    cart.velocity.setListener( function( newValue ){
      if ( newValue < 0 ){
        self.vector.rotate( Math.PI )
      }
      else {
        self.vector.rotate( 0 )
      }
      var newLength = Math.abs( newValue * 5 );
      if ( type === "momentum" ){
        newLength = Math.abs( newValue * cart.mass  );
      }
      self.vector.setLength( newLength )
      // if ( newValue < 0 ) {
      //   self.vector.node.setStyle({
      //     left: cart.x.value + cart.width/2 - newLength + "px"
      //   })
      // }
      var center;
      if ( cart.number === 1 ){
        center = cart.x.value - cart.width/2
      }
      else {
        center = cart.x.value + cart.width/2
      }
      if ( cart.velocity.value < 0 ) center -= self.vector.length
      self.vector.setX( center )
    });
    // add a listener to the change in velocity
    cart.mass.setListener( function( newValue ){
      if ( type === "momentum" ){

        var newLength = Math.abs( newValue / 5 * cart.velocity * 5 );
        self.vector.setLength( newLength )
        if ( cart.number === 2 ) {
          self.vector.node.setStyle({
            left: cart.x.value + cart.width/2 - newLength + "px"
          })
        }
      }
    });


    cart.x.setListener( function( newValue){
      var center;
      if ( cart.number === 1 ){
        center = cart.x.value - cart.width/2
      }
      else {
        center = cart.x.value + cart.width/2
      }
      if ( cart.velocity.value < 0 ) center -= self.vector.length
      self.vector.setX( center )
    })

   
    cart.velocity.value = cart.velocity.value
      // add listener to the vectors
    model[ type + "VectorOn" ].setListener( function( newValue ) {
      if ( newValue === true ){
        self.vector.node.setStyle({
          opacity: "1"
        })
      }
      else {
        self.vector.node.setStyle({
          opacity: "0"
        })
      }
    })
 
    model[ type + "VectorOn" ].value = model[ type + "VectorOn" ].value
  }
}