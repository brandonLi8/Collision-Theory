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
import ScreenView from "../../../Screen/ScreenView.js";
import Node from "../../../Screen/Node.js";
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
    // create intance of the view
    this.view = new CollisionTheoryView(); 
    // the panel for the first cart
    let cart1Panel = this.view.addControlPanel({
      left: "50px",
      top: "20px",
      border: "1px solid orange"
    });
    // the panel for the second car
    let cart2Panel = this.view.addControlPanel({
      left: 50 * 2 + 250 + "px",
      top: "20px",
      border: "1px solid orange"
    });
    // the main control panel
    let controlPanel = this.view.addControlPanel({
      right: "50px",
      height: "300px",
      top: "20px",
      border: "3px solid orange"
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

