/**
 * Portfolio
 * PlayButtonNode.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/23/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This is the play/pause button
 *
 */
"use strict";

import Node from "../../../Screen/Node.js";
import ImageButton from "../../../Buttons/ImageButton.js";


export default class PlayButtonNode {
  /**
   * Set up the play/pause button
   * @param {model} model for the sim
   * @constructor
   * @return {array} - [ playButtonNode, pauseButtonNode ]
   */
  constructor( model ){
    let playButton = new ImageButton({
      style: {
        position: "absolute",
        bottom: "4%",
        boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
        borderRadius: "50%",
        height: "14%",
        position: "absolute",
        left: "50%",
        transform: "translate( -50%, 0 )"
      },
      src: "./assets/playButton.png",
      hover: "./assets/playButtonHover.png",
      listener: function(){
        model.isPlaying.value = true; // now play
        model.run()
      }
    });

    let pauseButton = new ImageButton({
      style: {
        position: "absolute",
        left: "50%",
        transform: "translate( -50%, 0 )",
        bottom: "5%",
        boxShadow:  "0 0 3px 0 rgb( 40, 40, 40 )",
        borderRadius: "50%",
        padding: 0,
        height: "12%",
      },
      src: "./assets/pauseButton.png",
      hover: "./assets/pauseButtonHover.png",
      listener: function(){
        model.isPlaying.value = false; // now pause
      }
    } );



    // set the default button
    // since it is paused, show the play button
    if ( !model.isPlaying.value ) 
      pauseButton.node.setStyle({ display: "none" });

    // add a listener to the model isPlaying, when the model isplaying is 
    // changed update the buttons
    model.isPlaying.setListener( function( newValue ){
      if ( newValue === false ){ // now paused, show play button
        pauseButton.node.setStyle({
          display: "none"
        })
        playButton.node.setStyle({
          display: ""
        });
      }
      else if ( newValue ===  true ){
        pauseButton.node.setStyle({
          display: ""
        })
        playButton.node.setStyle({
          display: "none"
        });
      }
    } )
    return [ playButton, pauseButton ]
  }
}