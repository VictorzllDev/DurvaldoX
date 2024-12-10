export class Sprite {
  position: { x: number; y: number }
  image: HTMLImageElement
  width: number
  height: number
  loaded: boolean
  frameRate: number
  currentFrame: number
  elapsedFrames: number
  frameBuffer: number

  constructor({
    position,
    spriteSrc,
    frameRate,
  }: {
    position: { x: number; y: number }
    spriteSrc: string
    frameRate: number
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
    this.frameRate = frameRate
    this.currentFrame = 0
    this.elapsedFrames = 10
    this.frameBuffer = 5
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    }

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
