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
import CollisionTheoryView from "../Views/MainView.js";


// create the instances for the view 
var view = new CollisionTheoryView(); 

/**
 * @public 
 * provide a class for outside modules
 */
export default class Controller {
  
  /**
   * @public 
   * render the basic view 
   */
  run(){
    this.renderBasics()
  }

  renderBasics(){
    let home = view.addImageToFooter( "home" );
    home.setAttribute( "src", "./assets/home.png" );
    // handle user input
    home.onmouseover = function() { 
      home.setAttribute( "src", "./assets/homeHover.png" );
    };
    home.onmouseout = function() { 
      home.setAttribute( "src", "./assets/home.png" );
    };
    view.addControlPanel();


    let title = view.addTextToFooter( "Collision Theory", "title" );
  }
}

