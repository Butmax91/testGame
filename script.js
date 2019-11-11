class Game{
    constructor(){
        this.app = document.querySelector('.app');
        this.userFirst = Math.random() > 0.5;
        this.gameOver = false;
        this.init();
    }
    init(){
        this.create();
        this.addEvent();
        this.checkEndGame();
        if(!this.userFirst){
            this.computerMove();
        }
    }
    create(){
        this.currentPosition = [0,0];
        let container = document.createElement('table');
        for (let i = 0; i < 3 ; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < 3 ; j++) {
                let td = document.createElement('td');
                td.dataset.active = '0';
                td.dataset.value = '';
                td.dataset.y = i;
                td.dataset.x = j;
                if (i=== this.currentPosition[0] && j === this.currentPosition[1]){
                    td.classList.add('active');
                    td.dataset.active = '1';

                }
                tr.appendChild(td);
            }
            container.appendChild(tr);
        }
        this.app.appendChild(container)
    }
    computerMove(){
        this.checkEndGame();
        if (!this.gameOver){
            let td =  [...this.app.querySelectorAll('td')].find(x=>x.dataset.value === "");
            if (this.userFirst){
                td.dataset.value = '0';
                td.innerHTML = '0';
            }else{
                td.dataset.value = 'X';
                td.innerHTML = 'X';
            }
        }

    }
    activateCell(){
        this.app.querySelectorAll('table tr').forEach((tr,i)=>{
            tr.querySelectorAll('td').forEach((td,j)=>{
                if (i=== this.currentPosition[0] && j === this.currentPosition[1]){
                    td.dataset.active = '1';
                    td.classList.add('active');
                }else{
                    td.classList.remove('active');
                    td.dataset.active = '0';
                }
            })
        })
    }
    checkEndGame(){
        let td =  [...this.app.querySelectorAll('td')].find(x=>x.dataset.value === "");

        if (!td){
            this.gameOver = true;
        }
    }
    addEvent(){
       document.addEventListener('keydown',(e)=>{
           switch (e.code) {
               case 'ArrowUp':{
                   this.currentPosition[0] = this.currentPosition[0] === 0 ?  2 : this.currentPosition[0] - 1;
                   this.activateCell();
                   break;
               }
               case 'ArrowLeft':{

                   this.currentPosition[1] = this.currentPosition[1] === 0 ?  2 : this.currentPosition[1] - 1;
                   this.activateCell();
                   break;
               }
               case 'ArrowRight':{
                   this.currentPosition[1] = this.currentPosition[1] === 2 ?  0 : this.currentPosition[1] + 1;
                   this.activateCell();
                   break;
               }
               case 'ArrowDown':{
                   this.currentPosition[0] = this.currentPosition[0] === 2 ?  0 : this.currentPosition[0] + 1;
                   this.activateCell();
                   break;
               }
               case 'Enter':{
                   if (this.userFirst){
                       this.app.querySelectorAll('table tr').forEach((tr,i)=>{
                           tr.querySelectorAll('td').forEach((td,j)=>{
                               if (td.dataset.active === '1' && td.dataset.value === ''){
                                   td.dataset.value = 'X';
                                   td.innerHTML = 'X';
                                   this.computerMove();
                               }
                           })
                       });

                   }else{
                       this.app.querySelectorAll('table tr').forEach((tr,i)=>{
                           tr.querySelectorAll('td').forEach((td,j)=>{
                               if (td.dataset.active === '1' && td.dataset.value === ''){
                                   td.dataset.value = '0';
                                   td.innerHTML = '0';
                                   this.computerMove();
                               }
                           })
                       });

                   }

                   break;
               }
               case 'Backspace':{
                   console.log('bs');
                   break;
               }
               default:{
                   console.log(e.code)
               }
           }
       })
    }

}


document.addEventListener('DOMContentLoaded',()=>{
    new Game();
})