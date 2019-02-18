/**
 * Learning App
 * CollisionTheory.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 1/31/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Top-level file that creates the sim
 * Main entry point for the sim.
 *
 */

"use strict";

import Model from "./Models/CollisionTheoryModel.js";
import View from "./Views/CollisionTheoryView.js";

// modules

// create the model
var collisionTheoryModel = new Model(); 

var sim = {
  backgroundSrc: "../CollisionTheory/assets/flatiron.png",
  home: "../sims",
  title: "Collision Theory",
  author: "Brandon Li",
};

// create the view
var CollisionTheoryView = new View( sim, collisionTheoryModel )
;
