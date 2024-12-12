import type { CollisionBlock } from './collisionBlock.models'
import { Projectile } from './projectile.models'
import { Sprite } from './sprite.models'

export class Player extends Sprite {
  public width: number
  public height: number
  public position: { x: number; y: number }
  public sides: { bottom: number }
  public velocity: { x: number; y: number }
  public gravity: number
  public collisionBlocks: CollisionBlock[]
  public hitbox: { position: { x: number; y: number }; width: number; height: number }
  public lastDirection: 'right' | 'left'
  public projectiles: Projectile[]
  public canShoot: boolean

  constructor({
    collisionBlocks,
    initialPosition,
    spriteSrc,
    animations,
  }: {
    collisionBlocks: CollisionBlock[]
    initialPosition: { x: number; y: number }
    spriteSrc: string
    animations: {
      name: string
      frameRate: number
      frameBuffer: number
      frameIndex: number
      frameReverse: boolean
      loop: boolean
    }[]
  }) {
    super({ position: initialPosition, spriteSrc, animations })
    this.width = 32
    this.height = 32
    this.position = initialPosition
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.gravity = 0.8
    this.collisionBlocks = collisionBlocks
    this.hitbox = { position: { x: this.position.x, y: this.position.y }, width: 0, height: 0 }
    this.lastDirection = 'right'
    this.projectiles = []
    this.canShoot = true
  }

  update(ctx: CanvasRenderingContext2D): void {
    this.position.x += this.velocity.x

    this.updateHitbox()

    this.checkForHorizontalCollisions()
    this.applyGravity()

    this.updateHitbox()

    this.checkForVerticalCollisions()

    this.updateProjectiles(ctx)
  }

  updateProjectiles(ctx: CanvasRenderingContext2D): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i]
      projectile.draw(ctx)
      projectile.update()

      if (projectile.isOutOfBounds(ctx.canvas.width, ctx.canvas.height)) {
        this.projectiles.splice(i, 1)
      }
    }
  }

  shoot(): void {
    if (this.elapsedFrames % this.frameBuffer !== 0) return
    if (this.currentFrame !== this.frameRate - 1) return

    const shoot = new Projectile({
      position: { x: this.position.x, y: this.position.y + 21 },
      velocity: { x: this.frameRate * 2, y: 0 },
      shootDirection: this.lastDirection,
    })

    this.projectiles.push(shoot)
  }

  switchSprite(name: string): void {
    const animation = this.animations.find((animation) => animation.name === name)

    if (!animation) return
    const { frameIndex, frameRate, frameBuffer, frameReverse } = animation

    if (this.frameIndex === frameIndex && this.frameReverse === frameReverse) return
    this.currentFrame = 0

    this.frameIndex = frameIndex
    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.frameReverse = frameReverse
  }

  updateHitbox(): void {
    this.hitbox = {
      position: {
        x: this.position.x + 7,
        y: this.position.y + 13,
      },
      width: 18,
      height: 18,
    }
  }

  checkForHorizontalCollisions(): void {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
        if (this.velocity.x > 0) {
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collisionBlock.position.x - offset - 0.01
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
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}
