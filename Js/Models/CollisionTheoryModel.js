/**
 *
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
import ObservableVariable from "../../../Observe/ObservableVariable.js";

export default class Model {
  /**
   * @public 
   * @constructor
   * Construct the Simulation
   */
  constructor(){
    // @private {number} the padding on both sides of the cart
    const padding = 180

    // @public the mass information
    this.massUnit = "kg";
    this.massLowerBound = 1;
    this.massStarting = 1;
    this.massUpperBound = 10;

    // @public the velocity information
    this.velocityUnit = "m/s";
    this.velocityLowerBound = 0;
    this.velocityStarting = 25;
    this.velocityUpperBound = 50;

    // @public the coefficient of restitution
    this.restitution = 0;
    this.restitutionStarting = 1;

    // @private {number} the size of the cart
    this.cartWidth = 180;
    this.cartHeight = 54;

    // @private {number} the percentage from the bottom
    this.cartPercentage = 31

    // @public {Cart} the first cart 
    this.cart1 = new Cart({ 
      y: 100 - this.cartPercentage, // inpercentage
      x: padding + this.cartWidth, // since its the tip
      size: [ this.cartWidth, this.cartHeight ],
      mass: this.massStarting,
      velocity: this.velocityStarting,
      color: "blue"
    });

    // @public {Cart} the second car cart 
    this.cart2 = new Cart({
      y: 100 - this.cartPercentage, // in percentage
      x: window.innerWidth - padding - this.cartSize, // the left of the car
      size: [ this.cartWidth, this.cartHeight ],
      mass: this.massStarting,
      velocity: -1 * this.velocityStarting, // opposite direction
      color: "red",
    });
 
    // @public {ObservableVariable} is the simulation playing
    this.isPlaying = new ObservableVariable( false );

  } 
  /**
   * @public 
   * this is the logic to the sim
   * move the carts when the play is pressed
   */
  run(){
    // alias self
    var self = this;

    // stats
    const pixelsPerMeter = 80;
    const millisecondsPerSecond = 1000;

    this.calculateVelocties();


    var collided = false;

    function moveCart( timestamp ) {
      self.cart1.x.value += self.cart1.changeX;
      self.cart2.x.value += self.cart2.changeX;

      if ( self.cart1.x.value >= self.cart2.x.value &&!collided ){
        collideCarts();
        collided = true; // essential on pause
      }
      if ( self.isPlaying.value === true )
        setTimeout( moveCart , 1 );
    }

    setTimeout( moveCart, 1 );


    /**
     * This is the function that caculates the final velocities after a
     * collision!
     *
     * The fundamental method is a system of equations
     * Since, the system is isolated, we can use the conservation of momentum
     * as our first equation:
     * 1: m1v1 + m2v2 = m1v1(final) + m2v2(final)
     * The second equation comes from the Coef. of restitution:
     * 2: C = ( v2(final) - v1(final) ) 
     *        / ( v1 - v2)
     *        
     */
    function collideCarts(){
      // constants
      const mass1 = self.cart1.mass.value
      const mass2 = self.cart2.mass.value
      const velocity1 = self.cart1.velocity.value
      const velocity2 = self.cart2.velocity.value
      const initialMomentum = ( mass1 * velocity1 )
                            + ( mass2 * velocity2 );

      const differenceInVelocity = velocity2 - velocity1 ;
      const restitution = self.restitution;

      /**
       * Since, the system is isolated, we can use the conservation of momentum
       * as our first equation:
       * 1: m1v1 + m2v2 = m1v1(final) + m2v2(final)
       * The second equation comes from the Coef. of restitution:
       * 2: C = ( v2(final) - v1(final) ) 
       *        / ( v1 - v2)
       *
       * In the first equation solve for v1(final)
       * m1v1 + m2v2 = m1v1(final) + m2v2(final)
       * this yilds our new first equation
       * 1: v1(final)  =  ( initalMomentum - m2v2(final) )
       *                  / m1
       * ( initial momentum is m1v1 + m2v2 )
       *
       * Using the restitution equation, we solve for v2(final) 
       * 
       *  C = ( v2(final) - v1(final) ) 
       *      / ( v1 - v2)
       *  C(v1 - v2) = ( v2(final) - v1(final) ) 
       *
       * v2Final = C(v1 - v2) + v1(final)
       *
       * since difference in veolcities = v2 - v1, 
       * v1-v2 = -1*differenceInVelocities
       *
       * 2: v2Final = c( -differenceInVelocities ) + v1(final)
       *
       * Now, we subsitute v1(final) into the second equation:
       *
       * v2Final = C( -differenceInVelocities ) + v1(final)
       * sub:
       * v2Final = C( -differenceInVelocities ) + ( initalMomentum - m2v2(final) ) / m1
       *
       * multiply by m1:
       * v2Final * m1 = C(-differenceInVelocities)m1 + initalMomentum - m2v2(final)
       *
       * add m2v2(final)
       * v2Final * m1 + m2v2(final) = C(-differenceInVelocities)m1 + initalMomentum 
       *
       * factor
       * v2Final( m1 + m2 ) = C(-differenceInVelocities)m1 + initalMomentum 
       * ...
       * v2Final =  ( initalMomentum + C(-differenceInVelocities)* m1 )
       *            / ( m1 + m2 )
       * We use a similar pattern to solve for v1Final witch ends up being:
       *
       * v1Final =  ( initalMomentum + C(differenceInVelocities )* m2 )
       *            / ( m1 + m2 )
       */

      let newVelocity1 = ( initialMomentum + mass2 * restitution * differenceInVelocity ) 
                        / (mass1 + mass2)

      let newVelocity2 = ( initialMomentum + mass1 * restitution * -1 * differenceInVelocity ) 
                         / (mass1 + mass2)
      // set new velocities
      self.cart2.velocity.value = newVelocity2;
      self.cart1.velocity.value = newVelocity1;
      // calculate new change x
      self.calculateVelocties();
    }

    
  }
  /**
   * Restores the initial locations of the cart. This method is called when the 
   * simulation "Reset Run" button is pressed. 
   * @public
   */
  // resetRun(){
  //   // reset the locations
  //   this.cart1.resetLocation();
  //   this.cart2.resetLocation();
  //   // new run 
  //   this.newRun = true;
  //   // pause
  //   this.isPlaying.value = false;
  // }

  /**
   * Restores everything. This method is called when the 
   * simulation "Reset All" button is pressed. 
   * @public
   */
  resetAll(){
    // reset the locations
    this.cart1.reset();
    this.cart2.reset();
    // pause
    this.isPlaying.value = false;
  }

  calculateVelocties(){
    const pixelsPerMeter = 80;
    const millisecondsPerSecond = 1000;
    // go from meters per second to pixels per millisecond
    // m/s * ( 80px / m ) * ( s / 1000 ms ) dimensional analysis
    this.cart1.changeX = this.cart1.velocity.value 
                        * pixelsPerMeter 
                        / millisecondsPerSecond;
    // since its the other direction, multiple by -1
    this.cart2.changeX = this.cart2.velocity.value 
                        * pixelsPerMeter 
                        / millisecondsPerSecond;
  }

  getOtherCart( cart ){
    if ( cart == this.cart1 ) return this.cart2
    if ( cart == this.cart2 ) return this.cart1
  }

}