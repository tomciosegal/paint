// const canvas = document.getElementById('foto');    
// const draw = canvas.getContext('2d');
    
// draw.beginPath();
// draw.lineTo(20,20);
// draw.lineTo(50,80);
// draw.lineTo(100,80);
// draw.lineTo(150,20);
// draw.stroke();

const canvas = document.getElementById('paint');


const paint = {
    ctx: canvas.getContext('2d'),
    isPainting: false,
    operation: 'draw',
    pencil: document.getElementById('pencil'),
    rubber: document.getElementById('rubber'),
    delete: document.getElementById('delete'),

    mouseDownEvent: function(){
        canvas.addEventListener('mousedown', this.mouseDown.bind(this));  
    },

    mouseDown: function(e){
        this.isPainting = true;
        if(this.operation == 'rubber'){
            this.ctx.strokeStyle = '#fff';
        }
        this.ctx.beginPath();
        this.ctx.moveTo(e.x,e.y);
    },

    mouseMoveEvent: function(){
        canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    },

    mouseMove: function(e){
        if(this.isPainting == true){
                this.ctx.lineTo(e.x, e.y);
                this.ctx.stroke();         
        }
    },

    mouseUpEvent: function(){
        document.addEventListener('mouseup', this.mouseUp.bind(this));
    },

    mouseUp: function(){
        this.isPainting = false;
    },

    rubberEvent: function(){
        this.rubber.addEventListener('click', this.rubberOperation.bind(this));
    },

    rubberOperation: function(){
        this.operation = 'rubber';
    }
}

paint.mouseDownEvent();
paint.mouseMoveEvent();
paint.mouseUpEvent();
paint.rubberEvent();