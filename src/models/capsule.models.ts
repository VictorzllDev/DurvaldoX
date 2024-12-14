import type { CollisionBlock } from './collisionBlock.models'

interface CapsuleProps {
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  shootDirection: 'right' | 'left'
  gravity: number
  collisionBlocks: CollisionBlock[]
}

export class Capsule {
  width: number
  height: number
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  shootDirection: 'right' | 'left'
  gravity: number
  collisionBlocks: CollisionBlock[]

  constructor(props: CapsuleProps) {
    this.width = 1
    this.height = 1
    this.position = props.position
    this.velocity = props.velocity
    this.shootDirection = props.shootDirection
    this.gravity = props.gravity
    this.collisionBlocks = props.collisionBlocks

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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ffeb00'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(): void {
    this.position.x += this.velocity.x
    this.velocity.x *= this.gravity

    this.checkForHorizontalCollisions()

    this.applyGravity()

    this.checkForVerticalCollisions()
  }

  checkForHorizontalCollisions(): void {
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

  applyGravity(): void {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions(): void {
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
