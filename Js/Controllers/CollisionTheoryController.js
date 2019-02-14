/**
 * Learning App
 * CController.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/12/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * ## Functionality:
 *  - create instance of view and the view.
 *  - tell the view to render the basic structure
 */

'use strict';
// import modules
import CollisionTheoryView from "../Views/CollisionTheoryView.js";

/**
 * @public 
 * provide a class for outside modules
 */
export default class Controller {
  /**
   * @public 
   * @constructor
   * create the instance of the view and the model.
   */
  constructor(){
    // create the instances for the view 
    this.view = new CollisionTheoryView(); 
    let cart1Panel = this.view.addControlPanel({
      left: "50px",
      top: "20px",
      border: "1px solid orange"
    });
    let cart2Panel = this.view.addControlPanel({
      left: 50 * 2 + 250 + "px",
      top: "20px",
      border: "1px solid orange"
    });
    let controlPanel = this.view.addControlPanel({
      right: "50px",
      height: "300px",
      top: "20px",
      border: "3px solid orange"
    });
    this.view.addButtonToControlPanel({
      text: "ASDFASDF",
      style: {
        border: "2px solid red",
        height: "500px",
        width: "200px"
      },
      hoverStyle: {
          border: "2px solid black"
      },
      parent: controlPanel,
      listener: function(){
        console.log( "aehrawehraehwrawherhawerh" )
      }
    });
  }
  /**
   * @public 
   * render the basic view 
   */
  run(){
    // this.renderBasics()
  }

}

