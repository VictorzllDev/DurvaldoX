import { CollisionBlock } from '../models/collisionBlock.models'
import { parse2D } from './parse2D.utils'

export function parsedCollisions(collisions: number[]) {
  const collisionsBlocks: CollisionBlock[] = []

  const parsedCollisions = parse2D(collisions)
  parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 292) {
        collisionsBlocks.push(
          new CollisionBlock({
            position: {
              x: x * 32,
              y: y * 32,
            },
          }),
        )
      }
    })
  })

  return collisionsBlocks
}
