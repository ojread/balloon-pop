/* globals __DEV__ */
import Phaser from 'phaser'

import Balloon from '../sprites/Balloon'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    // banner.font = 'Bangers'
    // banner.padding.set(10, 16)
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.smoothed = false
    // banner.anchor.setTo(0.5)
    
    // Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = -100;
      
    // Create group to hold balloons.
    this.balloons = this.game.add.group();
    
    // Create the sound effect.
    this.pop = this.game.add.audio('pop');
    this.pop.allowMultiple = true;
    
    // Tap event handler.
    this.input.onTap.add(this.handleTap, this);
  }
  
  handleTap(pointer, doubleTap) {
    //console.log(pointer, doubleTap);
    
    // Get physics bodies of existing ballons.
    const bodies = game.physics.p2.hitTest(pointer.position, this.balloons.children);

    // Did we tap on one?
    if (bodies.length === 0) {
      // Create one.
      this.createBalloon(pointer.clientX, pointer.clientY);
    } else {
      // Find the tapped sprite.
      for (let i = 0; i < bodies.length; i++) {
        // The bodies that come back are p2.Body objects.
        // The parent property is a Phaser.Physics.P2.Body which has a property called 'sprite'
        // This relates to the sprites we created earlier.
        // The 'key' property is just the texture name, which works well for this demo but you probably need something more robust for an actual game.
        //this.popBalloon(bodies[i].parent.sprite);
        const balloon = bodies[i].parent.sprite;
        balloon.pop();
        this.pop.play();  // Play audio pop.
      }
    }
  }
  
  createBalloon(x, y) {
    // Create a balloon at the point.
    this.balloons.add(new Balloon({
      game: this.game,
      x: x,
      y: y
    }));
  }
  
  popBalloon(balloon) {
    this.pop.play();  // Play audio pop.
    console.log(balloon);
    //this.createParticles(balloon.position.x, position.pos.y)
    //balloon.destroy();
  }
  
  createParticles(x, y) {
    // Particles
    const emitter = game.add.emitter(x, y, 50);
    emitter.makeParticles('star');
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.25;

    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
}
