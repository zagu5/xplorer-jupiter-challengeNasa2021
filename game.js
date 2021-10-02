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
  loadSprite('bonus-rock', '41qL8sU.png')
  loadSprite('volcano', 'oo1luMh.png')
  loadSprite('move-rock', 'Gu9ddIK.png')
  loadSprite('ground-io', 'vISj75M.png')
  loadSprite('unboxed1', '7WEgVp4.png')

  loadSprite('bg2', 'GUSBIIJ.png')
  loadSprite('ground-europa', 'kGOrzue.png')
  loadSprite('bonus-europa', 'FXDDBdS.png')
  loadSprite('rocket', '4JDmKDl.png')
  loadSprite('table', 'CsY6AjB.png')
  loadSprite('bonus', 'z3yEoR7.png')
  loadSprite('obstacle', 'mNFy94t.png')
  loadSprite('sample-europa1', '5eOkZJM.png')
  loadSprite('sample-europa2', '7uh8yFK.png')
  loadSprite('eddy3', 'BjeV0S4.png')
  
  scene ("game", ({ level, score })=> {
    layers(['bg','bg1','bg2','obj', 'ui'], 'obj')

    const maps = [
    [
      '                                                ',
      '                                                ',
      '                                                ',
      '       |$               $$$                     ',
      '   |       °                                    ',
      '   =  ==  ===                   °        °      ',
      '                ===          |  =               ',
      '                             =     =            ',
      '                   °$   %=                      ',  
      '   * %%                                      |  ',
      '               °                           ==   ',
      '     $$                                 |==== + ',
      '          ^  -     ^-          ^ ^   - ======   ',
      '===========  ===================================',
    ],  
    [
      '                                                ',
      '                                                ',
      '                                                ',
      '                                                ',
      '                                           °    ',
      '                                          !!!   ',
      '              |                                 ',
      '            !!!                                 ',
      '                      !!               !!!      ',  
      '   s !                           !!@            ',
      '                            !!                  ',
      '                            !!                 +',
      '            ~ ~            z!!        z~~     z ',
      '!!!!!!!!!!!!! !!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!',
    ],
    [
      '                                                ',
      '                                        u       ',
      '                                    u           ',
      '                x            o    uu           u',
      '              &&&  &         ?                  ',
      '                                  u            u',
      '         i         x        / &      o   u      ',
      '      &?&&        && &&            /&&&&   &&?  ',
      '                            u                u  ',
      '       o    u       i                         /u',
      '     ?&&         ?&&&&           &?&  ///  &  [ ',
      '        u                                  u    ',
      '        xx       u      x   u     x   uu    ]   ',
      '&&&&&&& &&&&&&&&&&&&& &&&&&&& &&&&&&&&&&&&&&&&&&',
    ]
  ] 
    
    const levelCfg = {
        width: 40,
        height:30,
        '=': [sprite('ground-jupiter'), solid() ],
        '$': [sprite('sample'), 'sample'],
        '°': [sprite('sample1'), 'sample1'],
        '|': [sprite('sample2'), 'sample2'],
        '%': [sprite('bonus-nube'), solid(), 'sample-surprise'],
        '*': [sprite('bonus-nube'), solid(), 'antidote-surprise'],
        '}': [sprite('unboxed'), solid()],
        '+': [sprite('eddy'), solid(), scale(0.7), 'eddy'],
        '-': [sprite('eddy1'), solid(), scale(0.5), 'eddy1'],
        '^': [sprite('evil-tornado'), solid(), 'dangerous'],
        '#': [sprite('antidote'), solid(), 'antidote', body()],
        '!': [sprite('ground-io'), solid(), scale(0.6)],
        'z': [sprite('move-rock'), solid(), scale(0.7), 'dangerous'],
        '@': [sprite('bonus-rock'), solid(), 'sample-surprise1'],
        's': [sprite('bonus-rock'), solid(), 'antidote-surprise1'],
        'S': [sprite('unboxed1'), solid()],
        '~': [sprite('volcano'), solid(), scale(0.7)],
        '&': [sprite('ground-europa'), solid(), scale(0.6)],
        '?': [sprite('bonus-europa'), solid(), scale(0.5), 'sample-surprise'],
        '[': [sprite('rocket'), solid(), scale(0.5), 'rocket'],
        ']': [sprite('table'), solid(), scale(0.5), 'table'],
        '/': [sprite('bonus'), solid(), scale(0.5), 'bonus'],
        'x': [sprite('obstacle'), solid(), scale(0.5), 'obstacle'],
        'i': [sprite('sample-europa1'),'sample-europa1'],
        'o': [sprite('sample-europa2'),'sample-europa2'],
        'u': [sprite('eddy3'),  solid(), scale(0.9), 'dangerous'],
    }

    //Background de acuerdo al nivel
    if (level===0){
      add(
          [
          sprite('bg'),
          layer('bg'),
        ])
    }if(level===1){
      add(
        [
        sprite('bg1'),
        layer('bg1'),
      ])  
    } if(level===2){
      add(
        [
        sprite('bg2'),
        layer('bg2'),
      ]) 
}

    const gameLevel = addLevel(maps[level], levelCfg)
     
    const scoreLabel = 
    add([
      text(score),
      pos(110,30),
      layer('ui'),
      {
        value: score,
      }
    ])
    add([
      text('specimen'),
      pos(40,30)
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
      if(obj.is('sample-surprise1')){
        gameLevel.spawn('$', obj.gridPos.sub(0,1))
        destroy(obj)
        gameLevel.spawn('S', obj.gridPos.sub(0,0))       
      }
      if(obj.is('antidote-surprise1')){
        gameLevel.spawn('#', obj.gridPos.sub(0,1))
        destroy(obj)
        gameLevel.spawn('S', obj.gridPos.sub(0,0))
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

    player.collides('rocket', () => {
      go('missionComplete', { score: scoreLabel.value });
    });
  
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
  })

  scene('lose', ({ score }) => {
    add([
      text('GAME OVER', 40),
      origin('center'),
      pos(width() / 2, height() / 2)]);
  
    add([
      text(score, 50),
      origin('center'),
      pos(width() / 2, height() / 1.5)])
  })
  
  scene('missionComplete', ({ score }) => {
    add([
      text('Mission Complete!!!', score, 40),
      origin('center'),
      pos(width() / 2, height() / 2)
    ])
  
    add([
      text(score, 50),
      origin('center'),
      pos(width() / 2, height() / 1.5)
    ])
  
    add([
      text('Dato centifico'),
      origin('center'),
      pos(width() / 2, height() / 1.2)
    ])
  })
  
  start("game", { level:0, score:0 })