import { collisionsBlocks } from './assets/maps/map_01/collisions'
import { Player } from './models/player.models'
import { Sprite } from './models/sprite.models'
import './style.css'

const canvas = document.querySelector('canvas')
if (!canvas) throw new Error('Error canvas')

const ctx = canvas.getContext('2d')
if (!ctx) throw new Error('Error ctx')

canvas.width = 32 * 16
canvas.height = 32 * 9

const map01 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: '/src/assets/maps/map_01/map.png',
})

const player = new Player()

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  map01.draw(ctx)
  for (let i = 0; i < collisionsBlocks.length; i++) {
    collisionsBlocks[i].draw(ctx)
  }

  player.velocity.x = 0
  if (keys.a.pressed) player.velocity.x = -4
  if (keys.d.pressed) player.velocity.x = 4

  player.draw(ctx)
  player.update(canvas)

  requestAnimationFrame(loop)
}
loop()

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase()

  switch (key) {
    case 'w':
      if (player.velocity.y === 0) {
        player.velocity.y = -15
      }
      break

    case 'a':
      keys.a.pressed = true
      break

    case 'd':
      keys.d.pressed = true
      break
  }
})

window.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase()

  switch (key) {
    case 'a':
      keys.a.pressed = false
      break

    case 'd':
      keys.d.pressed = false
      break
  }
})
