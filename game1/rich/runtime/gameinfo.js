const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/btn.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
  }

  renderGameOver(ctx, score) {
    //ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    this.drawImage(ctx, atlas, 750, 1334)
    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    if(score == 0) {
      ctx.fillText(
        score == 0 ? "继续努力" : '¥: ' + score,
        screenWidth / 2 - 40,
        screenHeight / 2 + 100
      )
    }else {
      ctx.fillText(
        score == 0 ? "再接再厉" : '¥: ' + score,
        screenWidth / 2 - 20,
        screenHeight / 2 + 100
      )
    }
   

    // ctx.drawImage(
    //   atlas,
    //   120, 6, 39, 24,
    //   screenWidth / 2 - 60,
    //   screenHeight / 2 - 100 + 180,
    //   120, 40
    // )

    // ctx.fillText(
    //   '重新开始',
    //   screenWidth / 2 - 40,
    //   screenHeight / 2 + 175
    // )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 250,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 330
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
