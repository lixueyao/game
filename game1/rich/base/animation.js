import Sprite from './sprite'
import DataBus from '../databus'

let databus = new DataBus()

const __ = {
  timer: Symbol('timer')
}

export default class Animation extends Sprite {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height)

    //当前动画是否播放
    this.isPlaying = false

    //动画是否需要循环播放
    this.loop = false

    //每一帧的时间间隔
    this.interval = 1000 / 60

    // 帧定时器
    this[__.timer] = null

    // 当前播放的帧
    this.index = -1

    //总帧数
    this.count = 0

    //帧图片的集合
    this.imgList = []

    databus.animations.push(this)
  }
}