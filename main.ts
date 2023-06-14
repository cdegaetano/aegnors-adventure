namespace SpriteKind {
    export const Piece = SpriteKind.create()
    export const Monster = SpriteKind.create()
    export const MiniBoss = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const MiniBossAssisnt = SpriteKind.create()
    export const GrasslandEnemy = SpriteKind.create()
    export const SnowlandEnemy = SpriteKind.create()
    export const SandlandEnemy = SpriteKind.create()
    export const LavalandEnemy = SpriteKind.create()
    export const LowerBoss = SpriteKind.create()
    export const GrassLandBoss = SpriteKind.create()
    export const DesertLandBoss = SpriteKind.create()
    export const SnowLandBoss = SpriteKind.create()
    export const LavaLandBoss = SpriteKind.create()
    export const Water = SpriteKind.create()
    export const BossPRojectile = SpriteKind.create()
    export const FNLBOSSASSIST = SpriteKind.create()
    export const Housing = SpriteKind.create()
    export const Loadr = SpriteKind.create()
    export const Shop = SpriteKind.create()
    export const superHeart = SpriteKind.create()
    export const coin = SpriteKind.create()
}
namespace StatusBarKind {
    export const HP = StatusBarKind.create()
    export const MiniBossHealth = StatusBarKind.create()
    export const GrassStatus = StatusBarKind.create()
    export const DesertStatus = StatusBarKind.create()
    export const LavaStatus = StatusBarKind.create()
    export const SnowStatus = StatusBarKind.create()
    export const AssistStatus = StatusBarKind.create()
}
/**
 * (boss)alive3 and (boss) defeat are the same thing but one is true/false and the other is a numerical value
 */
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.showLongText("???: Stop there. State your name!!", DialogLayout.Top)
    game.showLongText("Aegnor: Why?", DialogLayout.Top)
    game.showLongText("???: This area is restricted to only the most powerful adventurers who are willing to risk their lives", DialogLayout.Top)
    game.showLongText("Aegnor: Don't worry. I've had years of experience fighting enemies. And you are?", DialogLayout.Top)
    game.showLongText("???: I am the one who guards the gate, the strong, eloquent, striking, and powerful guard of this here grassy arena. I will not stop you from entering, but I will warn you of its danger.", DialogLayout.Top)
    game.showLongText("Aegnor: Thanks for the heads up.", DialogLayout.Top)
    game.showLongText("Guard: One last thing. There is apparently a great treasure within this area, but there also is one somewhere to the south. ", DialogLayout.Top)
    game.showLongText("Aegnor has learned of 2 rumored \"treasures\".", DialogLayout.Center)
    tiles.setTileAt(location, sprites.castle.tileGrass2)
})
sprites.onOverlap(SpriteKind.Housing, SpriteKind.Housing, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.none, 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SnowlandEnemy, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-2)
    scene.cameraShake(3, 100)
    otherSprite6.destroy(effects.coolRadial, 200)
    enemyCount += -1
    coinCreation()
    coin.setPosition(otherSprite6.x, otherSprite6.y)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`DesertChest0`, function (sprite2, location) {
    Aegnor.y += -100
    game.showLongText("???: What year is it, puny fellow?", DialogLayout.Top)
    game.showLongText("Aegnor: That doesn't matter, and I will slay thee, creature of evil.", DialogLayout.Top)
    game.showLongText("???: I am one of the 4 Great Golems of the Elements. I will end you for not answering my question!", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`Heart Spawner`)
    createDesertBoss()
    tiles.placeOnTile(DesertMiniBoss, location)
    music.play(music.createSong(assets.song`Monster Intro`), music.PlaybackMode.InBackground)
    DesertAliv3 = 2
    tiles.setTileAt(tiles.getTileLocation(35, 149), assets.tile`myTile31`)
    tiles.setWallAt(tiles.getTileLocation(35, 149), true)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Aegnor,
    assets.animation`Walk Up`,
    100,
    true
    )
    Direction = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.DesertLandBoss, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-100)
    scene.cameraShake(3, 100)
})
controller.combos.attachCombo("UUDDUUDD", function () {
    info.changeLifeBy(-1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.superHeart, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.hearts, 100)
    permaHeartCount += 1
    info.changeLifeBy(1)
})
function createFinalBoss () {
    FinalBoss = sprites.create(assets.image`Boss`, SpriteKind.MiniBoss)
    FinalBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
    bossBar = statusbars.create(100, 5, StatusBarKind.Health)
    bossBar.positionDirection(CollisionDirection.Left)
    bossBar.setBarBorder(1, 10)
    bossBar.setOffsetPadding(50, 0)
    bossBar.value = 500
    bossBar.setColor(2, 15, 5)
    bossBar.setLabel("FINAL BOSS")
    bossBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    FinalBoss.follow(Aegnor, 70)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.LavaLandBoss, function (sprite5, otherSprite4) {
    if (LavaHealth.value > 0) {
        sprites.destroy(sprite5, effects.spray, 100)
        if (dmgincreaseCount == 0) {
            LavaHealth.value += -5
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 1) {
            LavaHealth.value += -6
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 2) {
            LavaHealth.value += -7
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 3) {
            LavaHealth.value += -8
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount >= 4) {
            LavaHealth.value += -10
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
    } else if (LavaHealth.value <= 0) {
        scene.cameraShake(5, 500)
        game.showLongText("Golem: How...", DialogLayout.Top)
        game.showLongText("Aegnor: You are incapable of fighting. Now return to the ground from where you came.", DialogLayout.Top)
        game.showLongText("One of the Four Golems of the Elements have been defeated. Congratulations.", DialogLayout.Center)
        hearTcontainer = sprites.create(assets.image`myImage0`, SpriteKind.superHeart)
        hearTcontainer.setPosition(LavaMiniBoss.x, LavaMiniBoss.y)
        sprites.destroy(LavaMiniBoss, effects.disintegrate, 1000)
        bossKilled += 1
        LavaAliv3 = 1
        lavaDefeat = true
        tiles.setTileAt(tiles.getTileLocation(97, 147), assets.tile`myTile18`)
        tiles.setTileAt(tiles.getTileLocation(116, 147), assets.tile`myTile18`)
        tiles.setTileAt(tiles.getTileLocation(117, 138), assets.tile`myTile18`)
        tiles.setWallAt(tiles.getTileLocation(97, 147), false)
        tiles.setWallAt(tiles.getTileLocation(116, 147), false)
        tiles.setWallAt(tiles.getTileLocation(117, 138), false)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (BOSSDEFEATED == true) {
        game.showLongText("Success", DialogLayout.Bottom)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`snowtShop`, function (sprite, location) {
    Aegnor.x += 40
    if (shopOpen == false) {
        game.showLongText("Shopkeeper: Welcome", DialogLayout.Bottom)
        shopOpen = true
        sprites.destroyAllSpritesOfKind(SpriteKind.SnowlandEnemy)
        shopMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Health Increase", assets.image`HeartExplosion`),
        miniMenu.createMenuItem("Damage Increase", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f f f f . . f f f f f f . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . f f f f f f . . f f f f f f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f f f f f f . . f f f f f f . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Speed Up", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f . . f f f f f f f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many coins?", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many can I buy?"),
        miniMenu.createMenuItem("Exit")
        )
        shopMenu.setPosition(Aegnor.x, Aegnor.y)
        shopMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0 && coinCount >= 20) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                permaHeartCount += 1
                coinCount += -20
                info.changeLifeBy(1)
                game.showLongText("Shopkeeper: Thank you for your purchase.", DialogLayout.Top)
            } else if (selectedIndex == 1 && coinCount >= 25) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                dmgincreaseCount += 1
                coinCount += -15
                game.showLongText("Shopkeeper: Thank you for your purchase. This only affects boss enemies as normal enemies die in one hit anyway.", DialogLayout.Top)
            } else if (selectedIndex == 2 && coinCount >= 10) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                speedCount += 1
                coinCount += -10
                game.showLongText("Shopkeeper: Thank you for your purchase. This will take into affect after you have been defeated once.", DialogLayout.Top)
            } else if (selectedIndex == 3) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                Aegnor.sayText(coinCount, 2000, false)
            } else if (selectedIndex == 4) {
                shopOpen = false
                game.showLongText("Shopkeeper: You can buy 5 speed upgrades, 5 damage upgrades, and 6 health upgrades. You can technically can buy more, but they won't do anything.", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 0 && coinCount < 20) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 1 && coinCount < 25) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 2 && coinCount < 10) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 5) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
            }
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GrasslandEnemy, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
    scene.cameraShake(3, 100)
    otherSprite6.destroy(effects.fire, 200)
    enemyCount += -1
    coinCreation()
    coin.setPosition(otherSprite6.x, otherSprite6.y)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite2, location) {
    Aegnor.x += -60
    game.showLongText("???:(loudly) WHO DARES DISTURB MY SLUMBER!?", DialogLayout.Top)
    game.showLongText("Aegnor: I do.", DialogLayout.Top)
    game.showLongText("???: I am one of the 4 Great Golems of the Elements. It's time for you to pay for interrupting my sleep!", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`Heart Spawner`)
    createGrassBoss()
    tiles.placeOnTile(GrassMiniBoss, location)
    tiles.setTileAt(tiles.getTileLocation(34, 12), assets.tile`myTile31`)
    tiles.setTileAt(tiles.getTileLocation(34, 13), assets.tile`myTile31`)
    tiles.setTileAt(tiles.getTileLocation(34, 14), assets.tile`myTile31`)
    tiles.setWallAt(tiles.getTileLocation(34, 12), true)
    tiles.setWallAt(tiles.getTileLocation(34, 13), true)
    tiles.setWallAt(tiles.getTileLocation(34, 14), true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`2b`, function (sprite, location) {
    game.showLongText("???: How are you, traveler?", DialogLayout.Top)
    game.showLongText("Aegnor: Terrible, but it seems like I'll be doing worse after looking at this desert.", DialogLayout.Top)
    game.showLongText("???: This is the Lost Deserts for a reason, but there is a great treasure somewhere here if you are willing to look.", DialogLayout.Top)
    game.showLongText("Aegnor: Got it. Thanks for the heads up.", DialogLayout.Top)
    game.showLongText("Aegnor has learned of \"Lost Deserts\"", DialogLayout.Center)
    tiles.setTileAt(location, assets.tile`Sand`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    game.showLongText("???: Hello adventurer, welcome to our town. It has been utter chaos since the beast flew over the town.", DialogLayout.Top)
    game.showLongText("Aegnor: What happened?", DialogLayout.Top)
    game.showLongText("???: Monsters started appearing out of thin air and have continued to do such since then.", DialogLayout.Top)
    game.showLongText("Aegnor: Is there any way to stop it?", DialogLayout.Top)
    game.showLongText("???: Yes, but this is only a guess. You must slay the creature that appeared in the sky.", DialogLayout.Top)
    game.showLongText("Aegnor: Ok, will do. Also, do you know what that statue looking thing is?", DialogLayout.Top)
    game.showLongText("???: Yes, it is a checkpoint in case you fail during your journey. It can be used up to five times so be careful.", DialogLayout.Top)
    game.showLongText("Aegnor: Thank you once again.", DialogLayout.Center)
    tiles.setTileAt(location, sprites.castle.tileGrass2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`checkpointLava`, function (sprite, location) {
    checkpoint = 4
    tiles.setTileAt(location, assets.tile`ActivecheckpointLava`)
    deathCount = 0
})
function heartSetup () {
    if (permaHeartCount == 1) {
        info.setLife(6)
    } else if (permaHeartCount == 2) {
        info.setLife(7)
    } else if (permaHeartCount == 3) {
        info.setLife(8)
    } else if (permaHeartCount == 4) {
        info.setLife(9)
    } else if (permaHeartCount == 5) {
        info.setLife(10)
    } else if (permaHeartCount == 6) {
        info.setLife(11)
    } else if (permaHeartCount == 7) {
        info.setLife(12)
    } else if (permaHeartCount == 8) {
        info.setLife(13)
    } else if (permaHeartCount == 9) {
        info.setLife(14)
    } else if (permaHeartCount >= 10) {
        info.setLife(15)
    } else {
        info.setLife(5)
    }
}
function speedSetup () {
    if (speedCount == 0) {
        controller.moveSprite(Aegnor, 100, 100)
    } else if (speedCount == 1) {
        controller.moveSprite(Aegnor, 110, 110)
    } else if (speedCount == 2) {
        controller.moveSprite(Aegnor, 120, 120)
    } else if (speedCount == 3) {
        controller.moveSprite(Aegnor, 130, 130)
    } else if (speedCount == 4) {
        controller.moveSprite(Aegnor, 140, 140)
    } else if (speedCount > 5) {
        controller.moveSprite(Aegnor, 150, 150)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.SnowLandBoss, function (sprite5, otherSprite4) {
    if (SnowHealth.value > 0) {
        sprites.destroy(sprite5, effects.spray, 100)
        if (dmgincreaseCount == 0) {
            SnowHealth.value += -5
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 1) {
            SnowHealth.value += -6
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 2) {
            SnowHealth.value += -7
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 3) {
            SnowHealth.value += -8
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount >= 4) {
            SnowHealth.value += -10
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
    } else if (SnowHealth.value <= 0) {
        scene.cameraShake(5, 500)
        game.showLongText("Golem: This is the end and yet only the beginning.", DialogLayout.Top)
        game.showLongText("One of the Four Golems of the Elements have been defeated. Congratulations.", DialogLayout.Center)
        hearTcontainer = sprites.create(assets.image`myImage0`, SpriteKind.superHeart)
        hearTcontainer.setPosition(SnowMiniBoss.x, SnowMiniBoss.y)
        sprites.destroy(SnowMiniBoss, effects.disintegrate, 1000)
        bossKilled += 1
        SnowAliv3 = 1
        snowDefeat = true
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite6, location2) {
    Aegnor.y += 100
    game.showLongText("Massive Beast: ROOOOOOAR!!!", DialogLayout.Top)
    scene.cameraShake(10, 1000)
    game.showLongText("Aegnor: You must be the cause of this mess. Let's go!", DialogLayout.Top)
    tiles.setTileAt(location2, sprites.dungeon.collectibleBlueCrystal)
    createFinalBoss()
    tiles.placeOnTile(FinalBoss, location2)
    music.play(music.createSong(assets.song`Enter the Mini Boss`), music.PlaybackMode.InBackground)
    bossAlive = 2
    battleBegin = true
    tiles.setTileAt(tiles.getTileLocation(97, 189), assets.tile`myTile31`)
    tiles.setWallAt(tiles.getTileLocation(97, 189), true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerDead == false && shopOpen == false) {
        if (Direction == 1) {
            animation.runImageAnimation(
            Aegnor,
            assets.animation`Slash Right`,
            100,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            daggerCount += -10
            StaminaMeter.value += -10
            if (daggerCount > 0) {
                Sword_Slash = sprites.createProjectileFromSprite(assets.image`Knife Right0`, Aegnor, 75, 0)
                pause(500)
                Sword_Slash.destroy(effects.ashes, 100)
            }
        } else if (Direction == 3) {
            animation.runImageAnimation(
            Aegnor,
            assets.animation`Slash Left`,
            100,
            false
            )
            daggerCount += -10
            StaminaMeter.value += -10
            if (daggerCount > 0) {
                Sword_Slash = sprites.createProjectileFromSprite(assets.image`KnifeLeft0`, Aegnor, -75, 0)
                pause(500)
                Sword_Slash.destroy(effects.ashes, 100)
            }
        } else if (Direction == 0) {
            animation.runImageAnimation(
            Aegnor,
            [img`
                . . . . . . f f f f . . . . . . 
                . . . . f f e e e e f f . . . . 
                . . . f e e e f f e e e f . . . 
                . . f f f f f 2 2 f f f f f . . 
                . . f f e 2 e 2 2 e 2 e f f . . 
                . . f e 2 f 2 f f 2 f 2 e f . . 
                . . f f f 2 2 e e 2 2 f f f . . 
                . f f e f 2 f e e f 2 f e f f . 
                . f e e f f e e e e f e e e f . 
                . . f e e e e e e e e e e f . . 
                . . . f e e e e e e e e f . . . 
                . . e 4 f f f f f f f f 4 e . . 
                . . 4 d f 2 2 2 2 2 2 f d 4 . . 
                . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f . . . . . . . 
                . . . f f e e e e f f . . . . . 
                . . f e e e f f e e e f . . . . 
                . . f f f f 2 2 f f f f . . . . 
                . f f e 2 e 2 2 e 2 e f f . . . 
                . f e 2 f 2 f f f 2 f e f . . . 
                . f f f 2 f e e 2 2 f f f . . . 
                . f e 2 f f e e 2 f e e f . . . 
                f f e f f e e e f e e e f f . . 
                f f e e e e e e e e e e f d f . 
                . . f e e e e e e e e f f b f . 
                . . e f f f f f f f f 4 f b f . 
                . . 4 f 2 2 2 2 2 e d d f c f . 
                . . e f f f f f f e e 4 f f . . 
                . . . f f f . . . . . . . . . . 
                `,img`
                . . . . . f f f f . . . . . . . 
                . . . f f e e e e f f . . . . . 
                . . f e e e f f e e e f . . . . 
                . f f f f f 2 2 f f f f f . . . 
                . f f e 2 e 2 2 e 2 e f f . . . 
                . f e 2 f 2 f f 2 f 2 e f . . . 
                . f f f 2 2 e e 2 2 f f f . . . 
                f f e f 2 f e e f 2 f e f f . . 
                f e e f f e e e e f e e e f . . 
                . f e e e e e e e e e e f . . . 
                . . f e e e e e e e e f . . . . 
                . e 4 f f f f f f f f 4 e . . . 
                . 4 d f 2 2 2 2 2 2 f d 4 . . . 
                . 4 4 f 4 4 4 4 4 4 f 4 4 . . . 
                . . . . f f f f f f . . . . . . 
                . . . . f f . . f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f . . . . . . . 
                . . . f f e e e e f f . . . . . 
                . . f e e e f f e e e f . . . . 
                . . f f f f 2 2 f f f f . . . . 
                . f f e 2 e 2 2 e 2 e f f . . . 
                . f e f 2 f f f 2 f 2 e f . . . 
                . f f f 2 2 e e f 2 f f f . . . 
                . f e e f 2 e e f f 2 e f . . . 
                . f e e e f e e e f f e f f . . 
                . f e e e e e e e e e e f f . . 
                . f f e e e e e e e e f . . . . 
                . f 4 f f f f f f f f e . . . . 
                . f d d e 2 2 2 2 2 f 4 . . . . 
                . f 4 e e f f f f f f e . . . . 
                . . . . . . . . f f f . . . . . 
                `],
            100,
            false
            )
            daggerCount += -10
            StaminaMeter.value += -10
            if (daggerCount > 0) {
                Sword_Slash = sprites.createProjectileFromSprite(assets.image`KnifeLeft`, Aegnor, 0, -75)
                pause(500)
                Sword_Slash.destroy(effects.ashes, 100)
            }
        } else if (Direction == 2) {
            animation.runImageAnimation(
            Aegnor,
            [img`
                ........................
                .....ffff...............
                ...fff22fff.............
                ..fff2222fff............
                .fffeeeeeefff...........
                .ffe222222eef...........
                .fe2ffffff2ef...........
                .ffffeeeeffff...........
                ffefbf44fbfeff..........
                fee41fddf14eef..........
                .ffffdddddeef...........
                fddddf444eef............
                fbbbbf2222f4e...........
                fbbbbf2222fd4...........
                .fccf45544f44...........
                ..ffffffff..............
                ....ff..ff..............
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                `,img`
                ........................
                ......ffff..............
                ....fff22fff............
                ...fff2222fff...........
                ..fffeeeeeefff..........
                ..ffe222222eef..........
                ..fe2ffffff2ef..........
                ..ffffeeeeffff..........
                .ffefbf44fbfeff.........
                .fee41fddf14eef.........
                fdfeeddddd4eff..........
                fbffee444edd4e..........
                fbf4f2222edde...........
                fcf.f22cccee............
                .ff.f44cdc4f............
                ....fffddcff............
                .....fddcff.............
                ....cddc................
                ....cdc.................
                ....cc..................
                ........................
                ........................
                ........................
                ........................
                `,img`
                ........................
                ........................
                .......ff...............
                .....ff22ff.............
                ...fff2222fff...........
                ..fff222222fff..........
                ..fff222222fff..........
                ..feeeeeeeeeeff.........
                .ffe22222222eff.........
                .fffffeeeefffff.........
                fdfefbf44fbfeff.........
                fbfe41fddf14ef..........
                fbffe4dddd4efe..........
                fcfef22222f4e...........
                .ff4f44554f4e...........
                ....ffffffdde...........
                .....ffffedde...........
                ..........ee............
                .........ccc............
                ........cc1cc...........
                .........c1c............
                .........c1c............
                .........c1c............
                .........c1c............
                `,img`
                ......ffff..............
                ....fff22fff............
                ...fff2222fff...........
                ..fffeeeeeefff..........
                ..ffe222222eef..........
                ..fe2ffffff2ef..........
                ..ffffeeeeffff......ccc.
                .ffefbf44fbfeff....cddc.
                .ffefbf44fbfeff...cddc..
                .fee4dddddd4eef.ccddc...
                fdfeeddddd4eeffecddc....
                fbffee4444ee4fddccc.....
                fbf4f222222f1edde.......
                fcf.f222222f44ee........
                .ff.f445544f............
                ....ffffffff............
                .....ff..ff.............
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                `],
            100,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            daggerCount += -10
            StaminaMeter.value += -10
            if (daggerCount > 0) {
                Sword_Slash = sprites.createProjectileFromSprite(assets.image`Knife Right`, Aegnor, 0, 75)
                pause(500)
                Sword_Slash.destroy(effects.ashes, 100)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.LavaLandBoss, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-100)
    scene.cameraShake(3, 100)
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Aegnor)
    Direction = 2
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.GrasslandEnemy, function (sprite7, otherSprite5) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    otherSprite5.destroy(effects.halo, 200)
    enemyCount += -1
    coinCreation()
    coin.setPosition(otherSprite5.x, otherSprite5.y)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.FNLBOSSASSIST, function (sprite5, otherSprite4) {
    if (AssistHealth.value > 0) {
        sprites.destroy(sprite5, effects.spray, 100)
        if (dmgincreaseCount == 0) {
            AssistHealth.value += -5
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 1) {
            AssistHealth.value += -6
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 2) {
            AssistHealth.value += -7
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 3) {
            AssistHealth.value += -8
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount >= 4) {
            AssistHealth.value += -10
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
        sprites.destroy(sprite5, effects.ashes, 100)
    } else if (AssistHealth.value <= 0) {
        scene.cameraShake(7, 500)
        sprites.destroy(sprite5, effects.ashes, 100)
        sprites.destroy(otherSprite4, effects.disintegrate, 500)
    }
})
function variableSetup () {
    enemyCount = 0
    bossAlive = 1
    GrassAliv3 = 1
    DesertAliv3 = 1
    SnowAliv3 = 1
    LavaAliv3 = 1
    BOSSDEFEATED = false
    battleBegin = false
    playerDead = false
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossPRojectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.MiniBoss, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.spray, 500)
    if (dmgincreaseCount == 0) {
        bossBar.value += -1
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    } else if (dmgincreaseCount == 1) {
        bossBar.value += -2
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    } else if (dmgincreaseCount == 2) {
        bossBar.value += -5
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    } else if (dmgincreaseCount == 3) {
        bossBar.value += -8
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    } else if (dmgincreaseCount >= 4) {
        bossBar.value += -10
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`deserttShop`, function (sprite, location) {
    Aegnor.y += 40
    if (shopOpen == false) {
        game.showLongText("Shopkeeper: Welcome", DialogLayout.Bottom)
        shopOpen = true
        sprites.destroyAllSpritesOfKind(SpriteKind.SandlandEnemy)
        shopMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Health Increase", assets.image`HeartExplosion`),
        miniMenu.createMenuItem("Damage Increase", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f f f f . . f f f f f f . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . f f f f f f . . f f f f f f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f f f f f f . . f f f f f f . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Speed Up", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f . . f f f f f f f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many coins?", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many can I buy?"),
        miniMenu.createMenuItem("Exit")
        )
        shopMenu.setPosition(Aegnor.x, Aegnor.y)
        shopMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0 && coinCount >= 20) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                permaHeartCount += 1
                coinCount += -20
                info.changeLifeBy(1)
                game.showLongText("Shopkeeper: Thank you for your purchase.", DialogLayout.Top)
            } else if (selectedIndex == 1 && coinCount >= 25) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                dmgincreaseCount += 1
                coinCount += -15
                game.showLongText("Shopkeeper: Thank you for your purchase. This only affects boss enemies as normal enemies die in one hit anyway.", DialogLayout.Top)
            } else if (selectedIndex == 2 && coinCount >= 10) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                speedCount += 1
                coinCount += -10
                game.showLongText("Shopkeeper: Thank you for your purchase. This will take into affect after you have been defeated once.", DialogLayout.Top)
            } else if (selectedIndex == 3) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                Aegnor.sayText(coinCount, 2000, false)
            } else if (selectedIndex == 4) {
                shopOpen = false
                game.showLongText("Shopkeeper: You can buy 5 speed upgrades, 5 damage upgrades, and 6 health upgrades. You can technically can buy more, but they won't do anything.", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 0 && coinCount < 20) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 1 && coinCount < 25) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 2 && coinCount < 10) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 5) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
            }
        })
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Aegnor,
    assets.animation`Walk Left0`,
    100,
    true
    )
    Direction = 3
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    if (bossKilled < 2) {
        game.showLongText("???: Stop there!", DialogLayout.Top)
        game.showLongText("Aegnor: Why?", DialogLayout.Top)
        game.showLongText("???: This land, the Forgotten Tundra, is extremely dangerous. You are clearly not ready for this. Come back when you have defeated at least 2 greatly formidable opponents", DialogLayout.Top)
        game.showLongText("Aegnor: Can I go past anyways?", DialogLayout.Top)
        game.showLongText("???: No...", DialogLayout.Top)
        game.showLongText("Aegnor has received quest and learned of the Forgotten Tundra.", DialogLayout.Center)
        Aegnor.x += -20
    } else if (bossKilled >= 2) {
        game.showLongText("???: You have proven thyself and may pass.", DialogLayout.Top)
        game.showLongText("Aegnor: Finally..", DialogLayout.Top)
        tiles.setTileAt(location, assets.tile`myTile1`)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.GrassLandBoss, function (sprite5, otherSprite4) {
    if (GrassHealth.value > 0) {
        sprites.destroy(sprite5, effects.spray, 100)
        if (dmgincreaseCount == 0) {
            GrassHealth.value += -5
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 1) {
            GrassHealth.value += -6
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 2) {
            GrassHealth.value += -7
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 3) {
            GrassHealth.value += -8
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount >= 4) {
            GrassHealth.value += -10
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
    } else if (GrassHealth.value <= 0) {
        scene.cameraShake(5, 500)
        game.showLongText("Golem: How could I have been defeated?", DialogLayout.Top)
        game.showLongText("Aegnor: Simple, I'm better.", DialogLayout.Top)
        game.showLongText("One of the Four Golems of the Elements have been defeated. Congratulations.", DialogLayout.Center)
        hearTcontainer = sprites.create(assets.image`myImage0`, SpriteKind.superHeart)
        hearTcontainer.setPosition(GrassMiniBoss.x, GrassMiniBoss.y)
        sprites.destroy(GrassMiniBoss, effects.disintegrate, 1000)
        BOSSDEFEATED = true
        bossKilled += 1
        GrassAliv3 = 1
        grassDefeat = true
        tiles.setTileAt(tiles.getTileLocation(34, 12), sprites.castle.tileDarkGrass1)
        tiles.setTileAt(tiles.getTileLocation(34, 13), sprites.castle.tileGrass2)
        tiles.setTileAt(tiles.getTileLocation(34, 14), sprites.castle.tileGrass3)
        tiles.setWallAt(tiles.getTileLocation(34, 12), false)
        tiles.setWallAt(tiles.getTileLocation(34, 13), false)
        tiles.setWallAt(tiles.getTileLocation(34, 14), false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`SnowChest`, function (sprite2, location) {
    Aegnor.x += -60
    game.showLongText("???: It is over for you, tiny creature", DialogLayout.Top)
    game.showLongText("Aegnor: Why?", DialogLayout.Top)
    game.showLongText("???: I am a golem, you aren't and therefore I shall win.", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`Heart Spawner`)
    createSnowBoss()
    tiles.placeOnTile(SnowMiniBoss, location)
    music.play(music.createSong(assets.song`Monster Intro`), music.PlaybackMode.InBackground)
    SnowAliv3 = 2
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Aegnor)
    Direction = 1
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Aegnor)
    Direction = 3
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Lava Guard`, function (sprite, location) {
    if (bossKilled < 3) {
        game.showLongText("???: Halt!", DialogLayout.Top)
        game.showLongText("Aegnor: Ok", DialogLayout.Top)
        game.showLongText("???:There are many dangers awaiting you. Are you sure you want to continue?", DialogLayout.Top)
        game.showLongText("Aegnor: Yup.", DialogLayout.Top)
        game.showLongText("???. I have set up a barrier to protect all from the lava, but I sense you have not cleared all the other areas. Therefore you cannot pass.", DialogLayout.Top)
        game.showLongText("Aegnor: Not again.", DialogLayout.Top)
        game.showLongText("Aegnor has received quest to clear all areas.", DialogLayout.Center)
        Aegnor.y += -30
    } else if (bossKilled >= 3) {
        game.showLongText("???: You shall pass.", DialogLayout.Top)
        game.showLongText("Aegnor: Great!", DialogLayout.Top)
        tiles.setTileAt(location, assets.tile`myTile8`)
    }
})
function coinCreation () {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.coin)
    coin.lifespan = 15000
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.SnowlandEnemy, function (sprite7, otherSprite5) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    otherSprite5.destroy(effects.halo, 200)
    enemyCount += -1
    coinCreation()
    coin.setPosition(otherSprite5.x, otherSprite5.y)
})
controller.combos.attachCombo("DDDUULR", function () {
    Aegnor.sayText(Aegnor.vx, 500, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Heart Spawner`, function (sprite, location) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
    tiles.setTileAt(location, assets.tile`myTile6`)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    FinalBoss.destroy(effects.rings, 500)
    music.play(music.createSong(assets.song`Mini Boss Defeat`), music.PlaybackMode.InBackground)
    defeated = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`checkpointGrass0`, function (sprite, location) {
    checkpoint = 1
    tiles.setTileAt(location, assets.tile`ActivecheckpointGrass0`)
    deathCount = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`checkpointFinal`, function (sprite, location) {
    checkpoint = 5
    tiles.setTileAt(location, assets.tile`ActiveCheckpointFinal`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SnowLandBoss, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-100)
    scene.cameraShake(3, 100)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Aegnor,
    assets.animation`Walk right0`,
    100,
    true
    )
    Direction = 1
})
controller.combos.attachCombo("DDDDDDDDDD", function () {
    tiles.placeOnTile(Aegnor, tiles.getTileLocation(97, 210))
})
function createSnowBoss () {
    SnowMiniBoss = sprites.create(assets.image`MiniBossDesertVariant2`, SpriteKind.SnowLandBoss)
    SnowMiniBoss.follow(Aegnor, 45)
    SnowMiniBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
    SnowHealth = statusbars.create(20, 4, StatusBarKind.SnowStatus)
    SnowHealth.attachToSprite(SnowMiniBoss)
    SnowHealth.value = 200
    SnowHealth.setColor(2, 4, 5)
    SnowHealth.setLabel("HP")
    SnowHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
}
function staminaMeter () {
    StaminaMeter = statusbars.create(20, 4, StatusBarKind.Energy)
    StaminaMeter.value = 200
    StaminaMeter.positionDirection(CollisionDirection.Top)
    StaminaMeter.setColor(8, 10, 9)
    StaminaMeter.setLabel("Stamina")
    daggerCount = 200
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`LavaChest`, function (sprite2, location) {
    Aegnor.x += 60
    game.showLongText("???. BURN IN THE LAVA BELOW!!!", DialogLayout.Top)
    game.showLongText("Aegnor: No", DialogLayout.Top)
    game.showLongText("???: As a great golem, I shall not allow this insolence to continue!", DialogLayout.Top)
    tiles.setTileAt(location, assets.tile`Heart Spawner`)
    createLavaBoss()
    tiles.placeOnTile(LavaMiniBoss, location)
    music.play(music.createSong(assets.song`Monster Intro`), music.PlaybackMode.InBackground)
    LavaAliv3 = 2
    tiles.setTileAt(tiles.getTileLocation(97, 147), assets.tile`myTile31`)
    tiles.setTileAt(tiles.getTileLocation(116, 147), assets.tile`myTile31`)
    tiles.setTileAt(tiles.getTileLocation(117, 138), assets.tile`myTile31`)
    tiles.setWallAt(tiles.getTileLocation(97, 147), true)
    tiles.setWallAt(tiles.getTileLocation(116, 147), true)
    tiles.setWallAt(tiles.getTileLocation(117, 138), true)
})
controller.combos.attachCombo("LLUULLDDLLAA", function () {
    game.splash("Yup")
    bossKilled += 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    coinCount += 1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.DesertLandBoss, function (sprite5, otherSprite4) {
    if (DesertHealth.value > 0) {
        sprites.destroy(sprite5, effects.spray, 100)
        if (dmgincreaseCount == 0) {
            DesertHealth.value += -5
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 1) {
            DesertHealth.value += -6
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 2) {
            DesertHealth.value += -7
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount == 3) {
            DesertHealth.value += -8
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        } else if (dmgincreaseCount >= 4) {
            DesertHealth.value += -10
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
        }
    } else if (DesertHealth.value <= 0) {
        scene.cameraShake(5, 500)
        game.showLongText("Golem: Even though I have lost, there are still more to fight.", DialogLayout.Top)
        game.showLongText("Aegnor: I fear nothing, because that's how this works.", DialogLayout.Top)
        game.showLongText("One of the Four Golems of the Elements have been defeated. Congratulations.", DialogLayout.Center)
        hearTcontainer = sprites.create(assets.image`myImage0`, SpriteKind.superHeart)
        hearTcontainer.setPosition(DesertMiniBoss.x, DesertMiniBoss.y)
        sprites.destroy(DesertMiniBoss, effects.disintegrate, 1000)
        bossKilled += 1
        DesertAliv3 = 1
        desertDefeat = true
        tiles.setTileAt(tiles.getTileLocation(35, 149), sprites.dungeon.stairNorth)
        tiles.setWallAt(tiles.getTileLocation(35, 149), true)
    }
})
controller.combos.attachCombo("UUUUUUUUU", function () {
    info.changeLifeBy(1010)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Aegnor)
    Direction = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`checkpointSnow`, function (sprite, location) {
    checkpoint = 3
    tiles.setTileAt(location, assets.tile`ActivecheckpointSnow`)
    deathCount = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lavaaShop`, function (sprite, location) {
    Aegnor.x += 30
    if (shopOpen == false) {
        game.showLongText("Shopkeeper: Welcome", DialogLayout.Bottom)
        shopOpen = true
        sprites.destroyAllSpritesOfKind(SpriteKind.LavaLandBoss)
        shopMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Health Increase", assets.image`HeartExplosion`),
        miniMenu.createMenuItem("Damage Increase", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f f f f . . f f f f f f . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . f f f f f f . . f f f f f f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f f f f f f . . f f f f f f . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Speed Up", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f . . f f f f f f f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many coins?", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many can I buy?"),
        miniMenu.createMenuItem("Exit")
        )
        shopMenu.setPosition(Aegnor.x, Aegnor.y)
        shopMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0 && coinCount >= 20) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                permaHeartCount += 1
                coinCount += -20
                info.changeLifeBy(1)
                game.showLongText("Shopkeeper: Thank you for your purchase.", DialogLayout.Top)
            } else if (selectedIndex == 1 && coinCount >= 25) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                dmgincreaseCount += 1
                coinCount += -15
                game.showLongText("Shopkeeper: Thank you for your purchase. This only affects boss enemies as normal enemies die in one hit anyway.", DialogLayout.Top)
            } else if (selectedIndex == 2 && coinCount >= 10) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                speedCount += 1
                coinCount += -10
                game.showLongText("Shopkeeper: Thank you for your purchase. This will take into affect after you have been defeated once.", DialogLayout.Top)
            } else if (selectedIndex == 3) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                Aegnor.sayText(coinCount, 2000, false)
            } else if (selectedIndex == 4) {
                shopOpen = false
                game.showLongText("Shopkeeper: You can buy 5 speed upgrades, 5 damage upgrades, and 6 health upgrades. You can technically can buy more, but they won't do anything.", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 0 && coinCount < 20) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 1 && coinCount < 25) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 2 && coinCount < 10) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 5) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
            }
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Heart Spawner0`, function (sprite, location) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(3)
    tiles.setTileAt(location, assets.tile`myTile6`)
})
function randomDialogue () {
    if (Math.percentChance(5)) {
        game.showLongText("???: Go away!", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: It's dangerous out there!", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Leave. I don't want you attracting monsters!", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("-Silence-", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("Nobody answers the knock", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Who's there?", DialogLayout.Top)
        game.showLongText("Aegnor: Me", DialogLayout.Top)
        game.showLongText("???: I don't care", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Be quiet... We don't know what or who it is.", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("Attempted silence but Aegnor hears footsteps", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("An enemy jumps out and attacks", DialogLayout.Top)
        info.changeLifeBy(-1)
    } else if (Math.percentChance(5)) {
        game.showLongText("An enemy jumps out and attacks; Aegnor narrowly dodges and hits the enemy", DialogLayout.Top)
        info.changeLifeBy(1)
    } else if (Math.percentChance(5)) {
        game.showLongText("You found some food and restore some life", DialogLayout.Top)
        info.changeLifeBy(1)
    } else if (Math.percentChance(5)) {
        game.showLongText("You found some food, but it's rotten", DialogLayout.Top)
        info.changeLifeBy(-1)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Watch out for enemies. They're everywhere.", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: AHHHHH!!!!! DANGER!!!!!!", DialogLayout.Top)
        game.showLongText("Aegnor hears smashing of glass as someone runs away from the door", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Don't knock, it might attract attention!", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Shoo, your stepping on my lawn", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Leave this town. It's too dangerous.", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Be careful, there are many perilous monsters awaiting you", DialogLayout.Top)
    } else if (Math.percentChance(5)) {
        game.showLongText("???: Is it a sales person?", DialogLayout.Top)
        game.showLongText("Aegnor: No", DialogLayout.Top)
    } else if (Math.percentChance(4)) {
        game.showLongText("Aegnor: Is anybody home?", DialogLayout.Top)
        game.showLongText("???: No. The house is empty and there's TOTALLY no one here.", DialogLayout.Top)
        game.showLongText("Aegnor: Ok...", DialogLayout.Top)
    } else if (Math.percentChance(1)) {
        game.showLongText("???: It's dangerous to go alone! Take this.", DialogLayout.Top)
        info.changeLifeBy(5)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Aegnor,
    assets.animation`Walk down0`,
    100,
    true
    )
    Direction = 2
})
function burstAttack () {
    for (let index = 0; index <= 3; index++) {
        if (index > 0) {
            Xloc = index * 0
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 2 2 5 2 2 2 2 f . . . . 
                . . f 5 2 5 2 5 2 5 2 2 f . . . 
                . . f 5 2 5 2 2 5 2 2 5 f . . . 
                . . f 2 2 5 2 5 2 2 2 2 f . . . 
                . . f 2 5 5 2 2 2 2 5 2 f . . . 
                . . f 2 5 2 2 5 5 2 2 5 f . . . 
                . . f 2 5 2 2 5 2 2 5 2 f . . . 
                . . f 2 2 2 5 5 2 5 5 2 f . . . 
                . . . f 2 5 2 2 2 2 2 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, FinalBoss, Xloc, 60 - Xloc)
            BossProjectile.setKind(SpriteKind.BossPRojectile)
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 2 2 5 2 2 2 2 f . . . . 
                . . f 5 2 5 2 5 2 5 2 2 f . . . 
                . . f 5 2 5 2 2 5 2 2 5 f . . . 
                . . f 2 2 5 2 5 2 2 2 2 f . . . 
                . . f 2 5 5 2 2 2 2 5 2 f . . . 
                . . f 2 5 2 2 5 5 2 2 5 f . . . 
                . . f 2 5 2 2 5 2 2 5 2 f . . . 
                . . f 2 2 2 5 5 2 5 5 2 f . . . 
                . . . f 2 5 2 2 2 2 2 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, FinalBoss, Xloc * -1, 60 - Xloc)
            BossProjectile.setKind(SpriteKind.BossPRojectile)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1010, 1, 255, 99, 100, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    tiles.setTileAt(location, assets.tile`myTile6`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GrassLandBoss, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-100)
    scene.cameraShake(3, 100)
})
info.onLifeZero(function () {
    deathCount += 1
    if (deathCount <= 5) {
        DESTROYEVERTHING()
        playerDead = true
        sprites.destroy(Aegnor)
        scene.centerCameraAt(2, 4)
        deathMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Continue"),
        miniMenu.createMenuItem("Try Again")
        )
        deathMenu.setFrame(img`
            ..................................................................
            ............fff........fff.............fff..............ffff......
            ...........fddbf......fbdbf...........fbdbf............fbddf......
            ...........fddbbf.....fdddffff........fdddffff...fff..ffddbff.....
            ...........fddddffffffbdddbddbffffffffbdddbddbffffddffddddddf.....
            ...fff....fdddddfddddddddbbddddddddddddddbbddddddfdddddbccddf.....
            .fffddf..fddffffddddddddddbbddddddddddddddbbdddddffbddbbddff......
            .fdbddfffddfffdddfffffbdddbddbffffffffbdddbddbfffefddccbddf.......
            .fdddcddddffeffffeeeeefbdbfddfeeeeeeeefbdbfddfeeeefffcddddf.......
            .fbddcddddfeeeeeeeeeeeefffffffeeeeeeeeefffffffeeeeeeefdddddf......
            ..ffdbbbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffddf.....
            ...fddbcddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddfff..
            ....fddccffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddddf.
            ....fdddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffddddf.
            ...fddbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdfddbbf.
            ...fddfffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdfddbf..
            ...ffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddfff...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fbddbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fdddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fddbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbddbff..
            ..ffbbbbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdddddbf.
            .fbddbddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdddddddf.
            .fdddddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbddbddbf.
            .fbdddddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbbbbff..
            ..ffbddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbddf...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdddddf...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbddbf...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fbddbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fdddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fddbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbddbff..
            ..ffbbbbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdddddbf.
            .fbddbddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdddddddf.
            .fdddddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbddbddbf.
            .fbdddddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbbbbff..
            ..ffbddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbddf...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdddddf...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbddbf...
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ....fddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddf....
            ...fffddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffff...
            ..fbddfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffddf...
            .fbbddfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdbddf...
            .fddddfffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdddf....
            .fddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffccddf....
            ..fffddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddcbddf...
            .....fddfffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbbbdff..
            ......fdddddfeeeeeeefffffffeeeeeeeeefffffffeeeeeeeeeeeefddddcddbf.
            .......fddddcfffeeeefddfbdbfeeeeeeeefddfbdbfeeeeeffffeffddddcdddf.
            .......fddbccddfefffbddbdddbffffffffbddbdddbfffffdddfffddfffddbdf.
            ......ffddbbddbffdddddbbddddddddddddddbbddddddddddffffddf..fddfff.
            .....fddccbdddddfddddddbbddddddddddddddbbddddddddfdddddf....fff...
            .....fddddddffddffffbddbdddbffffffffbddbdddbffffffddddf...........
            .....ffbddff..fff...ffffdddf........ffffdddf.....fbbddf...........
            ......fddbf............fbdbf...........fbdbf......fbddf...........
            ......ffff..............fff.............fff........fff............
            ..................................................................
            `)
        deathMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                if (checkpoint == 1) {
                    createPlayer()
                    tiles.placeOnRandomTile(Aegnor, assets.tile`ActivecheckpointGrass0`)
                    deathMenu.close()
                    variableSetup()
                    speedSetup()
                } else if (checkpoint == 2) {
                    createPlayer()
                    tiles.placeOnRandomTile(Aegnor, assets.tile`ActivecheckpointSand`)
                    deathMenu.close()
                    variableSetup()
                    speedSetup()
                } else if (checkpoint == 3) {
                    createPlayer()
                    tiles.placeOnRandomTile(Aegnor, assets.tile`ActivecheckpointSnow`)
                    deathMenu.close()
                    variableSetup()
                    speedSetup()
                } else if (checkpoint == 4) {
                    createPlayer()
                    tiles.placeOnRandomTile(Aegnor, assets.tile`ActivecheckpointLava`)
                    deathMenu.close()
                    variableSetup()
                    speedSetup()
                } else if (checkpoint == 5) {
                    createPlayer()
                    tiles.placeOnRandomTile(Aegnor, assets.tile`ActiveCheckpointFinal`)
                    variableSetup()
                    speedSetup()
                    deathMenu.close()
                    tiles.setTileAt(tiles.getTileLocation(97, 205), sprites.dungeon.collectibleRedCrystal)
                    tiles.setTileAt(tiles.getTileLocation(97, 189), assets.tile`myTile13`)
                    tiles.setWallAt(tiles.getTileLocation(97, 189), false)
                } else {
                    game.showLongText("At this moment, Aegnor realized he never activated any checkpoints...", DialogLayout.Bottom)
                    game.gameOver(false)
                }
                if (grassDefeat == false) {
                    tiles.setTileAt(tiles.getTileLocation(47, 13), sprites.dungeon.chestClosed)
                }
                if (desertDefeat == false) {
                    tiles.setTileAt(tiles.getTileLocation(35, 153), assets.tile`DesertChest0`)
                }
                if (snowDefeat == false) {
                    tiles.setTileAt(tiles.getTileLocation(177, 16), assets.tile`SnowChest0`)
                }
                if (lavaDefeat == false) {
                    tiles.setTileAt(tiles.getTileLocation(101, 142), assets.tile`LavaChest0`)
                }
            } else if (selectedIndex == 1) {
                game.splash("Aegnor lost in battle valiantly.")
                game.gameOver(false)
            }
            tiles.setTileAt(tiles.getTileLocation(34, 12), sprites.castle.tileDarkGrass3)
            tiles.setTileAt(tiles.getTileLocation(34, 13), sprites.castle.tileDarkGrass3)
            tiles.setTileAt(tiles.getTileLocation(34, 14), sprites.castle.tileDarkGrass3)
            tiles.setWallAt(tiles.getTileLocation(34, 12), false)
            tiles.setWallAt(tiles.getTileLocation(34, 13), false)
            tiles.setWallAt(tiles.getTileLocation(34, 14), false)
            tiles.setTileAt(tiles.getTileLocation(35, 149), sprites.dungeon.stairNorth)
            tiles.setWallAt(tiles.getTileLocation(35, 149), false)
            tiles.setTileAt(tiles.getTileLocation(97, 147), assets.tile`myTile18`)
            tiles.setTileAt(tiles.getTileLocation(116, 147), assets.tile`myTile18`)
            tiles.setTileAt(tiles.getTileLocation(117, 138), assets.tile`myTile18`)
            tiles.setWallAt(tiles.getTileLocation(97, 147), false)
            tiles.setWallAt(tiles.getTileLocation(116, 147), false)
            tiles.setWallAt(tiles.getTileLocation(117, 138), false)
        })
    } else if (deathCount > 5) {
        game.splash("Aegnor lost in battle too many times and has lost the will to continue.")
        game.gameOver(false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`checkpointDesert`, function (sprite, location) {
    checkpoint = 2
    tiles.setTileAt(location, assets.tile`ActivecheckpointSand`)
    deathCount = 0
})
function housingCreation () {
    for (let index = 0; index < 125; index++) {
        if (Math.percentChance(17)) {
            House = sprites.create(assets.image`House1`, SpriteKind.Housing)
        } else if (Math.percentChance(17)) {
            House = sprites.create(assets.image`House2`, SpriteKind.Housing)
        } else if (Math.percentChance(17)) {
            House = sprites.create(assets.image`House3`, SpriteKind.Housing)
        } else if (Math.percentChance(17)) {
            House = sprites.create(assets.image`House4`, SpriteKind.Housing)
        } else if (Math.percentChance(16)) {
            House = sprites.create(assets.image`House5`, SpriteKind.Housing)
        } else if (Math.percentChance(16)) {
            House = sprites.create(assets.image`House6`, SpriteKind.Housing)
        }
        tiles.placeOnRandomTile(House, assets.tile`myTile29`)
    }
}
function createPlayer () {
    Aegnor = sprites.create(assets.image`AegnorStandard`, SpriteKind.Player)
    scene.cameraFollowSprite(Aegnor)
    heartSetup()
    staminaMeter()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.SandlandEnemy, function (sprite7, otherSprite5) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    otherSprite5.destroy(effects.halo, 200)
    enemyCount += -1
    coinCreation()
    coin.setPosition(otherSprite5.x, otherSprite5.y)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Housing, function (sprite, otherSprite) {
    if (Direction == 0) {
        randomDialogue()
        sprite.y += 25
    } else if (Direction == 1) {
        sprite.x += -25
    } else if (Direction == 2) {
        sprite.y += -25
    } else if (Direction == 3) {
        sprite.x += 25
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    if (bossKilled < 4) {
        game.showLongText("You have not defeated the 4 great golems. Return when you have defeated them.", DialogLayout.Top)
        Aegnor.y += -50
    } else if (bossKilled >= 4) {
        game.showLongText("UNLOCKED!", DialogLayout.Top)
        game.showLongText("Aegnor: Here we go!", DialogLayout.Top)
        tiles.setTileAt(location, assets.tile`myTile13`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.FNLBOSSASSIST, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-100)
    scene.cameraShake(3, 100)
})
function createDesertBoss () {
    DesertMiniBoss = sprites.create(assets.image`MiniBossDesertVariant0`, SpriteKind.DesertLandBoss)
    DesertMiniBoss.follow(Aegnor, 45)
    DesertMiniBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
    DesertHealth = statusbars.create(20, 4, StatusBarKind.DesertStatus)
    DesertHealth.attachToSprite(DesertMiniBoss)
    DesertHealth.value = 150
    DesertHealth.setColor(2, 4, 5)
    DesertHealth.setLabel("HP")
    DesertHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
}
statusbars.onZero(StatusBarKind.Energy, function (status) {
    pause(1000)
    daggerCount = 200
    StaminaMeter.value = 200
})
function createLavaBoss () {
    LavaMiniBoss = sprites.create(assets.image`MiniBossDesertVariant1`, SpriteKind.LavaLandBoss)
    LavaMiniBoss.follow(Aegnor, 45)
    LavaMiniBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
    LavaHealth = statusbars.create(20, 4, StatusBarKind.LavaStatus)
    LavaHealth.attachToSprite(LavaMiniBoss)
    LavaHealth.value = 300
    LavaHealth.setColor(2, 4, 5)
    LavaHealth.setLabel("HP")
    LavaHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
}
controller.combos.attachCombo("RRLLUUDD", function () {
    coinCount += 20
    Aegnor.sayText("+20", 200, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`grassShop`, function (sprite, location) {
    Aegnor.y += -40
    if (shopOpen == false) {
        game.showLongText("Shopkeeper: Welcome", DialogLayout.Bottom)
        shopOpen = true
        sprites.destroyAllSpritesOfKind(SpriteKind.GrasslandEnemy)
        shopMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Health Increase", assets.image`HeartExplosion`),
        miniMenu.createMenuItem("Damage Increase", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f f f f . . f f f f f f . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . f f f f f f . . f f f f f f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f . . . . . . . . . . . . f . 
            . f f f f f f . . f f f f f f . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Speed Up", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f . . f f f f f f f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f . . . . . f . . . 
            . . . f . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many coins?", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . f . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . . . . . f . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("How many can I buy?"),
        miniMenu.createMenuItem("Exit")
        )
        shopMenu.setPosition(Aegnor.x, Aegnor.y)
        shopMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0 && coinCount >= 20) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                permaHeartCount += 1
                coinCount += -20
                info.changeLifeBy(1)
                game.showLongText("Shopkeeper: Thank you for your purchase.", DialogLayout.Top)
            } else if (selectedIndex == 1 && coinCount >= 25) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                dmgincreaseCount += 1
                coinCount += -15
                game.showLongText("Shopkeeper: Thank you for your purchase. This only affects boss enemies as normal enemies die in one hit anyway.", DialogLayout.Top)
            } else if (selectedIndex == 2 && coinCount >= 10) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                speedCount += 1
                coinCount += -10
                game.showLongText("Shopkeeper: Thank you for your purchase. This will take into affect after you have been defeated once.", DialogLayout.Top)
            } else if (selectedIndex == 3) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
                Aegnor.sayText(coinCount, 2000, false)
            } else if (selectedIndex == 4) {
                shopOpen = false
                game.showLongText("Shopkeeper: You can buy 5 speed upgrades, 5 damage upgrades, and 6 health upgrades. You can technically can buy more, but they won't do anything.", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 0 && coinCount < 20) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 1 && coinCount < 25) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 2 && coinCount < 10) {
                shopOpen = false
                game.showLongText("Shopkeeper: Sorry, you don't have enough to purchase this", DialogLayout.Top)
                shopMenu.close()
                sprites.destroy(shopMenu)
            } else if (selectedIndex == 5) {
                shopOpen = false
                shopMenu.close()
                sprites.destroy(shopMenu)
            }
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SandlandEnemy, function (sprite8, otherSprite6) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
    scene.cameraShake(3, 100)
    otherSprite6.destroy(effects.fire, 200)
    enemyCount += -1
    coinCreation()
    coin.setPosition(otherSprite6.x, otherSprite6.y)
})
function DESTROYEVERTHING () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Piece)
    sprites.destroyAllSpritesOfKind(SpriteKind.Monster)
    sprites.destroyAllSpritesOfKind(SpriteKind.MiniBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    sprites.destroyAllSpritesOfKind(SpriteKind.MiniBossAssisnt)
    sprites.destroyAllSpritesOfKind(SpriteKind.GrasslandEnemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.SnowlandEnemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.SandlandEnemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.LowerBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.GrassLandBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.DesertLandBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.SnowLandBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.LavaLandBoss)
    sprites.destroyAllSpritesOfKind(SpriteKind.FNLBOSSASSIST)
    sprites.destroyAllSpritesOfKind(SpriteKind.BossPRojectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.coin)
    sprites.destroyAllSpritesOfKind(SpriteKind.superHeart)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shop)
    sprites.destroyAllSpritesOfKind(SpriteKind.Loadr)
}
function createGrassBoss () {
    GrassMiniBoss = sprites.create(assets.image`MiniBossDesertVariant3`, SpriteKind.GrassLandBoss)
    GrassMiniBoss.follow(Aegnor, 45)
    GrassMiniBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
    GrassHealth = statusbars.create(20, 4, StatusBarKind.GrassStatus)
    GrassHealth.attachToSprite(GrassMiniBoss)
    GrassHealth.value = 100
    GrassHealth.setColor(2, 4, 5)
    GrassHealth.setLabel("HP")
    GrassHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    music.play(music.createSong(assets.song`Monster Intro`), music.PlaybackMode.InBackground)
    GrassAliv3 = 2
}
let FNLbossAssistant: Sprite = null
let angle = 0
let waveDirection = false
let BossProjctileFollowEdition: Sprite = null
let wallProjectile: Sprite = null
let SandEnemy: Sprite = null
let SnowEnemy: Sprite = null
let GrassEnemy: Sprite = null
let House: Sprite = null
let deathMenu: miniMenu.MenuSprite = null
let BossProjectile: Sprite = null
let Xloc = 0
let DesertHealth: StatusBarSprite = null
let defeated = false
let GrassHealth: StatusBarSprite = null
let GrassAliv3 = 0
let AssistHealth: StatusBarSprite = null
let Sword_Slash: Sprite = null
let StaminaMeter: StatusBarSprite = null
let daggerCount = 0
let playerDead = false
let bossAlive = 0
let SnowAliv3 = 0
let SnowMiniBoss: Sprite = null
let SnowHealth: StatusBarSprite = null
let checkpoint = 0
let GrassMiniBoss: Sprite = null
let shopMenu: miniMenu.MenuSprite = null
let BOSSDEFEATED = false
let LavaAliv3 = 0
let LavaMiniBoss: Sprite = null
let hearTcontainer: Sprite = null
let LavaHealth: StatusBarSprite = null
let bossBar: StatusBarSprite = null
let FinalBoss: Sprite = null
let Direction = 0
let DesertAliv3 = 0
let DesertMiniBoss: Sprite = null
let coin: Sprite = null
let enemyCount = 0
let shopOpen = false
let coinCount = 0
let lavaDefeat = false
let snowDefeat = false
let desertDefeat = false
let grassDefeat = false
let deathCount = 0
let bossKilled = 0
let Aegnor: Sprite = null
let permaHeartCount = 0
let dmgincreaseCount = 0
let speedCount = 0
let battleBegin = false
scene.setBackgroundImage(assets.image`Intro Image`)
game.showLongText("Aegnor's Adventure", DialogLayout.Center)
game.showLongText("You, Aegnor, are a sky traveler. You walk amongst the clouds and live free. Until one day, the sky turned black with the shadow of a massive creature. The shadow landed just out of view to the south. Being the skilled adventurer you are, so set out to figure out what it is. Along the way you must find 4 treasures along the way to defeat whatever evil it may be. ", DialogLayout.Center)
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111ddd9999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111dddd99999999999999999999999999999999999999999999999999999999999
    9999999999999999999999dd999999999999999999999999999999999999999999999999999999999999999999111111111ddd9999999999999999999999999999999999999999999999999999999999
    999999999999999999911ddddd999999999999999999999999999999999999999999999999999999999999999111111111111dd999999999999999999999999999999999999999999999999999999999
    9999999999999999991111111dd9999999999999999999999999999999999999999999999999999999ddddddd111111111111dd999999999999999999999999999999999999999999999999999999999
    99999999999999999911111111d99999999999999999999999999999999999999999999999999999dddddddddd11111111111dd199999999999999999999999999999999999999999999999999999999
    99999999999999999111111111dd191ddd9999999999999999999999999999999999999999999999dd111111d1111111111111d111999999999999999999999999999999999999999999999999999999
    99999999999999999111111111dd11ddddddddd9999999999999999999999999999999999999999dd111111111111111111111111119ddd9999999999999999999999999999999999999999999999999
    99999999999999999111111111dd11111111ddddd99999999999999999999999999999999999991dd11111111111111111111111111dddddd99999999999999999999999999999999999999999999999
    999999991dddddddd1111111111d11111111ddddd1999999999999999999999999999999999999dd11111111111111111111111111dd111ddd9999999999999999999999999999999999999999999999
    9999999ddddddddddd1111111111111111111111111999999999999999999999999999999999991d11111111111111111111111111dd1111dd9999999999999999999999999999999999999999999999
    9999991dd11111111dd111111111111111111111111199999999999999999999999999999999dddd11111111dd11111111111111111111111dd999999999999999999999999999999999999999999999
    999999dd1111111111111111111111111111111111119999999999999999999999999999999ddd1dd111111dd111111111111111111111111dd999999999999999999999999999999999999999999999
    99999dd1111111111111111111111111111111111111999999999999999999999999999999ddd1111111111dd111111111111111111111111dd999999999999999999999999999999999999999999999
    99999dd1111111111111111111111dd1111111111111999999999999999999999999999999dd1111111111111111111111111111111111111dd999999999999999999999999999999999999999999999
    99999111111111111111111111111dd1111111111111999999999999999999999999999999d1111111111111111111111111111111111111dd9999999999999999999999999999999999999999999999
    999991111111111111111111111111dd1111111111b1999999999999999999999999999999d1111111111111111111111111111111111111dd9999999999999999999999999999999999999999999999
    999999111111111111111111111111dd11bbb111bbb999999999999999999999999999999911111111111111111111111111dd111111111dd99999999999999999999999911dddd99999999999999999
    999999111111111111111111111111ddbbbbbbbbbb9999999999999999999999999999999911111111111111111111111111dd111111111d1999999999999999999999911111ddddd999999999999999
    99999991bb1111111111bbb111111bbb99999119999999999999999999999999999999999991111111111111111111111111dd11111111111999999999999999999999111111111ddd99111119999999
    99999999bbbbbbbbbbbbbbbbbbbbbbb999999999999999999999999999999999999999999999bbbbbbbbbbb1111111111111dd111111111199999999999999999ddddd1111111111ddd1111dd1199999
    9999999991bbbbbbbbbb9991bbbbb19999999999999999999999999999999999999999999999bbbbbbbbbbbbb11111111111ddbbbbbbbbb99999999999999999ddddddddd11111111dd1111dddd19999
    999999999999999999999999911199999999999999999999999999999999999999999999999999999999999bbbb1111111bbdbbbbbbb99999999999999999991d111111dd11111111dd1111111dd9999
    99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbbbbbbbbbb9999999999999999999d999991111111111111111111111111111dd9999
    9999999999999999999999999999999999999999999999999999999999ddddd99999999999999999999999999999bbbbb9999999999999999999dddddddddd1111111111111111111111111111dd1999
    999999999999999999999999999999999999999999999999dddddddddddddddddd9999999999999999999999999999999999999999999999999ddd11111ddddd11111111111111111111111111dd9999
    999999999999999999999999999999999999999999999911ddd111dddd111111dddd9999999999999999999999999999999999999999999999911111111111dd11111111111111111111111111dd9999
    999999999999999999999999999999999999ddddddddd1111111111dd111111111ddd999999999999999999999999999999999999999999999911111111111111111111111111111111111111dd19999
    99999999999999999999999999999999991dddddd1ddddd111111111111111111111dd119999999999999999999999999999999999999999999111111111111111111111111dd11111111111dd199999
    999999999999999999999999999999991111111111111dddd11111111111111111111d111111dd9999999999999999999999999999999999999111111111111111111111111dd11111111111d1199999
    99999999999999999999999999999991dd1111111111111dd11111111111111111111d111111dddd999999999999999999999999999999999999111111111111111111111ddddd111111111b19999999
    999999999999999999999999991ddddddddd1111111111111111111111111111111111111111111dd999999999999999999999999999999999999bbbbbbbbbbbbb111bbbbbbbbbbbbbbbbbbb99999999
    99999999999999999999999991111111111111111111111111111111111111dd1111111111111111dd99999999999999999999999999999999999bbb9999999bbbbbbbbbbbb99999999bbb9999999999
    99999999999999999999999991111111111111111111111111111111111111dd11111111111111111d999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999111111111111111111111111111111111111111dd1111111111111111d999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999911111111111111111111111111111111111111dd11111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999911111111111bbbbb1111dd1111bbbbbbbbbb11d111111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999991bbb111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb119999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999bbbbbbbbb9999999bb9999999999999999999bbbbbbbbbbbbbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999d999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111d99999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999111111dd1111111dd99999999999999999999999999999999991111111d999999999999999ddd9999999999999999999999999999999999999999999999
    99999999999999999999999999999999999999111111d11111111dd99999999999999999999999999999991111111111d99999999991111111dd99999999999999999999999999999999999999999999
    9999999999999999999999911ddd9999999999911111d111111111dd9999999999999999999999999999911111111111d9999999991111111111d9999999999999999999999999999999999999999999
    9999999999999999999911111111d999999999911111d11111111111d99999999999999999999999999911111111d1111d999999111111111111d9999999999999999999999999999999999999999999
    9999999999999999991111111111dd999999991111dd111111111111dd9999999999999999999999999111111111d11111d199911111111111111d999999999999999999999999999999999999999999
    999999999999999991ddd11111111d999999991111111111111111111d99999999999999999999999911111111111d111111111111111111111111d99999999999999999999999999999999999999999
    9999999999999991dd11111111111d999999911111111111111111111d99999999999999999911111111111111111d1111111111111111111111111d9999999999999999999999999999999999999999
    999999999999991d1111111111111d99999991111111111111111111dd99999999999999999111111111111d11111d1111111111111111111111111d9999999999999999999999999999999999999999
    99999999999991d1111111111111111111111111111111111111111dd9999999999999999911dd11111111d111111d111111111111111d111111111d9999999999999999999999999999999999999999
    999999999999111111111111111111111ddd1111111111111111111999999999999999999911d111111111d111111d111111111111111d111111111d9999999999999999999999999999999999999999
    999999999911111111111111111111111d111111111111111111111111d9999999999999991d111111111d1111111d111111111111111d111111111d9999999999999999999999999999999999999999
    9999999911111111111111111111111111dd1111111111111111111111dd999999999999991d11111111d1111111d1111111111111111d111111111d9999999999999999999999999999999999999999
    9999999111111111111111111111111111dd111111111111111111111111d1999999999999111111111d1111111111111111111111111d111111111d9999999999999999999999999999999999999999
    999999999991111111111111111111111111111111111111111111111111d199999999999911111111d1111111111111111111111111d111111111119999999999999999999999999999999999999999
    999999999991111111111111b11111111111111111111111111111111111111999999999991111111111111111111111111111111111d11111111bbb9999999999999999dddd99999999999999999999
    9999999999bb11bbbbbbbbbbb1bb11111111111111bbbbb1111111111111111999999999991111111111111111111111111111111111d111bbbbb999999999999999999d1111ddd99999999999999999
    99999999999bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1111b111111bb99999999999bbbbbbbbbbbbbb111111111111111111d11bbb999999999999999999991111111111ddd99999999999999
    999999999999bbb999999999999999999999999999999bbbbbbbbbbbbbbbbbbb99999999999999999999999bbbb111111111111111d111bb9999999999999999999911111111111dddd9999999999999
    99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbb1111111111111111bb999999999999999999911111111111111dddd999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbb11111111111111bb999999999999999999911111111111111111dd999999999991
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbb11111111111bb9999999999999999999111111111111111111ddd99999999911
    99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbb1111111bb9999999999999999999911d111111111111111dddd9999999911
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbb11111bb99999999999999999999911d1111111111111111ddd9999999111
    99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbb11bb9999999999999999999991111d111111111111111111111111dd11
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbb999999999999999999999911111d1111111111111111111111111dd1
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999b9999999999999999999991111111d1111111111111111111111111dd1
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111dd11111111111111111111111111dd1
    99999999999999999999999991119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111dd111111111111111111111111111dd1
    99999999999999999999111111111111d999999999999999999999999999999999999999999999999d9999999999999999999999999999999999999b1111111111111111111111111111111111111dd1
    999999999999999999111111111111111dd99999999999999999999999999999999999999999911111dd99999999999999999999999999999999999bb111111111111111111111111111111111111d11
    9999999999999999111111111111111111ddd999999999999999999999999999999999999999111111ddddd999999999999999999999999999999999bb11111111111111bb111111111dddd11111dd11
    99999999999999911111111111111111111ddd999999999999999999999999999999999999911111111dddd99999999999999999999999999999999999b111111111bbbbbbbbb11111ddddd111111111
    99999999999991111111111111d111111111dddd99999999999999999999999999999999991111111111dddddd99911111111d99999999999999999999bbbbbbbbbbb999999bbbbb111dddd111111111
    999999999991111111d1111111d1111111111d1dd99999999999999999999999999999999111111111111ddddd11111111111dd999999999999999999999bb99999999999999999bbbbbbbbbbbbbbbbb
    91111111111111111d11111111d11111111111dddd999999999999999999999999999999111111111d11111111111111111111d999999999999999999999999999999999999999999999999999999bbb
    91111111111111ddd111111111d1111111111111ddd99999999999999999999999999dd1111111111d11111111111111111111dd99999999999999999999999999999999999999999999999999999999
    b1111111111ddd11111111111d11111111111111ddddd99999999999999999999999d1111111111111d1111111111111111111ddd9999999999999999999999999999999999999999999999999999999
    9b11111dddd11111111111111d1111111111111111dddd99999999999999999999dd11111111111111d11111111111111111111ddd999999999999999999999999999999999999999999999999999999
    99bb1111111111111111111dd1111111111111111111ddddddd9999999999999dd1111111111111111d11111111111111d111111ddd99999999999999999999999999999999999999999999999999999
    9999bb11111111111111111d111111111111111111111111119999999999991d11111111111111111d111111111111111d1111111ddd9999999999999999999999999999999999999999999999999999
    999999b111111111111111d111111111111111111111111111119999999999111111111111111111d1111111111111111d11111111111999999999999999999999999999999999999999999999999999
    9999999bb111111111111d111111111111111111111111111111999999999911111111ddd1111111d1111111111111111d11111111111199999999999999999999999999999999999999999999999999
    99999999bb1111111111111111111111111111111111111111119999999991111111dd111111111111111111111111111d11111111111119999999999999999999999999999999999999999999999999
    99999999bbb1111111111111111111111111111111d111111119999999991111111d11111111111111111111111111111d11111111111111999999999999999999999999999999999999999999999999
    999999999bbb11111111111111111111111ddddddd1d111111199999999911111dd111111111111111111111111111111d111111111111d1999999999999999999999999999999999999999999999999
    9999999999bbbbbbb1111111111111111111111111ddd11111b99999999111111d1111111111111111111111111111111d11111111111d11199999999999999999999999999999999999999999999999
    999999999999bbbbbbb111111111111111111111111111111bb9999999911111d11111111111111111111111111111111d11111111111d11199999999999999999999999999999999999999999999999
    999999999999999bbbbbbbb11bbbbbbbbbbbbbb11111111bbbb999999999111d11111111111111111d1111111111111dd111111111111111199999999999999999999999999999999999999999999999
    99999999999999999bbbbbbbbbb999999999999bbbbbbbbbbbb999999999b11d11111111111111111d1111111111111d1111111111111111999999999999999999999999999999999999999999999999
    999999999999999999999999999999999999999999999999999999999999b11111111111111111111d11111111111111111111111111111b999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999bb11111111111111111dd11111111111bbbbbb111111111111b9999999999999999999999999dd1111ddddd999999999999
    99999999999999999999999999999999999999999999999999999999999999bbbbbbbbbbb111111dd111111bbbbbbb99999bbbbb111111b99999999999999999999999ddd1d111111111dd9999999999
    9999999999999999999999999999999999999999999999999999999999999999999999bbbb11111d11111bbbbbbbb999999999bbbbbb11b9999999999999999999999dd111111111111111d99ddd9999
    999999999999999999999999999999999999999999999999999999999999999999999999bbbbbbbbbbbbbbbbbbbbb999999999999bbbbbb999999999999999999999dd11111111111111111dddddd999
    99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991dd1111111111111111111ddddddd9
    9999999999999999999999999999999999999999911ddddddd99999999999999999999999999999999999999999999999999999999999999999999999999999991dd11111111111111111111111ddd19
    9999999999999999999999999999999999999991111dddd1ddd999999999999999999999999999999999999999999999999999999999999999999999999999991dd111111111ddddd111111111111119
    9999999999999999999999999999999999991111111111dddd1199999999999999999999999999999999999999999999999999999999999999999999999999911d1111111111111dd111111111111119
    99999999999999999999999999999999111111111111111111dd11999999999dd9999999999999999999999999999999999999999999999999999999999999911d1111111111ddd11111111111111119
    999999999999999999999999999991111111111111111111111dd111dddddddddddd99999999999999999999999999999999999999999999999999999999991111111111111d11111111111111111119
    99999999999999999999999999911111111111111111111111111111111111111dddd999999999999999999999999999999999999999999999999999999991111111111111d111111111111111111119
    99999999999999999999999991111111111111dddd111111111111111111111111dddd99999999999999999999999999999999999999999999999999999911111111111111d111111111111111111111
    99999999999999999999999911111111111ddd1111d11111111111111111111111111dd999999999999999999999999999999999999999999999999999911111111111111111111111bbbb1111111111
    99999999999999999999999111111111111111111d111111111111111111111111111199999999999999999999999999999999999999999999999999991111111111111111111bbbbb999bbbbb111b1b
    999999999999999999999991111111111111ddddd11111111111111111111111111111999999999999999999999999999999999999999999999999999911111111111111111bb999999999999bbbbbbb
    999999999999999999999991111111111111111111111111111bb111111111111111119999999999999999999999999999999999999999999999999999b11111111111111bb999999999999999999999
    99999999999999999999999b11111111111111111111111111bbbb111111111111111199999999999999999999999999999999999999999999999999999b111111111111b99999999999999999999999
    999999999999999999999999bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb111bbbbb1111b1999999999999999999999999999999999999999999999999999999bbbbbbbbbbbb999999999999999999999999
    9999999999999999999999999999999999bbbbbbbbbbbbbbbbbbbbbbbbb99999bbbbb9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    `)
scroller.scrollBackgroundWithSpeed(-150, 0)
tiles.setCurrentTilemap(tilemap`World Map`)
scene.setBackgroundColor(7)
battleBegin = false
speedCount = 0
dmgincreaseCount = 0
permaHeartCount = 0
createPlayer()
controller.moveSprite(Aegnor, 100, 100)
tiles.placeOnRandomTile(Aegnor, assets.tile`Spawnspoint`)
variableSetup()
bossKilled = 0
deathCount = 0
grassDefeat = false
desertDefeat = false
snowDefeat = false
lavaDefeat = false
housingCreation()
coinCount = 0
shopOpen = false
game.onUpdateInterval(5000, function () {
    if (GrassAliv3 > 1) {
        for (let index = 0; index < randint(2, 6); index++) {
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 7 7 e 7 7 7 7 f . . . . 
                . . f e 7 e 7 e 7 e 7 7 f . . . 
                . . f e 7 e 7 7 e 7 7 e f . . . 
                . . f 7 7 e 7 e 7 7 7 7 f . . . 
                . . f 7 e e 7 7 7 7 e 7 f . . . 
                . . f 7 e 7 7 e e 7 7 e f . . . 
                . . f 7 e 7 7 e 7 7 e 7 f . . . 
                . . f 7 7 7 e e 7 e e 7 f . . . 
                . . . f 7 e 7 7 7 7 7 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, GrassMiniBoss, randint(-100, 100), randint(-100, 100))
            BossProjectile.setKind(SpriteKind.BossPRojectile)
        }
    } else if (DesertAliv3 > 1) {
        for (let index = 0; index < randint(4, 8); index++) {
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f d d e d d d d f . . . . 
                . . f e d e d e d e d d f . . . 
                . . f e d e d d e d d e f . . . 
                . . f d d e d e d d d d f . . . 
                . . f d e e d d d d e d f . . . 
                . . f d e d d e e d d e f . . . 
                . . f d e d d e d d e d f . . . 
                . . f d d d e e d e e d f . . . 
                . . . f d e d d d d d f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, DesertMiniBoss, randint(-100, 100), randint(-100, 100))
            BossProjectile.setKind(SpriteKind.BossPRojectile)
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (playerDead == false) {
        if ((Aegnor.tileKindAt(TileDirection.Center, sprites.castle.tileDarkGrass3) || Aegnor.tileKindAt(TileDirection.Center, sprites.castle.tileGrass2)) && enemyCount <= 3) {
            music.play(music.createSong(hex`0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d`), music.PlaybackMode.InBackground)
            GrassEnemy = sprites.create(assets.image`GrassEnemy`, SpriteKind.GrasslandEnemy)
            GrassEnemy.lifespan = 15000
            GrassEnemy.follow(Aegnor, 50)
            tiles.placeOnRandomTile(GrassEnemy, sprites.castle.tileGrass2)
            GrassEnemy.setFlag(SpriteFlag.GhostThroughWalls, true)
            enemyCount += 1
        } else if (Aegnor.tileKindAt(TileDirection.Center, assets.tile`myTile1`)) {
            music.play(music.createSong(hex`0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d`), music.PlaybackMode.InBackground)
            SnowEnemy = sprites.create(assets.image`Snow`, SpriteKind.SnowlandEnemy)
            SnowEnemy.lifespan = 15000
            SnowEnemy.setFlag(SpriteFlag.GhostThroughWalls, true)
            SnowEnemy.follow(Aegnor, 70)
            tiles.placeOnRandomTile(SnowEnemy, assets.tile`myTile1`)
            enemyCount += 1
        } else if (Aegnor.tileKindAt(TileDirection.Center, sprites.castle.tilePath5)) {
            music.play(music.createSong(hex`0096000408010204001c00100500640000041e000004000000000000000000000000000a040004120000000400011d04000800011b08000c00011d06001c00010a006400f401640000040000000000000000000000000000000002120000000400011d04000800011b08000c00011d`), music.PlaybackMode.InBackground)
            SandEnemy = sprites.create(assets.image`DesertEnem`, SpriteKind.SandlandEnemy)
            SandEnemy.lifespan = 15000
            SandEnemy.setFlag(SpriteFlag.GhostThroughWalls, true)
            SandEnemy.follow(Aegnor, 60)
            tiles.placeOnRandomTile(SandEnemy, sprites.castle.tilePath5)
            enemyCount += 1
        }
    }
})
game.onUpdateInterval(40, function () {
    if (defeated) {
        DESTROYEVERTHING()
        music.play(music.createSong(hex`0078000408020100001c00010a006400f401640000040000000000000000000000000005000004420000000400011d04000800012008000c0001240c001000011b10001400011d1400180001201c002000011d20002400012024002800012434003800012a38004000012a`), music.PlaybackMode.UntilDone)
        pause(1000)
        tiles.setCurrentTilemap(tilemap`dump`)
        scene.setBackgroundImage(assets.image`Another Intro Image`)
        game.showLongText("Aegnor lands the final blow to the great fire beast, saving the sky realm. He is now a hero of legends.", DialogLayout.Bottom)
        game.setGameOverMessage(true, "Thank you for playing")
        effects.confetti.endScreenEffect()
        game.gameOver(true)
    }
})
game.onUpdateInterval(2500, function () {
    if (SnowAliv3 > 1) {
        for (let index = 0; index < randint(6, 10); index++) {
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 1 1 9 1 1 1 1 f . . . . 
                . . f 9 1 9 1 9 1 9 1 1 f . . . 
                . . f 9 1 9 1 1 9 1 1 9 f . . . 
                . . f 1 1 9 1 9 1 1 1 1 f . . . 
                . . f 1 9 9 1 1 1 1 9 1 f . . . 
                . . f 1 9 1 1 9 9 1 1 9 f . . . 
                . . f 1 9 1 1 9 1 1 9 1 f . . . 
                . . f 1 1 1 9 9 1 9 9 1 f . . . 
                . . . f 1 9 1 1 1 1 1 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SnowMiniBoss, randint(-100, 100), randint(-100, 100))
            BossProjectile.setKind(SpriteKind.BossPRojectile)
        }
    } else if (LavaAliv3 > 1) {
        for (let index = 0; index < randint(8, 12); index++) {
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 2 2 5 2 2 2 2 f . . . . 
                . . f 5 2 5 2 5 2 5 2 2 f . . . 
                . . f 5 2 5 2 2 5 2 2 5 f . . . 
                . . f 2 2 5 2 5 2 2 2 2 f . . . 
                . . f 2 5 5 2 2 2 2 5 2 f . . . 
                . . f 2 5 2 2 5 5 2 2 5 f . . . 
                . . f 2 5 2 2 5 2 2 5 2 f . . . 
                . . f 2 2 2 5 5 2 5 5 2 f . . . 
                . . . f 2 5 2 2 2 2 2 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, LavaMiniBoss, randint(-100, 100), randint(-100, 100))
            BossProjectile.setKind(SpriteKind.BossPRojectile)
        }
    }
})
forever(function () {
    while (bossAlive > 1) {
        pause(5000)
        for (let index = 0; index < randint(3, 6); index++) {
            BossProjectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 2 2 5 2 2 2 2 f . . . . 
                . . f 5 2 5 2 5 2 5 2 2 f . . . 
                . . f 5 2 5 2 2 5 2 2 5 f . . . 
                . . f 2 2 5 2 5 2 2 2 2 f . . . 
                . . f 2 5 5 2 2 2 2 5 2 f . . . 
                . . f 2 5 2 2 5 5 2 2 5 f . . . 
                . . f 2 5 2 2 5 2 2 5 2 f . . . 
                . . f 2 2 2 5 5 2 5 5 2 f . . . 
                . . . f 2 5 2 2 2 2 2 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, FinalBoss, randint(1, 100), randint(1, 100))
            BossProjectile.lifespan = 5000
            BossProjectile.setKind(SpriteKind.BossPRojectile)
        }
    }
})
forever(function () {
    while (bossAlive > 1) {
        pause(6000)
        for (let index = 0; index < 3; index++) {
            if (Math.percentChance(50)) {
                wallProjectile = sprites.createProjectileFromSprite(img`
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    `, FinalBoss, 25, 0)
                wallProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                wallProjectile.lifespan = 5000
                wallProjectile.setKind(SpriteKind.BossPRojectile)
                pause(1000)
            } else if (Math.percentChance(50)) {
                wallProjectile = sprites.createProjectileFromSprite(img`
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    `, FinalBoss, -25, 0)
                wallProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                wallProjectile.lifespan = 5000
                wallProjectile.setKind(SpriteKind.BossPRojectile)
                pause(1000)
            }
        }
    }
})
forever(function () {
    while (bossAlive > 1) {
        pause(15000)
        for (let index = 0; index < 2; index++) {
            BossProjctileFollowEdition = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 2 2 5 2 2 2 2 f . . . . 
                . . f 5 2 5 2 5 2 5 2 2 f . . . 
                . . f 5 2 5 2 2 5 2 2 5 f . . . 
                . . f 2 2 5 2 5 2 2 2 2 f . . . 
                . . f 2 5 5 2 2 2 2 5 2 f . . . 
                . . f 2 5 2 2 5 5 2 2 5 f . . . 
                . . f 2 5 2 2 5 2 2 5 2 f . . . 
                . . f 2 2 2 5 5 2 5 5 2 f . . . 
                . . . f 2 5 2 2 2 2 2 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, FinalBoss, 25, 25)
            BossProjctileFollowEdition.lifespan = 5000
            BossProjctileFollowEdition.setKind(SpriteKind.BossPRojectile)
            BossProjctileFollowEdition.follow(Aegnor, 75)
        }
    }
})
forever(function () {
    while (LavaAliv3 > 1) {
        pause(10000)
        for (let index = 0; index < 2; index++) {
            BossProjctileFollowEdition = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f . . . . . 
                . . . f 2 2 5 2 2 2 2 f . . . . 
                . . f 5 2 5 2 5 2 5 2 2 f . . . 
                . . f 5 2 5 2 2 5 2 2 5 f . . . 
                . . f 2 2 5 2 5 2 2 2 2 f . . . 
                . . f 2 5 5 2 2 2 2 5 2 f . . . 
                . . f 2 5 2 2 5 5 2 2 5 f . . . 
                . . f 2 5 2 2 5 2 2 5 2 f . . . 
                . . f 2 2 2 5 5 2 5 5 2 f . . . 
                . . . f 2 5 2 2 2 2 2 f . . . . 
                . . . . f f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, LavaMiniBoss, 25, 25)
            BossProjctileFollowEdition.lifespan = 5000
            BossProjctileFollowEdition.setKind(SpriteKind.BossPRojectile)
            BossProjctileFollowEdition.follow(Aegnor, 75)
        }
    }
})
forever(function () {
    while (SnowAliv3 > 1) {
        pause(5000)
        for (let index = 0; index < 3; index++) {
            if (Math.percentChance(50)) {
                wallProjectile = sprites.createProjectileFromSprite(img`
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    `, SnowMiniBoss, 25, 0)
                wallProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                wallProjectile.lifespan = 5000
                wallProjectile.setKind(SpriteKind.BossPRojectile)
                pause(1000)
            } else if (Math.percentChance(50)) {
                wallProjectile = sprites.createProjectileFromSprite(img`
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    3 2 
                    2 3 
                    `, SnowMiniBoss, -25, 0)
                wallProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                wallProjectile.lifespan = 5000
                wallProjectile.setKind(SpriteKind.BossPRojectile)
                pause(1000)
            }
        }
    }
})
forever(function () {
    while (bossAlive > 1) {
        pause(2000)
        burstAttack()
        pause(2000)
        waveDirection = true
        angle = 50
        while (waveDirection) {
            if (bossAlive) {
                BossProjectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . f f f f f f f . . . . . 
                    . . . f 2 2 5 2 2 2 2 f . . . . 
                    . . f 5 2 5 2 5 2 5 2 2 f . . . 
                    . . f 5 2 5 2 2 5 2 2 5 f . . . 
                    . . f 2 2 5 2 5 2 2 2 2 f . . . 
                    . . f 2 5 5 2 2 2 2 5 2 f . . . 
                    . . f 2 5 2 2 5 5 2 2 5 f . . . 
                    . . f 2 5 2 2 5 2 2 5 2 f . . . 
                    . . f 2 2 2 5 5 2 5 5 2 f . . . 
                    . . . f 2 5 2 2 2 2 2 f . . . . 
                    . . . . f f f f f f f . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, FinalBoss, angle, 50)
                BossProjectile.setKind(SpriteKind.BossPRojectile)
            } else {
                break;
            }
            angle += -10
            pause(300)
            if (angle < -40) {
                waveDirection = false
            }
            pause(300)
        }
        pause(2000)
        burstAttack()
        pause(2000)
        while (waveDirection == false) {
            if (bossAlive) {
                BossProjectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . f f f f f f f . . . . . 
                    . . . f 2 2 5 2 2 2 2 f . . . . 
                    . . f 5 2 5 2 5 2 5 2 2 f . . . 
                    . . f 5 2 5 2 2 5 2 2 5 f . . . 
                    . . f 2 2 5 2 5 2 2 2 2 f . . . 
                    . . f 2 5 5 2 2 2 2 5 2 f . . . 
                    . . f 2 5 2 2 5 5 2 2 5 f . . . 
                    . . f 2 5 2 2 5 2 2 5 2 f . . . 
                    . . f 2 2 2 5 5 2 5 5 2 f . . . 
                    . . . f 2 5 2 2 2 2 2 f . . . . 
                    . . . . f f f f f f f . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, FinalBoss, angle, 50)
                BossProjectile.setKind(SpriteKind.BossPRojectile)
            } else {
                break;
            }
            angle += 10
            pause(300)
            if (angle > 40) {
                waveDirection = true
            }
        }
    }
})
game.onUpdateInterval(30000, function () {
    if (battleBegin) {
        FNLbossAssistant = sprites.create(assets.image`MiniBossDesertVariant4`, SpriteKind.FNLBOSSASSIST)
        FNLbossAssistant.follow(Aegnor, 25)
        tiles.placeOnRandomTile(FNLbossAssistant, sprites.dungeon.floorLight2)
        FNLbossAssistant.setFlag(SpriteFlag.GhostThroughWalls, true)
        AssistHealth = statusbars.create(20, 4, StatusBarKind.AssistStatus)
        AssistHealth.attachToSprite(FNLbossAssistant)
        AssistHealth.value = 50
        AssistHealth.setColor(2, 4, 5)
        AssistHealth.setLabel("HP")
        AssistHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        music.play(music.createSong(assets.song`Monster Intro`), music.PlaybackMode.InBackground)
        pause(200)
    }
})
