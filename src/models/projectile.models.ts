import type { CollisionBlock } from './collisionBlock.models'

interface IProjectileProps {
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  shootDirection: 'right' | 'left'
}
export class Projectile {
  public width: number
  public height: number
  public position: { x: number; y: number }
  public velocity: { x: number; y: number }
  public shootDirection: 'right' | 'left'
  public bullet: HTMLImageElement
  public muzzleFlash: HTMLImageElement

  constructor({ position, velocity, shootDirection }: IProjectileProps) {
    this.width = 32
    this.height = 32
    this.position = position
    this.velocity = velocity
    this.shootDirection = shootDirection
    this.bullet = new Image()
    this.bullet.src = '/src/assets/sprites/robocop/bullet.png'
    this.muzzleFlash = new Image()
    this.muzzleFlash.src = '/src/assets/sprites/robocop/muzzle-flash.png'
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.shootDirection === 'right') {
      ctx.drawImage(this.bullet, this.position.x + this.width, this.position.y)
    }

    if (this.shootDirection === 'left') {
      ctx.save()
      ctx.scale(-1, 1)

      ctx.drawImage(this.bullet, -this.position.x, this.position.y)
      ctx.restore()
    }
  }

  public update(): void {
    const directionMultiplier =
      this.shootDirection === 'right' ? 1 : this.shootDirection === 'left' ? -1 : 0

    this.position.x += this.velocity.x * directionMultiplier
  }

  public showMuzzleFlash(ctx: CanvasRenderingContext2D): void {
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

  public isOutOfBounds(canvasWidth: number, canvasHeight: number): boolean {
    return (
      this.position.x + this.width < 0 ||
      this.position.x > canvasWidth ||
      this.position.y + this.height < 0 ||
      this.position.y > canvasHeight
    )
  }

  public checkForHorizontalCollisions(collisionBlocks: CollisionBlock[]): boolean {
    for (const collisionBlock of collisionBlocks) {
      if (
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.y >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      )
        return true
    }
    return false
  }
}
