import Phaser from 'phaser';

class Balloon extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'balloon');
    this.anchor.setTo(0.5);
    this.scale = {x: 0.25, y: 0.25};
    this.tint = Math.random() * 0xffffff; // Random colour tint.
    game.physics.p2.enable(this); // Add true for debug.
    this.body.setCircle(55);
  }

  update() {
    //this.angle += 1;
  }
  
  pop() {
    //console.log('pop!');
    
    // Particles
    const emitter = game.add.emitter(this.position.x, this.position.y, 10);
    emitter.makeParticles('star');
    emitter.minParticleScale = 0.01;
    emitter.maxParticleScale = 0.05;
    emitter.setAngle(180, 360, 50, 100);

    emitter.forEach(function(particle) {
      particle.tint = Math.random() * 0xffffff;
    });

    emitter.start(true, 5000, 0, 10);
    
    this.destroy();
  }
}

export default Balloon;