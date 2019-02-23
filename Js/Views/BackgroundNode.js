/**
 * Portfolio
 * BackgroundNode.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/22/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This is the view for the background
 *
 */


import Node from "../../../Screen/Node.js";

export default class BackgroundNode {
  /**
   * Set up the background Node
   * @constructor
   * @return {node} the background node
   */
  constructor(){
    // the overall container for the 
    var background = new Node({
      style: {
        width: "100%",
        height: "100%",
        margin: "0",
        padding:"0"
      }
    })
    // the flatiron image
    var flatirons = new Node({
      type: "img",
      src: "../CollisionTheory/assets/flatiron.png",
      style: {
        bottom: "15%", 
        width: "100%",
        height: "85%",
        position: "absolute",
      }
    }) 

    // the dirt
    var dirt = new Node({
      type: "img",
      src: "../CollisionTheory/assets/dirt.png",
      style: {
        width: "100%",
        height: "20%", // overlaps the flations
        bottom: 0,
        position: "absolute",
      }
    })
    // both bars
    var bar1 = new Node({
      type: "img",
      src: "../CollisionTheory/assets/metalBar.png",
      style: {
        width: "74px", // fixed
        height: "25%",
        left: "25%", 
        bottom: "5%", // in the dirt
        position: "absolute",
      }
    })
    var bar2 = new Node({
      type: "img",
      src: "../CollisionTheory/assets/metalBar.png",
      style: {
        width: "74px",
        height: "25%",
        right: "25%",
        bottom: "5%",
        position: "absolute",
      }
    });
    // the street
    var street = new Node({
      type: "img",
      src: "../CollisionTheory/assets/street.png",
      style: {
        width: "100%",
        height: "3%",
        right: "0",
        bottom: "28%",
        position: "absolute",
      }
    });

    // rendering order
    background.appendChildren([
      flatirons,
      dirt,
      bar1,
      bar2,
      street
    ]);
    return background;
  }
}

