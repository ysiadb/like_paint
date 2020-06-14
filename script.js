
let context;

class myToolBox {

    constructor() {
        this.canvas = document.getElementById('Canvas');
        this.context = this.canvas.getContext('2d');
        this.clic = false;
        this.tool = 'rectangle';
        this.startPosX = 0;
        this.startPosY = 0;
        this.endPosX = 0;
        this.endPosY = 0;
        this.instant;


        this.context.lineWidth = document.getElementById('largeur').value;
        this.context.strokeStyle = document.getElementById('color').value;
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';

    }

    createCanvas() {
        this.instant = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }


    DelCanvas() {
        this.context.putImageData(this.instant, 0, 0)
    }

    drawing() {
        this.context.strokeStyle = $('#color').value
        this.context.lineWidth = $('#largeur').value
        this.context.lineTo(this.endPosX, this.endPosY)
        this.context.stroke();
    }

    gomme() {
        this.context.clearRect(this.endPosX, this.endPosY, 20, 20)
    }

    square() {
        this.context.strokeStyle = $("#color").value
        this.context.lineWidth = $("#largeur").value
        DelCanvas()
        this.context.beginPath()
        this.context.rect(this.startPosX, this.startPosY, this.endPosX - this.startPosX, this.endPosY - this.startPosY)

        if ($('plein').checked) {
            this.context.fillStyle = $('#color').value
            this.context.fill()
        }
        else {
            this.context.stroke()
        }

    }

    trait()
    {
        context.strokeStyle = document.getElementById("color").value;
        context.lineWidth = document.getElementById('largeur').value;
        DelCanvas();
        context.beginPath();
        context.moveTo(this.startPosX, this.startPosY);
        context.lineTo(this.endPosX, this.endPosY);
        context.stroke();
    }

}



function mousemoove()
{

    paint.canvas.addEventListener('mousedown', function (e) {
        paint.startPosX = e.pageX - paint.canvas.offsetLeft;
        paint.startPosY = e.pageY - paint.canvas.offsetTop;
        paint.clic = true;
    })

    paint.canvas.addEventListener('mousemove', function(e) {
        paint.endPosX = e.pageX - paint.canvas.offsetLeft;
        paint.endPosY = e.pageY - paint.canvas.offsetTop;
    })

     paint.canvas.addEventListener('mouseup', function () {
        paint.clic = false;
    }, false);

}

function DetectTool()
{

}


$(document).ready(() => {
    console.info('Ready');
    var paint = new myToolBox()

    $('#Canvas').on('click', (e) => {
        console.info(e.pageX, e.pageY);

        if (!paint.clic) {
            console.log('ready');
            paint.context.beginPath();
            paint.context.moveTo(e.pageX, e.pageY);
            paint.clic = true;
        }
        else {
            paint.context.lineTo(e.pageX, e.pageY);
            paint.context.closePath();
            paint.context.stroke;
            paint.clic = false;
        }
    })


 
        if (paint.tool == "crayon") {
            paint.context.beginPath();
            paint.context.moveTo(paint.endPosX, paint.endPosY);
        }
        else if (paint.tool == "gomme") {
        }
        else if (paint.tool == "ligne") {
            paint.createCanvas();
            document.body.style.cursor = "default";
        }
        else if (paint.tool == "cercle") {
            paint.createCanvas();
            document.body.style.cursor = "default";
        }
        else if (paint.tool == "rectangle") {
            paint.createCanvas();
            document.body.style.cursor = "default";
        }

        if(paint.clic){
            if(paint.type == "crayon"){
                paint.drawing();
            }
            else if(paint.type == "gomme"){
                paint.gomme();
            }
            else if(paint.type == "ligne"){
                paint.trait();
                document.body.style.cursor = "default";
            }
            else if(paint.type == "cercle"){
                paint.circle();
                document.body.style.cursor = "default";
            }
            else if(paint.type == "rectangle"){
                paint.square();
                document.body.style.cursor = "default";
            }
        }

    document.getElementById("crayon").addEventListener('click', function () {
        paint.tool = "crayon";
    }, false);

    document.getElementById("gomme").addEventListener('click', function () {
        paint.tool = "gomme";
    }, false);

    document.getElementById("ligne").addEventListener('click', function () {
        paint.tool = "ligne";
        document.body.style.cursor = "default";
    }, false);

    document.getElementById("cercle").addEventListener('click', function () {
        paint.tool = "cercle";
        document.body.style.cursor = "default";
    }, false);

    document.getElementById("rectangle").addEventListener('click', function () {
        paint.tool = "rectangle";
        document.body.style.cursor = "default";
    }, false);

})