export class Projectile {
  width: number
  height: number
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  shootDirection: 'right' | 'left'
  bullet: HTMLImageElement
  muzzleFlash: HTMLImageElement

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
    this.bullet = new Image()
    this.bullet.src = '/src/assets/sprites/robocop/bullet.png'
    this.muzzleFlash = new Image()
    this.muzzleFlash.src = '/src/assets/sprites/robocop/muzzle-flash.png'
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.shootDirection === 'right') {
      ctx.drawImage(this.bullet, this.position.x + 32, this.position.y)
    }

    if (this.shootDirection === 'left') {
      ctx.save()
      ctx.scale(-1, 1)

      ctx.drawImage(this.bullet, -this.position.x, this.position.y)
      ctx.restore()
    }
  }

  update(): void {
    const directionMultiplier =
      this.shootDirection === 'right' ? 1 : this.shootDirection === 'left' ? -1 : 0

    this.position.x += this.velocity.x * directionMultiplier
  }

  showMuzzleFlash(ctx: CanvasRenderingContext2D): void {
    if (this.shootDirection === 'right') {
      ctx.drawImage(this.muzzleFlash, this.position.x + 32, this.position.y - 4)
    }

    if (this.shootDirection === 'left') {
      ctx.save()
      ctx.scale(-1, 1)

      ctx.drawImage(this.muzzleFlash, -this.position.x, this.position.y - 4)
      ctx.restore()
    }
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
