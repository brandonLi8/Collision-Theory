/**
 * Learning App
 * MainView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/25/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Functionality:
 *  - display the view for the sim
 */
'use strict';
// import modules
import ScreenView from "../../../Screen/ScreenView.js";
import Node from "../../../Screen/Node.js";
// modules

export default class View {
  /**
   * set up the basic structure.
   */
  constructor(){ 
    this.simWrapper = new Node({
      id: "sim_wrapper", 
      text: null, // @optional null means no text, otherwise use a string
    });

    this.footer = new Node({
      id: "footer",
    });

    this.simWrapper.appendChildren([ this.footer ])

    this.screenView = new ScreenView( this.simWrapper )

    // this.footer = screen.addChildToParentType(
    //               "div", "footer", null, "", "body"
    // );
    
  }
  addImageToFooter( id ){
    let image = screen.addChildToParentNode( 
                  "img", id, 
                  null, "", this.footer );
    // controller sets up event listeners
    return image;
  }
  addTextToFooter( text, id ){
    let textNode = screen.addChildToParentNode( 
                  "div", id, 
                  null, text, this.footer );
    // controller sets up event listeners
    return textNode;
  }
  /**
   * add a control planner to the view // this is just the background 
   * @public
   * @param { options } - different attributes {
      
   }
   */
  addControlPanel( options ){

  }

}



