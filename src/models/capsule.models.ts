import type { CollisionBlock } from './collisionBlock.models'

interface CapsuleProps {
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  shootDirection: 'right' | 'left'
  gravity: number
  collisionBlocks: CollisionBlock[]
}

export class Capsule {
  public width: number
  public height: number
  public position: { x: number; y: number }
  public velocity: { x: number; y: number }
  public shootDirection: 'right' | 'left'
  public gravity: number
  public collisionBlocks: CollisionBlock[]

  constructor({ position, velocity, shootDirection, gravity, collisionBlocks }: CapsuleProps) {
    this.width = 1
    this.height = 1
    this.position = position
    this.velocity = velocity
    this.shootDirection = shootDirection
    this.gravity = gravity
    this.collisionBlocks = collisionBlocks

    this.initVelocity()
  }

  private initVelocity() {
    this.velocity.x += Math.random() * 3
    if (this.shootDirection === 'left') {
      this.velocity.x *= 1
    } else if (this.shootDirection === 'right') {
      this.velocity.x *= -1
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ffeb00'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  public update(): void {
    this.position.x += this.velocity.x
    this.velocity.x *= this.gravity

    this.checkForHorizontalCollisions()

    this.applyGravity()

    this.checkForVerticalCollisions()
  }

  private checkForHorizontalCollisions(): void {
    for (const collisionBlock of this.collisionBlocks) {
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          this.velocity.x = 0
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + Math.random() * 5 + 0.01
          break
        }
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          this.position.x = collisionBlock.position.x - this.width - Math.random() * 5 - 0.01
          break
        }
      }
    }
  }

  private applyGravity(): void {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  private checkForVerticalCollisions(): void {
    for (const collisionBlock of this.collisionBlocks) {
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          break
        }
      }
    }
  }
}
