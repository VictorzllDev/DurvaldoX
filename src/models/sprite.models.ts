export class Sprite {
  position: { x: number; y: number }
  image: HTMLImageElement
  width: number
  height: number
  loaded: boolean
  frameRate: number
  frameBuffer: number
  frameIndex: number
  frameReverse: boolean
  currentFrame: number
  elapsedFrames: number
  animations: {
    name: string
    frameRate: number
    frameBuffer: number
    frameIndex: number
    frameReverse: boolean
    loop: boolean
  }[]

  constructor({
    position,
    spriteSrc,
    animations,
  }: {
    position: { x: number; y: number }
    spriteSrc: string
    animations: {
      name: string
      frameRate: number
      frameBuffer: number
      frameIndex: number
      frameReverse: boolean
      loop: boolean
    }[]
  }) {
    this.position = position
    this.width = 0
    this.height = 0
    this.image = new Image()
    this.image.onload = () => {
      this.loaded = true
      this.width = this.image.width / (this.image.width / 32)
      this.height = this.image.height / (this.image.height / 32)
    }
    this.image.src = spriteSrc
    this.loaded = false
    this.currentFrame = 0
    this.elapsedFrames = 10
    this.animations = animations
    this.frameRate = this.animations[0].frameRate
    this.frameIndex = this.animations[0].frameIndex
    this.frameBuffer = this.animations[0].frameBuffer
    this.frameReverse = this.animations[0].frameReverse
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: this.width * this.frameIndex,
      },
      width: this.width,
      height: this.height,
    }

    if (this.frameReverse) {
      ctx.save()
      ctx.scale(-1, 1)

      ctx.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        -this.position.x - this.width,
        this.position.y,
        this.width,
        this.height,
      )

      ctx.restore()
    } else {
      ctx.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height,
      )
    }

    this.updateFrames()
  }

  updateFrames() {
    this.elapsedFrames++
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++
      else this.currentFrame = 0
    }
  }
}
