import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg3.jpg'
const BG_WIDTH = screenWidth
const BG_HEIGHT = screenHeight

export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 20

    this.render(ctx)
  }

  render(ctx) {
    this.drawImage(ctx, this.img, 500, 743)
    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   0,
    //   screenWidth,
    //   screenHeight
    // )
    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   this.top,
    //   screenWidth,
    //   screenHeight
    // )
  }

  update() {
    this.top += 2

    if ( this.top >= screenHeight) {
      this.top = 0
    }
  }

  drawImage(ctx, imgPath, imgWidth, imgHeight) {
    let bg_w = screenWidth;
    let bg_h = screenHeight;
    let dWidth = bg_w/imgWidth;  // canvas与图片的宽度比例
    let dHeight = bg_h/imgHeight;  // canvas与图片的高度比例
    if (imgWidth > bg_w && imgHeight > bg_h || imgWidth < bg_w && imgHeight < bg_h) {
      if (dWidth > dHeight) {
        ctx.drawImage(imgPath, 0, (imgHeight - bg_h/dWidth)/2, imgWidth, bg_h/dWidth, 0, 0, bg_w, bg_h)
      } else {
        ctx.drawImage(imgPath, (imgWidth - bg_w/dHeight)/2, 0, bg_w/dHeight, imgHeight, 0, 0, bg_w, bg_h)
      }
    } else {
      if (imgWidth < bg_w) {
        ctx.drawImage(imgPath, 0, (imgHeight - bg_h/dWidth)/2, imgWidth, bg_h/dWidth, 0, 0, bg_w, bg_h)
      } else {
        ctx.drawImage(imgPath, (imgWidth - bg_w/dHeight)/2, 0, bg_w/dHeight, imgHeight, 0, 0, bg_w, bg_h)
      }
    }
  }
}