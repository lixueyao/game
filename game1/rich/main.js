import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import RedPackage from './player/redPackage';
import DataBus from './databus'

//使用adapter创建画布
let ctx = canvas.getContext('2d'); 
//状态管理器
let databus = new DataBus()


export default class Main {
  constructor() {
    this.aniId = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler  //等下绑定事件
    )
 
    //背景图片
    this.bg = new BackGround(ctx)
    this.gameinfo = new GameInfo()
    

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  //游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   *   初始化红包雨
   */
  initRedPacket() {
    if(databus.frame % 20 === 0) {  
       let p = databus.pool.getItemByClass('redpackage', RedPackage)
       p.init(3)
       databus.redPackage.push(p)
    }
  }

  update() {
    if ( databus.gameOver ) 
      return;

    databus.redPackage.forEach( item => {
      item.update()
    })

    this.initRedPacket();
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    databus.redPackage.forEach( item => {
      item.drawToCanvas(ctx)
    })

    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.price)

      if ( !this.hasEventBind ) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

   // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

   let x = e.touches[0].clientX
   let y = e.touches[0].clientY

   let area = this.gameinfo.btnArea

   if (   x >= area.startX
       && x <= area.endX
       && y >= area.startY
       && y <= area.endY  )
     this.restart()
 }

} 