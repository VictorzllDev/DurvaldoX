import { CollisionBlock } from '../models/collisionBlock.models'
import { parse2D } from './parse2D.utils'

export function parsedCollisions(collisions: number[], blockCountPerRow: number) {
  const collisionsBlocks: CollisionBlock[] = []

  const parsedCollisions = parse2D(collisions, blockCountPerRow)

  parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol) {
        collisionsBlocks.push(
          new CollisionBlock({
            position: {
              x: (x - 1) * 32,
              y: (y - 1) * 32,
            },
          }),
        )
      }
    })
  })

  return collisionsBlocks
}
