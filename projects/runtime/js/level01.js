var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 800, "y": 360 },
                { "type": "sawblade", "x": 1100, "y": groundY},
                { "type": "sawblade", "x": 600, "y": 275},
                { "type": "sawblade", "x": 1200, "y": 360 },
                { "type": "sawblade", "x": 1500, "y": 275},
                { "type": "moon", "x": 500, "y": 230},
                { "type": "moon", "x": 700, "y": 230},
                { "type": "moon", "x": 1000, "y": 230},
                {"type": "enemy", "x":800, "y":  groundY-50 },
                {"type": "enemy", "x":1400, "y":  groundY-50},
                {"type": "enemy", "x":2000, "y":  groundY-50},
                {"type": "enemy", "x":2200, "y":  groundY-50},
                {"type": "enemy", "x":2500, "y": groundY-50},
                
            ]
        };
        
        for ( var i=0; i< levelData.gameItems.length; i++) {
            if (levelData.gameItems[i].type === "sawblade") {
                    createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if (levelData.gameItems[i].type === "moon") {
                    createMoon(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if (levelData.gameItems[i].type === "enemy") {
                createEnemy(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
        }
        
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createMoon (x, y) {
            var moonHitZoneSize = 25;
            var moonDamageFromObstacle= -10;
            var moonHitZone = game.createObstacle(moonHitZoneSize, moonDamageFromObstacle);
            moonHitZone.x = x;
            moonHitZone.y = y;
            game.addGameItem(moonHitZone);
            var moonObstacleImage = draw.bitmap('img/moon.png');
            moonObstacleImage.scaleX = 0.2;
            moonObstacleImage.scaleY = 0.2;
            moonHitZone.addChild(moonObstacleImage);
            moonObstacleImage.x = -25;
            moonObstacleImage.y = -25;
        }
        
        
        function createEnemy (x,y) {
        var enemy =  game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'black');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -5
        enemy.rotationalVelocity = -2
        enemy.onPlayerCollision = function() {
            game.changeIntegrity(-15);
        }
        enemy.onProjectileCollision = function() {
            enemy.fadeOut()
            game.increaseScore(50);
        }
        
        }
        
        
        
        
        
        
        
        
        
        
        // DO NOT EDIT CODE BELOW HERE
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
