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
    erase: document.getElementById('erase'),
    size: document.getElementById('size'),
    colors: document.querySelectorAll('[data-color]'),
    color:'#000',

    mouseDownEvent: function(){
        canvas.addEventListener('mousedown', this.mouseDown.bind(this));  
    },

    mouseDown: function(e){
        this.isPainting = true;
        this.ctx.lineWidth = this.size.value;
        this.ctx.strokeStyle = this.color;
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
            if(this.operation == 'rubber'){
                this.erase.style.top = e.y + 'px';
                this.erase.style.left = e.x + 'px';
            }
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
    },

    pencilEvent: function(){
        this.pencil.addEventListener('click', this.pencilSwitch.bind(this))
    },

    pencilSwitch: function(){
        this.operation = 'draw';
    },

    deleteEvent: function(){
        this.delete.addEventListener('click', this.deleteDraw.bind(this))
    },

    deleteDraw: function(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    sizeEvent: function(){
        this.size.addEventListener('change', this.changeSize.bind(this))
    },

    changeSize: function(){
        this.erase.style.width = this.size.value +'px';
        this.erase.style.height = this.size.value + 'px';
    },

    colorEvent: function(){
        for(let color of this.colors){
            color.addEventListener('click', this.colorChoice.bind(this));
        }
    },

    colorChoice: function(e){
        this.color = e.target.dataset.color
    }
}

paint.mouseDownEvent();
paint.mouseMoveEvent();
paint.mouseUpEvent();
paint.rubberEvent();
paint.pencilEvent();
paint.deleteEvent();
paint.sizeEvent();
paint.colorEvent();