export class Sprite {
  position: { x: number; y: number }
  imageSrc: string
  image: HTMLImageElement
  loaded: boolean

  constructor({ position, imageSrc }: { position: { x: number; y: number }; imageSrc: string }) {
    this.position = position
    this.imageSrc = imageSrc
    this.loaded = false
    this.image = new Image()
    this.image.src = imageSrc
    this.image.onload = () => {
      this.loaded = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return
    ctx?.drawImage(this.image, this.position.x, this.position.y)
  }
}
