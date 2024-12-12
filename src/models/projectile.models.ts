export class Projectile {
  width: number
  height: number
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  shootDirection: 'right' | 'left'

  constructor({
    position,
    velocity,
    shootDirection,
  }: {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    shootDirection: 'right' | 'left'
  }) {
    this.width = 4
    this.height = 2
    this.position = position
    this.velocity = velocity
    this.shootDirection = shootDirection
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#f9f48e'

    if (this.shootDirection === 'right') {
      ctx.fillRect(this.position.x + 31, this.position.y + 20, this.width, this.height)
    }

    if (this.shootDirection === 'left') {
      ctx.fillRect(this.position.x - 2, this.position.y + 20, this.width, this.height)
    }
  }

  update(): void {
    const directionMultiplier = this.shootDirection === 'right' ? 1 : -1
    this.position.x += this.velocity.x * directionMultiplier
  }

  isOutOfBounds(canvasWidth: number, canvasHeight: number): boolean {
    return (
      this.position.x + this.width < 0 ||
      this.position.x > canvasWidth ||
      this.position.y + this.height < 0 ||
      this.position.y > canvasHeight
    )
  }
}
