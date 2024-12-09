export class Player {
  public width: number
  public height: number
  public position: { x: number; y: number }
  public sides: { bottom: number }
  public velocity: { x: number; y: number }
  public gravity: number

  constructor() {
    this.width = 50
    this.height = 50
    this.position = { x: 100, y: 100 }
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.gravity = 1.3
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(canvas: HTMLCanvasElement): void {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.sides.bottom = this.position.y + this.height

    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity
    } else {
      this.velocity.y = 0
    }
  }
}
