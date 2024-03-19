// import Image from 'next/image'


export const INTERVAL = 20
export const CANVAS_HEIGHT = 450
export const CANVAS_WIDTH = 300


// ------CLOUDS SECTION------
export const CLOUDS = new Image()
CLOUDS.src = "./clouds.png"
export const CLOUDS_WIDTH = 300
export const CLOUDS_HEIGHT = 280
export const CLOUDS_Y = 0
export const CLOUDS_X = 0

// -----BIRDS SECTION-----
export const BIRD = new Image()
BIRD.src = "./kettle.png"
export const BIRD_WIDTH = 50
export const BIRD_HEIGHT = 50



// -----GROUND SECTION------
export const GROUND = new Image()
GROUND.src="./ground.png"
export const GROUND_WIDTH = CANVAS_WIDTH
export const GROUND_HEIGHT = 200
export const GROUND_Y = CANVAS_HEIGHT - GROUND_HEIGHT
export const GROUND_X = 59

// -----PIPES SECTION------
export const PIPE_WIDTH = 40
export const PIPE_HEIGHT = CANVAS_HEIGHT / 2
export const PIPE_GAP = CANVAS_HEIGHT / 2 - GROUND_HEIGHT - 50

// -----MOVEMENTS SECTION -----
export const JUMP_SPEED = -200
export const FALL_SPEED = -400
export const SPEED = 2


