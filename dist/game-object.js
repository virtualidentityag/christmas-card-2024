export class GameObject {
    constructor(game, x, y, spritePath) {
        this.p5 = null;
        this.game = null;
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.sprite = null;
        this.spritePath = "";
        this.render = false;
        if (new.target === GameObject) {
            throw new TypeError("Cannot construct GameObject instances directly");
        }
        this.game = game;
        this.p5 = game.p5;
        this.x = x;
        this.y = y;
        this.spritePath = spritePath;
        this.p5.loadImage(this.spritePath, this.onImageLoaded.bind(this));
    }
    onImageLoaded(img) {
        this.sprite = img;
        this.onReady();
        this.render = true;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    draw() {
        if (!this.render) {
            return;
        }
        this.p5.image(this.sprite, this.x, this.y, this.width, this.height);
    }
    checkIntersection(gameObject) {
        if (this.x < gameObject.x + gameObject.width &&
            this.x + this.width > gameObject.x &&
            this.y < gameObject.y + gameObject.height &&
            this.y + this.height > gameObject.y) {
            return true;
        }
        return false;
    }
    onReady() { }
    ;
}
//# sourceMappingURL=game-object.js.map