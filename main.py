@namespace
class SpriteKind:
    Piece = SpriteKind.create()
    Monster = SpriteKind.create()
    MiniBoss = SpriteKind.create()
    Boss = SpriteKind.create()
    MiniBossAssisnt = SpriteKind.create()
    GrasslandEnemy = SpriteKind.create()
    SnowlandEnemy = SpriteKind.create()
    SandlandEnemy = SpriteKind.create()
    LavalandEnemy = SpriteKind.create()
    LowerBoss = SpriteKind.create()
    GrassLandBoss = SpriteKind.create()
    DesertLandBoss = SpriteKind.create()
    SnowLandBoss = SpriteKind.create()
    LavaLandBoss = SpriteKind.create()
@namespace
class StatusBarKind:
    HP = StatusBarKind.create()
    MiniBossHealth = StatusBarKind.create()
    GrassStatus = StatusBarKind.create()
"""

100 ms - Game Crash

200 ms - Game crash

500 ms -  Extreme

1000 ms - Hard

2000 ms - Medium

5000 ms - Normal

10000 ms - Easy

"""

def on_overlap_tile(sprite, location):
    game.show_long_text("???: Stop there. State your name!!", DialogLayout.TOP)
    game.show_long_text("Aegnor: Why?", DialogLayout.TOP)
    game.show_long_text("???: This area is restricted to only the most powerful adventurers who are willing to risk their lives",
        DialogLayout.TOP)
    game.show_long_text("Aegnor: Don't worry. I've had years of experience fighting enemies. And you are?",
        DialogLayout.TOP)
    game.show_long_text("???: I am the one who guards the gate, the strong, eloquent, striking, and powerful guard of this here maze. I will not stop you from entering, but I will warn you of its danger.",
        DialogLayout.TOP)
    game.show_long_text("Aegnor: Thanks for the heads up.", DialogLayout.TOP)
    game.show_long_text("Guard: One last thing. There is apparently a great treasure within this maze, but there also is one somewhere to the south. I don't know if this is true but just felt like telling you.",
        DialogLayout.TOP)
    game.show_long_text("Aegnor has learned of 2 rumored \"treasures\".",
        DialogLayout.CENTER)
    tiles.set_tile_at(location, sprites.castle.tile_grass2)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile0
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite2, location2):
    global DesertMiniBoss
    tiles.set_tile_at(location2, assets.tile("""
        Heart Spawner
    """))
    DesertMiniBoss = sprites.create(assets.image("""
            MiniBossDesertVariant
        """),
        SpriteKind.DesertLandBoss)
    DesertMiniBoss.follow(Aegnor, 60)
    tiles.place_on_tile(DesertMiniBoss, location2)
    music.play(music.create_song(assets.song("""
            Monster Intro
        """)),
        music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        DesertChest0
    """),
    on_overlap_tile2)

def on_up_pressed():
    animation.run_image_animation(Aegnor, assets.animation("""
        Walk Up
    """), 100, True)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_life_zero():
    tiles.set_current_tilemap(tilemap("""
        dump
    """))
    scene.set_background_image(assets.image("""
        Death Screen
    """))
    game.show_long_text("Vixlar lost in battle valiantly. Game Over.",
        DialogLayout.CENTER)
    game.set_game_over_message(False, "Try again?")
    game.game_over(False)
info.on_life_zero(on_life_zero)

def on_on_score():
    tiles.set_current_tilemap(tilemap("""
        dump
    """))
    scene.set_background_image(assets.image("""
        Another Intro Image
    """))
    game.show_long_text("Aegnor lands the final blow to the great fire beast, saving the sky realm. He is now a hero of legends.",
        DialogLayout.BOTTOM)
    game.set_game_over_message(True, "You win.")
    effects.confetti.end_screen_effect()
    game.game_over(True)
info.on_score(5, on_on_score)

def on_b_pressed():
    global daggerCount, Sword_Slash
    animation.run_image_animation(Aegnor,
        assets.animation("""
            Slash Right
        """),
        100,
        False)
    music.play(music.create_sound_effect(WaveShape.SINE,
            200,
            600,
            255,
            0,
            150,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.UNTIL_DONE)
    daggerCount += -20
    StaminaMeter.value += -20
    if daggerCount > 0:
        Sword_Slash = sprites.create_projectile_from_sprite(assets.image("""
            Knife Right
        """), Aegnor, 75, 0)
        pause(500)
        Sword_Slash.destroy(effects.ashes, 100)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap(sprite8, otherSprite6):
    global enemyCount
    music.play(music.melody_playable(music.power_down),
        music.PlaybackMode.UNTIL_DONE)
    info.change_life_by(-1)
    scene.camera_shake(3, 100)
    GrassEnemy.destroy(effects.fire, 500)
    enemyCount += -1
sprites.on_overlap(SpriteKind.player, SpriteKind.GrasslandEnemy, on_on_overlap)

def on_overlap_tile3(sprite22, location3):
    global GrassMiniBoss, GrassHealth
    Aegnor.x += -60
    game.show_long_text("???:(loudly) WHO DARES DISTURB MY SLUMBER!?",
        DialogLayout.TOP)
    game.show_long_text("Aegnor: I do... Who are you?", DialogLayout.TOP)
    game.show_long_text("???: I am one of the 4 Great Golems of the Elements. It's time for you to pay for interrupting my sleep.",
        DialogLayout.TOP)
    tiles.set_tile_at(location3, assets.tile("""
        Heart Spawner
    """))
    GrassMiniBoss = sprites.create(assets.image("""
            MiniBossGrassVariant
        """),
        SpriteKind.GrassLandBoss)
    GrassMiniBoss.follow(Aegnor, 60)
    tiles.place_on_tile(GrassMiniBoss, location3)
    GrassHealth = statusbars.create(20, 4, StatusBarKind.GrassStatus)
    GrassHealth.attach_to_sprite(GrassMiniBoss)
    GrassHealth.value = 100
    GrassHealth.set_color(2, 4, 5)
    GrassHealth.set_label("HP")
    GrassHealth.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, True)
    music.play(music.create_song(assets.song("""
            Monster Intro
        """)),
        music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile3)

def on_overlap_tile4(sprite3, location4):
    game.show_long_text("???: Hands up!", DialogLayout.TOP)
    game.show_long_text("Vixlar: Why?", DialogLayout.TOP)
    game.show_long_text("???: My protocol tells me to annihilate you, but you seem different. ",
        DialogLayout.TOP)
    game.show_long_text("Vixlar: I am,and I plan to proceed further into this area. ",
        DialogLayout.TOP)
    game.show_long_text("???: Ok, I hope you make it. Also, this area is known as the \"Lost Deserts\" which is literal in meaning.",
        DialogLayout.TOP)
    game.show_long_text("Vixlar: Thanks for the heads up.", DialogLayout.TOP)
    game.show_long_text("Vixlar has learned of \"Lost Deserts\"",
        DialogLayout.CENTER)
    tiles.set_tile_at(location4, assets.tile("""
        Sand
    """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        2b
    """),
    on_overlap_tile4)

def on_overlap_tile5(sprite4, location5):
    game.show_long_text("???: Hello. What is your name?", DialogLayout.TOP)
    game.show_long_text("Aegnor: I could ask you the same thing.", DialogLayout.TOP)
    game.show_long_text("???: My name is Tira'av and I am a simple villager from far away. I am here to explore and find monster materials. ",
        DialogLayout.TOP)
    game.show_long_text("Aegnor: Ok, my name is Aegnor. I found this weird gun looking thing on the ground and was wondering what to do with it. ",
        DialogLayout.TOP)
    game.show_long_text("Tira'av: Oh, that is the Sword of Lighting Speed. Press A to shoot the sword either left or right. No worries, the ammo is infinite, but I'll guess your arm will get tired and will need to rest for about 2 seconds. Try not to spam too much as the weapon may accidentally fire when you don't want it to. Well, best of luck on your adventure! I will be on my way. Goodbye.",
        DialogLayout.TOP)
    game.show_long_text("Aegnor: Thank You", DialogLayout.TOP)
    game.show_long_text("Tira'av: One last thing, make sure to explore for more health. Mini bosses can take a lot of life that you can't get back, so look for golden platforms.",
        DialogLayout.TOP)
    game.show_long_text("Aegnor has learned to use \"Sword of Lightning Speed\" and of health platforms",
        DialogLayout.CENTER)
    tiles.set_tile_at(location5, sprites.castle.tile_grass2)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile
    """),
    on_overlap_tile5)

def on_overlap_tile6(sprite6, location22):
    global FinalBoss, Boss_Bar
    tiles.set_tile_at(location22, sprites.dungeon.collectible_blue_crystal)
    FinalBoss = sprites.create(assets.image("""
        Boss
    """), SpriteKind.MiniBoss)
    FinalBoss.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
    Boss_Bar = statusbars.create(100, 4, StatusBarKind.health)
    Boss_Bar.attach_to_sprite(FinalBoss)
    Boss_Bar.value = 200
    Boss_Bar.set_color(2, 15, 5)
    Boss_Bar.set_label("HP")
    Boss_Bar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, True)
    FinalBoss.follow(Aegnor, 60)
    tiles.place_on_tile(FinalBoss, location22)
    music.play(music.create_song(assets.song("""
            Enter the Mini Boss
        """)),
        music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.collectible_red_crystal,
    on_overlap_tile6)

def on_a_pressed():
    global daggerCount, Sword_Slash
    animation.run_image_animation(Aegnor, assets.animation("""
        Slash Left
    """), 100, False)
    daggerCount += -20
    StaminaMeter.value += -20
    if daggerCount > 0:
        Sword_Slash = sprites.create_projectile_from_sprite(assets.image("""
            KnifeLeft
        """), Aegnor, -75, 0)
        pause(500)
        Sword_Slash.destroy(effects.ashes, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap2(sprite7, otherSprite5):
    global enemyCount
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.UNTIL_DONE)
    otherSprite5.destroy(effects.halo, 200)
    enemyCount += -1
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.GrasslandEnemy,
    on_on_overlap2)

def on_on_overlap3(sprite5, otherSprite):
    Sword_Slash.destroy(effects.spray, 500)
    Boss_Bar.value += -1
    music.play(music.create_sound_effect(WaveShape.SQUARE,
            200,
            1,
            255,
            0,
            100,
            SoundExpressionEffect.NONE,
            InterpolationCurve.CURVE),
        music.PlaybackMode.IN_BACKGROUND)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.MiniBoss, on_on_overlap3)

def on_left_pressed():
    animation.run_image_animation(Aegnor, assets.animation("""
        Walk Left0
    """), 100, True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_overlap_tile7(sprite9, location6):
    if 0 < 0:
        game.show_long_text("???: Stop there. State your name!!", DialogLayout.TOP)
        game.show_long_text("Aegnor: Why?", DialogLayout.TOP)
        game.show_long_text("???: This land, called the Forgotten Tundra, is extremely dangerous. You are clearly not ready for this. Come back when you have 2 or more points. ",
            DialogLayout.TOP)
        game.show_long_text("Aegnor: Can I go past anyways?", DialogLayout.TOP)
        game.show_long_text("???: No, but after you have slain 2 of the golems of elements, you may pass, as this proves your strength. ",
            DialogLayout.TOP)
        game.show_long_text("Aegnor: Oooookay.", DialogLayout.TOP)
        game.show_long_text("Aegnor has received quest and learned of the Forgotten Tundra.",
            DialogLayout.CENTER)
    elif (0) == (2):
        pass
    else:
        pass
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile3
    """),
    on_overlap_tile7)

def on_on_overlap4(sprite52, otherSprite4):
    if GrassHealth.value > 0:
        GrassHealth.value += -10
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.UNTIL_DONE)
    elif GrassHealth.value <= 0:
        scene.camera_shake(5, 500)
        game.show_long_text("Golem: How could I have been defeated.", DialogLayout.TOP)
        game.show_long_text("Aegnor: Simple, I'm better.", DialogLayout.TOP)
        game.show_long_text("One of the Four Golems of the Elements have been defeated. Congratulations.",
            DialogLayout.CENTER)
        game.show_long_text("Magic Splash Attack Unlocked. Press B to use bottle. Also drains stamina meter.",
            DialogLayout.CENTER)
        sprites.destroy(GrassMiniBoss, effects.disintegrate, 1000)
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.GrassLandBoss,
    on_on_overlap4)

def on_overlap_tile8(sprite23, location7):
    global SnowMiniBoss
    tiles.set_tile_at(location7, assets.tile("""
        Heart Spawner
    """))
    SnowMiniBoss = sprites.create(assets.image("""
            MiniBossSnowVariant
        """),
        SpriteKind.SnowLandBoss)
    SnowMiniBoss.follow(Aegnor, 60)
    tiles.place_on_tile(SnowMiniBoss, location7)
    music.play(music.create_song(assets.song("""
            Monster Intro
        """)),
        music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        SnowChest
    """),
    on_overlap_tile8)

def on_overlap_tile9(sprite10, location8):
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_life_by(3)
    tiles.set_tile_at(location8, assets.tile("""
        myTile6
    """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Heart Spawner
    """),
    on_overlap_tile9)

def on_on_zero(status):
    info.change_score_by(1)
    FinalBoss.destroy(effects.rings, 500)
    music.play(music.create_song(assets.song("""
            Mini Boss Defeat
        """)),
        music.PlaybackMode.IN_BACKGROUND)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_right_pressed():
    animation.run_image_animation(Aegnor, assets.animation("""
        Walk right0
    """), 100, True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def staminaMeter():
    global StaminaMeter, daggerCount
    StaminaMeter = statusbars.create(20, 4, StatusBarKind.energy)
    StaminaMeter.value = 100
    StaminaMeter.position_direction(CollisionDirection.TOP)
    StaminaMeter.set_color(6, 7, 5)
    StaminaMeter.set_label("Stamina")
    daggerCount = 100

def on_on_overlap5(sprite32, otherSprite2):
    music.play(music.melody_playable(music.power_down),
        music.PlaybackMode.UNTIL_DONE)
    info.change_life_by(-2)
    scene.camera_shake(3, 100)
sprites.on_overlap(SpriteKind.player, SpriteKind.LowerBoss, on_on_overlap5)

def on_down_pressed():
    animation.run_image_animation(Aegnor, assets.animation("""
        Walk down0
    """), 100, True)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_overlap_tile10(sprite11, location9):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1010,
            1,
            255,
            99,
            100,
            SoundExpressionEffect.TREMOLO,
            InterpolationCurve.LOGARITHMIC),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_life_by(-1)
    tiles.set_tile_at(location9, assets.tile("""
        myTile6
    """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile5
    """),
    on_overlap_tile10)

def on_on_zero2(status2):
    global daggerCount
    pause(2000)
    daggerCount = 100
    StaminaMeter.value = 100
statusbars.on_zero(StatusBarKind.energy, on_on_zero2)

def on_overlap_tile11(sprite24, location10):
    global LavaMiniBoss
    tiles.set_tile_at(location10, assets.tile("""
        Heart Spawner1
    """))
    LavaMiniBoss = sprites.create(assets.image("""
            MiniBossLavaVariant
        """),
        SpriteKind.LavaLandBoss)
    LavaMiniBoss.follow(Aegnor, 60)
    tiles.place_on_tile(LavaMiniBoss, location10)
    music.play(music.create_song(assets.song("""
            Monster Intro
        """)),
        music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        LavaChest0
    """),
    on_overlap_tile11)

Lava_Enemy: Sprite = None
SandEnemy: Sprite = None
SnowEnemy: Sprite = None
LavaMiniBoss: Sprite = None
SnowMiniBoss: Sprite = None
Boss_Bar: StatusBarSprite = None
FinalBoss: Sprite = None
GrassHealth: StatusBarSprite = None
GrassMiniBoss: Sprite = None
GrassEnemy: Sprite = None
Sword_Slash: Sprite = None
StaminaMeter: StatusBarSprite = None
daggerCount = 0
DesertMiniBoss: Sprite = None
Aegnor: Sprite = None
scene.set_background_image(assets.image("""
    Intro Image
"""))
game.show_long_text("Aegnor's Adventure", DialogLayout.CENTER)
game.show_long_text("You, Aegnor, are a sky traveler. You walks among the clouds and live free. Until one day, the sky turned black with the shadow of a massive creature. The shadow landed just out of view to the south. Being the skilled adventurer you are, so set out to figure out what it is. Along the way you must find 4 treasures along the way to defeat whatever evil it may be. ",
    DialogLayout.CENTER)
scene.set_background_image(img("""
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
"""))
tiles.set_current_tilemap(tilemap("""
    World Map
"""))
scene.set_background_color(7)
Aegnor = sprites.create(assets.image("""
    Vixlar Standard
"""), SpriteKind.player)
controller.move_sprite(Aegnor)
scene.camera_follow_sprite(Aegnor)
tiles.place_on_random_tile(Aegnor, assets.tile("""
    Spawnspoint
"""))
info.set_life(3)
staminaMeter()
enemyCount = 0

def on_update_interval():
    global GrassEnemy, enemyCount, SnowEnemy, SandEnemy, Lava_Enemy
    if (Aegnor.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_dark_grass3) or Aegnor.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_grass2)) and enemyCount <= 3:
        music.play(music.create_song(hex("""
                0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d
            """)),
            music.PlaybackMode.IN_BACKGROUND)
        GrassEnemy = sprites.create(assets.image("""
                GrassEnemy
            """),
            SpriteKind.GrasslandEnemy)
        GrassEnemy.follow(Aegnor, 50)
        tiles.place_on_random_tile(GrassEnemy, sprites.castle.tile_grass2)
        GrassEnemy.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
        enemyCount += 1
    elif Aegnor.tile_kind_at(TileDirection.CENTER, assets.tile("""
        myTile1
    """)):
        music.play(music.create_song(hex("""
                0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d
            """)),
            music.PlaybackMode.IN_BACKGROUND)
        SnowEnemy = sprites.create(assets.image("""
            Snow
        """), SpriteKind.SnowlandEnemy)
        SnowEnemy.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
        SnowEnemy.follow(Aegnor, 30)
        tiles.place_on_random_tile(SnowEnemy, assets.tile("""
            myTile1
        """))
        enemyCount += 1
    elif Aegnor.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_path5):
        music.play(music.create_song(hex("""
                0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d
            """)),
            music.PlaybackMode.IN_BACKGROUND)
        SandEnemy = sprites.create(assets.image("""
            Desert
        """), SpriteKind.SandlandEnemy)
        SandEnemy.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
        SandEnemy.follow(Aegnor, 60)
        tiles.place_on_random_tile(SandEnemy, sprites.castle.tile_path5)
        enemyCount += 1
    elif Aegnor.tile_kind_at(TileDirection.CENTER, assets.tile("""
        myTile8
    """)):
        music.play(music.create_song(hex("""
                0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d
            """)),
            music.PlaybackMode.IN_BACKGROUND)
        Lava_Enemy = sprites.create(assets.image("""
            Lava
        """), SpriteKind.LavalandEnemy)
        Lava_Enemy.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
        Lava_Enemy.follow(Aegnor, 70)
        tiles.place_on_random_tile(Lava_Enemy, sprites.dungeon.hazard_lava1)
        enemyCount += 1
game.on_update_interval(5000, on_update_interval)
