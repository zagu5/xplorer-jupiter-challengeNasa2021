  kaboom({
    global: true,
    fullscreen: true,
    scale: 1.9,
    debug: true,
    clearColor: [0,0,51]
  })
 
  //Speed identifiers
  const MOVE_SPEED = 120
  const JUMP_FORCE = 360
  const BIG_JUMP_FORCE = 550
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  const ENEMY_SPEED = 30
  const FALL_DEATH = 400

  // Game logic
  let isJumping = true
  
  loadRoot('https://i.imgur.com/')
  loadSprite('bg', 'qKona0S.png')
  loadSprite('sample', 'v93pgWa.png')
  loadSprite('sample1', 'NSsPkw0.png')
  loadSprite('sample2', 'KoSieLh.png')
  loadSprite('evil-tornado', 'zKC6rax.png')
  loadSprite('brick', 'pogC9x5.png')
  loadSprite('ground-jupiter', '2DrrRXW.png')
  loadSprite('astronaut', 'tdwbmn9.png')
  loadSprite('antidote', 'D5C793q.png')
  loadSprite('bonus-nube', '5AuICN1.png')
  loadSprite('unboxed', 'No8gXSw.png')
  loadSprite('eddy', 'YEaSi0t.png')
  loadSprite('eddy1', 'JMqD5NC.png')

  loadSprite('bg1', 'rIdnjt2.png')
  loadSprite('bonus-rock', 'W35gFkK.png')
  loadSprite('volcano', 'oo1luMh.png')
  loadSprite('move-rock', 'Gu9ddIK.png')
  loadSprite('ground-io', 'vISj75M.png')
  
  loadSound('OtherworldlyFoe', './sounds/OtherworldlyFoe.mp3');

  scene ("game", ({ level, score })=> {
    layers(['bg','obj', 'ui'], 'obj')

    const maps = [
    [
      '                                                ',
      '                                                ',
      '                                                ',
      '                                                ',
      '           °                                    ',
      '          ===                   °               ',
      '                ===             =               ',
      '                             =     =            ',
      '                      = %=                      ',  
      '   *  %%                                    |   ',
      '                                           ==   ',
      '                                         ==== + ',
      '          ^  -     ^-          ^     - ======   ',
      '===========  ===================================',
    ],
    [
      '                                                ',
      '                                                ',
      '                                                ',
      '                                                ',
      '           |                                    ',
      '          !!!                                 ° ',
      '                                            !!! ',
      '                                                ',
      '                                         !!!    ',  
      '   !!! @ !                                      ',
      '                          !!!!     !!@          ',
      '                          !!!!                  ',
      '            ~ ~          z!!!!         ~~     + ',
      '!!!!!!!!!!!!! !!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!',
    ]
  ] 
    
    const levelCfg = {
        width: 40,
        height:30,
        'x': [sprite('bg'), solid()],
        '=': [sprite('ground-jupiter'), solid() ],
        '$': [sprite('sample'), 'sample'],
        '°': [sprite('sample1'), 'sample1'],
        '|': [sprite('sample2'), 'sample2'],
        '%': [sprite('bonus-nube'), solid(), 'sample-surprise'],
        '*': [sprite('bonus-nube'), solid(), 'antidote-surprise'],
        '}': [sprite('unboxed'), solid()],
        '+': [sprite('eddy'), solid(), scale(0.7), 'eddy'],
        '-': [sprite('eddy1'), solid(), scale(0.55), 'eddy1'],
        '^': [sprite('evil-tornado'), solid(), 'dangerous'],
        '#': [sprite('antidote'), solid(), 'antidote', body()],
        '!': [sprite('ground-io'), solid(), scale(0.6)],
        'z': [sprite('move-rock'), solid(), scale(0.5), 'dangerous'],
        '@': [sprite('bonus-rock'), solid(), scale(0.5), 'sample-surprise'],
        '~': [sprite('volcano'), solid(), scale(0.5)],

    }

    add([
      sprite('bg'),
      layer('bg'),
//     {width: width(100),height:height(100)}
    ])

    //const gameLevel = addLevel(map, levelCfg)
    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
      text(score),
      pos(30,6),
      layer('ui'),
      {
        value: score,
      }
    ])

    scoreLabel.action(()=>{
      camPos(player.pos)
    })

    add([
      text('level' + parseInt(level + 1)), pos(40,6)
    ])

    function big(){
      let timer = 0
      let isBig = false
      return {
        update(){
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          if (isBig){
            timer -= dt()
            if (timer <= 0) {
              this.smallify()
            }
          }
        },
        isBig(){
          return isBig
        },
        smallify(){
          this.scale = vec2(1)
          CURRENT_JUMP_FORCE = JUMP_FORCE
          timer = 0
          isBig = false
        },
        biggify(time){
          this.scale = vec2(1.3)
          timer = time
          isBig = true
        }
        
      }
    }

    const player = add([
        sprite('astronaut'), 
        solid(), 
        pos(50,0),
        body(),
        big(),
        origin('bot')        
    ])

    action('antidote', (a) => {
      a.move(20,0)
    })

    player.on("headbump", (obj)=> {
      if(obj.is('sample-surprise')){
        gameLevel.spawn('$', obj.gridPos.sub(0,1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
      }
      if(obj.is('antidote-surprise')){
        gameLevel.spawn('#', obj.gridPos.sub(0,1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
      }
    })

    player.collides('antidote', (a) => {
      destroy(a)
      player.biggify(20)
    })

    player.collides('sample', (s) => {
      destroy(s)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })

    player.collides('sample1', (s) => {
      destroy(s)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })

    player.collides('sample2', (s) => {
      destroy(s)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })

    action('dangerous', (d) => {
      d.move(-ENEMY_SPEED,0)
    })

    player.collides('dangerous', (d) => {
      if(isJumping){
        destroy(d)
 //       camShake(5)
      }else {
        go('lose', {score : scoreLabel.value})
      }  
    })

    player.action(()=>{
      camPos(player.pos)
      if(player.pos.y >= FALL_DEATH){
        go('lose', { score: scoreLabel.value})
      }  
    })

    player.collides('eddy',() => {
      keyPress('down', () => {
        go('game', {
          level: (level + 1) % maps.length,
          score: scoreLabel.value
        })
      })
    })

    keyDown('left', () =>{
      player.move(-MOVE_SPEED,0)
    })

    keyDown('right', () =>{
      player.move(MOVE_SPEED,0)
    })

    player.action(()=> {
      if(player.grounded()){
        isJumping = false
      }
    })

    keyPress('space', () => {
      if(player.grounded()){
        isJumping = true
        player.jump(CURRENT_JUMP_FORCE,0)
      }
    })

    const music = play("OtherworldlyFoe", { loop:true})
    volume(0.5)
    
    keyPress("intro", () => {
    
      // pause / play music
      if (music.paused()) {
        music.play();
      } else {
        music.pause();
      }
    
      // play one off sound
      play("OtherworldlyFoe");
    
    });
    keyPress("escape", () => music.stop());
  })

  scene('lose', ({ score }) => {
    add([
      text('GAME OVER', score, 80), 
      origin('center'), 
      pos(width()/2, height()/2)])
  })
  start("game", { level:0, score:0 })