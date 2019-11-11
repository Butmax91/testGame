class Game{
    constructor(){
        this.app = document.querySelector('.app');
        this.length = 2;
        this.init();
    }
    init(){
        this.mainData = [];
        this.userFirst = false //Math.random() > 0.5;
        this.pos = [0,0];
        this.gameOver = false;
        this.addEvent();
        this.createData();
        this.userFirst ? this.activeteCell() :  this.computerMove();

    }
    checkGameOver(){
        let checkArr = [];
        this.mainData.forEach((row,i)=>{


        });




    }
    createData(){
        for (let i = 0; i <= this.length ; i++) {
            let row = [];
            for (let j = 0; j <= this.length; j++) {
                let td = {
                    coords: [i,j],
                    isActive: false,
                    value: null
                }
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
            this.checkGameOver();
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
        })
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
                   this.mainData.forEach((row)=>{
                       row.forEach((tData)=>{
                           if (tData.coords[0] === this.pos[0] && tData.coords[1] === this.pos[1] && tData.value === null){
                               tData.value = !this.userFirst ? "0": 'X';
                               this.drowTable();
                               this.checkGameOver();
                               this.computerMove();
                           }
                       })
                   });
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