import type { CollisionBlock } from './collisionBlock.models'
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

  constructor({
    collisionBlocks,
    initialPosition,
    spriteSrc,
  }: {
    collisionBlocks: CollisionBlock[]
    initialPosition: { x: number; y: number }
    spriteSrc: string
  }) {
    super({ position: initialPosition, spriteSrc, frameRate: 4 })
    this.width = 20
    this.height = 20
    this.position = initialPosition
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.gravity = 1.3
    this.collisionBlocks = collisionBlocks
    this.hitbox = { position: { x: this.position.x, y: this.position.y }, width: 0, height: 0 }
  }

  update(): void {
    this.position.x += this.velocity.x

    this.updateHitbox()

    this.checkForHorizontalCollisions()
    this.applyGravity()

    this.updateHitbox()

    this.checkForVerticalCollisions()
  }

  updateHitbox(): void {
    this.hitbox = {
      position: {
        x: this.position.x + 7,
        y: this.position.y + 14,
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
