export class Sprite {
  position: { x: number; y: number }
  spriteSrc: string
  image: HTMLImageElement
  loaded: boolean

  constructor({ position, spriteSrc }: { position: { x: number; y: number }; spriteSrc: string }) {
    this.position = position
    this.spriteSrc = spriteSrc
    this.loaded = false
    this.image = new Image()
    this.image.src = spriteSrc
    this.image.onload = () => {
      this.loaded = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return
    ctx?.drawImage(this.image, this.position.x, this.position.y)
  }
}
