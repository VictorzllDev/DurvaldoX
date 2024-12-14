interface IScenarioProps {
  position: { x: number; y: number }
  imageSrc: string
}

export class Scenario {
  public position: { x: number; y: number }
  public imageSrc: string
  public image: HTMLImageElement
  public loaded: boolean

  constructor({ position, imageSrc }: IScenarioProps) {
    this.position = position
    this.imageSrc = imageSrc
    this.loaded = false
    this.image = new Image()
    this.image.src = imageSrc
    this.image.onload = () => {
      this.loaded = true
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}
