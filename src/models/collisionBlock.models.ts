export class CollisionBlock {
  public position: { x: number; y: number }
  public width: number
  public height: number

  constructor({ position }: { position: { x: number; y: number } }) {
    this.position = position
    this.width = 32
    this.height = 32
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
