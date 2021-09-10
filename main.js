
const px = PIXI;

const app = new px.Application({
    width: 500, 
    height: 500, 
    backgroundColor: 0x1099bb,
    antialias: true,
});
app.renderer.backgroundColor = 0x23395D;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.interactive = true;
document.body.appendChild(app.view);

let style = new px.TextStyle({
    fill: 'black',
    fontSize: 40,
    wordwrap:true,
});

const textureButton = PIXI.Texture.from('./btn.png');
const button = new PIXI.Sprite(textureButton);

    button.anchor.set(0.5);
    button.x = app.screen.width / 2;
    button.y = app.screen.height / 2;

    button.interactive = true;
    button.buttonMode = true;
    app.stage.addChild(button);
    button
    .on('pointerdown', Start)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut);


var numbers =[1,2,3,4,5,6,7,8,9];
shuffle(numbers);
var numsound = ['/sound/1.mp3','/sound/2.mp3', '/sound/3.mp3', 
'/sound/4.mp3', '/sound/5.mp3', '/sound/6.mp3','/sound/7.mp3',
'/sound/8.mp3','/sound/9.mp3'];
shuffle(numsound);

function Start() {
    app.stage.removeChild(button);
    var i = 0;
    new Audio('/sound/instruction.mp3').play();
    setTimeout(() =>  new Audio(numsound[0]).play(), 6000)
    for (let y = 0; y < 300; y+=120) {
        for (let x = 0; x <300; x+=120){
            let rectangle = new px.Graphics();
            rectangle.interactive = true;
            rectangle.buttonMode = true;
            rectangle.on('pointerdown', (event) => onClick(rectangle));
            rectangle.lineStyle(3, 0x887677, 1);
            rectangle.beginFill(0xFFFFFF);
            rectangle.drawRect(0,0,100,100);
            rectangle.endFill();
            rectangle.x = (app.screen.width / 2 + x)-170;
            rectangle.y = (app.screen.height/ 2 + y)-170;
            app.stage.addChild( rectangle );
            app.stage.setChildIndex( rectangle,  i );
            let message = new px.Text(numbers[i],style);
            message.x = (app.screen.width / 2 + x)-130;
            message.y = (app.screen.height / 2 + y)-140;
            i++
            app.stage.addChild( message );
        }
    }
}
var sumer=0;
var j =0;
var errors = 0;
function onClick(object) {
    let i = app.stage.getChildIndex(object);
    var audionum = new Audio (numsound[j]);
    var currnum = numsound[j].substr(-5, 1);
    var clicknum = numbers[i];
    let n=0;
    while (currnum != numbers[n]){
        n++;
    }
    if(j==8) {
        const end = px.Sprite.from('gameover.jpg');
        end.anchor.set(0.5);
        end.x = app.screen.width / 2;
        end.y = app.screen.height / 2;
        app.stage.addChild(end);
        let result = new px.Text('Ошибок - ' + sumer,style);
        result.x = app.screen.width / 2 - 110;
        result.y = app.screen.height / 2 - 250;
        app.stage.addChild( result );
    }
    if(currnum == clicknum){
        j++;
        object.tint = 0x80F195;
        audionum = new Audio(numsound[j]);
        setTimeout(() =>  audionum.play(), 1300)
        setTimeout(() =>  object.tint = 0xFFFFFF, 700)
        sumer += errors;
        errors = 0;
    }else if (errors>=1){
        new Audio('/sound/Ай.mp3').play();
        object.tint = 0xFF4D4D;
        setTimeout(() =>  object.tint = 0xFFFFFF, 300)
        app.stage.getChildAt(n).tint = 0x00ECEA;
        setTimeout(() =>  app.stage.getChildAt(n).tint = 0xFFFFFF, 700)
        errors++;
    }
    else{
        new Audio('/sound/Ой.mp3').play();
        object.tint = 0xFF4D4D;
        setTimeout(() =>  object.tint = 0xFFFFFF, 300)
        errors++;
    }
}

function onButtonOver() {
    this.isOver = true;
    this.tint = 0xA0EE45;
}
function onButtonOut() {
    this.isOver = false;
    this.tint =  0xFFFFFF;
}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
