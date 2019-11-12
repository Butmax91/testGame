class Game{
    constructor(){
        this.app = document.querySelector('.app');
        this.length = 2;
        this.init();
    }
    init(){
        this.mainData = [];
        this.userFirst = Math.random() > 0.5;
        this.pos = [0,0];
        this.gameOver = false;
        this.addEvent();
        this.createData();
        this.userFirst ? this.activeteCell() :  this.computerMove();this.activeteCell();

    }
    checkGameOver(player){
        let checkArr = [];
        this.mainData.forEach((row)=>{
            row.forEach((td)=>{
                checkArr.push(td);
            })
        });

        for (let i = 0; i <= this.length  ; i++) {
            let row = [];
            let col = [];
            let diagonal = [];
            let diagonalReverse = [];
            checkArr.forEach((el)=>{
                if (el.coords[0] === i){
                    row.push(el);
                }
                if (el.coords[1] === i){
                    col.push(el);
                }
                if (el.coords[1] ===  el.coords[0] ){
                    diagonal.push(el);
                }
                if ((el.coords[1] +  el.coords[0]) === this.length){
                    diagonalReverse.push(el);
                }
            });
            if (row.filter((el, index, arr) => {
                return el.value === arr[0].value && el.value !== null
            }).length === row.length){
                console.log(player, ' win');
                this.gameOver = true;
                return

            }
            if (col.filter((el, index, arr) => {
                return el.value === arr[0].value && el.value !== null
            }).length === col.length){
                console.log(player, ' win');
                this.gameOver = true;
                return
            }
            if (diagonal.filter((el, index, arr) => {
                return el.value === arr[0].value && el.value !== null
            }).length === diagonal.length){
                console.log(player, ' win');
                this.gameOver = true;
                return
            }
            if (diagonalReverse.filter((el, index, arr) => {
                return el.value === arr[0].value && el.value !== null
            }).length === diagonalReverse.length){
                console.log(player, ' win');
                this.gameOver = true;
                return
            }

        }
        if(!checkArr.find(el => el.value === null)){
            console.log('no winners');
            this.gameOver = true;
        }
    }
    createData(){
        for (let i = 0; i <= this.length ; i++) {
            let row = [];
            for (let j = 0; j <= this.length; j++) {
                let td = {
                    coords: [i,j],
                    isActive: false,
                    value: null
                };
                row.push(td);
            }
            this.mainData.push(row);
        }
        this.createTable();
    }
    computerMove(){
        if (!this.gameOver){
            let dataArr = [];
            this.mainData.forEach((row)=>{
                row.forEach((td)=>{
                    dataArr.push(td)
                })
            });
            dataArr.find(x=>x.value===null).value = this.userFirst ? "0": 'X';

            this.drowTable();
            this.checkGameOver('computer');
        }

    }
    drowTable(){
        let table = document.querySelector('table');
        this.mainData.forEach((row,i)=>{
            let tr = table.querySelectorAll('tr')[i];
            row.forEach((tData,j)=>{
                let td = tr.querySelectorAll('td')[j];
                tData.isActive ? td.classList.add('active'): td.classList.remove('active');
                td.innerHTML = tData.value;
            })
        })
    }
    createTable(){
        let table = document.createElement('table');
        this.mainData.forEach((row)=>{
            let tr = document.createElement('tr');
            row.forEach((tData)=>{
                let td = document.createElement('td');
                tr.appendChild(td);
            });
            table.appendChild(tr)
        });
        this.app.appendChild(table);
    }
    activeteCell(){
        this.mainData.forEach((row)=>{
            row.forEach((tData)=>{
                if (tData.coords[0] === this.pos[0] && tData.coords[1] === this.pos[1]){
                    tData.isActive = true;
                }else{
                    tData.isActive = false
                }
            })
        });
        this.drowTable();
    }
    addEvent(){
       document.addEventListener('keydown',(e)=>{
           switch (e.code) {
               case 'ArrowDown':{
                   this.pos[0] === this.length ? this.pos[0] = 0: this.pos[0]++;
                   this.activeteCell();
                   break;
               }
               case 'ArrowLeft':{
                   this.pos[1] === 0 ? this.pos[1] = this.length: this.pos[1]--;
                   this.activeteCell();
                   break;

               }
               case 'ArrowRight':{
                   this.pos[1] === this.length ? this.pos[1] = 0: this.pos[1]++;
                   this.activeteCell();
                   break;
               }
               case 'ArrowUp':{
                   this.pos[0] === 0 ? this.pos[0] = this.length: this.pos[0]--;
                   this.activeteCell();
                   break;
               }
               case 'Enter':{
                   if (!this.gameOver){
                       this.mainData.forEach((row)=>{
                           row.forEach((tData)=>{
                               if (tData.coords[0] === this.pos[0] && tData.coords[1] === this.pos[1] && tData.value === null){
                                   tData.value = !this.userFirst ? "0": 'X';
                                   this.drowTable();
                                   this.checkGameOver('player');
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
