import Animation from '../base/animation';
import DataBus from '../databus';

const RED_SRC = 'images/red.png'
const RED_WIDTH = 140
const RED_HEIGHT =  140

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus();

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

function price () {
  let price = Math.floor((Math.random() * 10) + 1);
  return price % 3 === 0 ? price : 0;
}

export default class RedPackage extends Animation {
  constructor(ctx) {
    super(RED_SRC, RED_WIDTH, RED_HEIGHT)
    
    this.initEvent()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - RED_WIDTH)
    this.y = -this.height
    this.price = price()

    this[__.speed] = speed


    this.visible = true
  }

  update() {
    this.y += this[__.speed]
    this.isArea(this.clickX, this.clickY)
    if ( this.y > window.innerHeight + this.height ) {
      databus.removeRedPackage(this)
    }
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()
      this.clickX = e.touches[0].clientX
      this.clickY = e.touches[0].clientY
    }).bind(this))
  }

  isArea(x, y) {
    let maxWidth = this.x + RED_WIDTH
    let maxHeight = this.y + RED_HEIGHT

    if( x > this.x && x < maxWidth  &&  y > this.y && y < maxHeight) {
      if(databus.gameOver == false) {
        databus.gameOver = true
        databus.price = this.price
      }
    }
  }
}