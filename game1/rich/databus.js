import Pool from './base/pool'

let instance

//状态管理
export default class DataBus {
  constructor() {
    if ( instance ) 
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame = 0
    this.price = 0
    this.animations = []
    this.redPackage = []
    this.gameOver = false
  }

  /**
   * 回收红包 
   * @param {*} redPackage 
   */
  removeRedPackage(redPackage) {
    let temp = this.redPackage.shift()

    temp.visible = false

    this.pool.recover('redpackage', redPackage)
  }


}
