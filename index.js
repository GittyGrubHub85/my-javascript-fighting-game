const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = .2
class Sprite{
	constructor({position, velocity, color = 'red'}){
		this.position = position
		this.velocity = velocity
		this.width = 50
		this.height = 150
		this.lastKey
		this.attackBox = {
			position: this.position,
			width: 100,
			height: 50,
		}
		this.color = color
		this.isAttacking
	}

	draw(){
		c.fillStyle = this.color
		c.fillRect(this.position.x,this.position.y,this.width,this.height)

		// attack box
		c.fillStyle = 'green'
		c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
	}

	update(){
		this.draw()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + this.velocity.y >= canvas.height){
			this.velocity.y = 0
		} else this.velocity.y += gravity

	}

	attack(){
		this.isAttacking = true
		setTimeout(() => {
			this.isAttacking = false
		}, 100)
	}
}

//OOP is it allows you to change individual properties independent from one another.

const player = new Sprite({
	position:{
		x: 0,
		y: 0
	},
	velocity: {
		x: 0,
		y: 30
	}
})


const enemy = new Sprite({
	position:{
		x: 400,
		y: 100
	},
	velocity: {
		x: 0,
		y: 30
	},
	color: 'blue'
})


console.log(player)

const keys = {
	a:{
		pressed: false
	},
	d:{
		pressed: false
	},
	ArrowLeft:{
		pressed: false
	},
	ArrowRight:{
		pressed: false
	}
}
let lastKey

function animate(){
	this.speed = 5
	window.requestAnimationFrame(animate)
	c.fillStyle = 'black'
	c.fillRect(0,0,canvas.width,canvas.height)
	player.update()
	enemy.update()

	player.velocity.x = 0
	enemy.velocity.x = 0

	//player movement
	if (keys.a.pressed && lastKey == 'a'){
		player.velocity.x = -this.speed
		
	}else if (keys.d.pressed && lastKey == 'd'){
		player.velocity.x = this.speed
	}


	//enemy movement
	if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
		enemy.velocity.x = -this.speed
	}else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
		enemy.velocity.x = this.speed
	}

	//detect for collision
	if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
		player.attackBox.position.x <= enemy.position.x + enemy.width &&
		player.attackBox.position.y+ player.attackBox.height >= enemy.position.y &&
		player.attackBox.position.y <= enemy.position.y + enemy.height &&
		player.isAttacking){
		console.log('coll')
	}
}

animate()

window.addEventListener('keydown', (event) => {
	switch(event.key){
		case 'd':
			keys.d.pressed = true
			lastKey = 'd'
		break
		case 'a':
			keys.a.pressed = true
			lastKey = 'a'
		break
		case 'w':
			player.velocity.y = -10
		break
		case ' ':
			player.attack()
		break


		case 'ArrowRight':
			keys.ArrowRight.pressed = true
			enemy.lastKey = 'ArrowRight'

		break
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true
			enemy.lastKey = 'ArrowLeft'
		break
		case 'ArrowUp':
			enemy.velocity.y = -10
		break
	}
	console.log(event.key)
})

window.addEventListener('keyup', (event) => {
	switch(event.key){
		case 'd':
			keys.d.pressed = false
		break
		case 'a':
			keys.a.pressed = false
		break

		case 'ArrowRight':
			keys.ArrowRight.pressed = false
		break
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false
		break
	}
	console.log(event.key)
})

