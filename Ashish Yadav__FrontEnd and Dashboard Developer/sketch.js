
let grid;
let grid_new;
let score=0;

function blankGrid(){
   return [[0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]];
}



//Basically this funtion will check for elements to the right and elements at down if elements at right and downside are equal then game is not over
function isGameOver(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]==0){
                return false;
            }
            if(j!==3 && grid[i][j]===grid[i][j+1]){
                return false;
            }
            if(i!==3 && grid[i][j]===grid[i+1][j]){
                return false;
            }
            
        }
    }
    return true;
}

function isGameWon(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]==2048){
                return true;
            }
        }
    }
    return false;
}
function setup(){
	createCanvas(500,500);
//    noLoop();
   grid=blankGrid();
//    grid_new=blankGrid();
    again_grid=blankGrid();
//    console.table(grid);
    addNumber();
    addNumber();
//    console.table(grid);

} 


function addNumber(){
	var choice=[];
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
           if(grid[i][j]===0){
           	choice.push({
           		x:i,    //created an object
           		y:j
           	});
           }
		}
	} 
  if(choice.length>0){
  let spot=random(choice);
  let r=random(1);
  grid[spot.x][spot.y]=r>0.1  ? 2 : 4;
  again_grid[spot.x][spot.y]=r>0.1  ? 2 : 4;     
  }
}

function resetgame(){
    
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
//     grid[i][j]=again_grid[i][j];
            return again_grid[i][j];
        }
    }
//     console.log(again_grid);
//    return ;
//   
}

function compare(a,b){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
           if(a[i][j] !== b[i][j]){
               return true;
           }
        }
    }
    return false;
}


function copyGrid(){
    let extraGrid=blankGrid();
    
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            extraGrid[i][j]=grid[i][j];
        }
    }
    return extraGrid;
}

function flip(){
    for(let i=0;i<4;i++){
        grid[i].reverse();
    }
    return grid;
}

function transposeGrid(grid,direction){
     
    let newGrid=blankGrid();
    for(let i=0;i<4;i++){
        for(j=0;j<4;j++){
           newGrid[i][j]=grid[j][i];
        }
    }
    return newGrid;
}


function keyPressed(){
//    console.log(keyCode);
    let flipped=false;
    let rotated=false;  //Assuming at initial game is played
    let gamePlayed=true; //Ass
    
    switch (keyCode){
            
        case DOWN_ARROW: 
            //
          break;
            
        case UP_ARROW:
            grid=flip(grid);
        flipped=true;
            break;
            
        case RIGHT_ARROW:
            grid =transposeGrid(grid);
         rotated=true;
          break;
        
        case LEFT_ARROW:
//            dir=-1;
           
        grid=transposeGrid(grid);
        grid=flip(grid); 
        rotated=true;
        flipped=true;
        break; 
        
        default:
            gamePlayed=false;
           
    }
//    if(keyCode===DOWN_ARROW){
//        
//    }
//    else if(keyCode===UP_ARROW){
//        flip(grid);
//        flipped=true;
//     }
//    
//    else if(keyCode==RIGHT_ARROW){
//        grid =transposeGrid(grid,dir);
//        rotated=true;
//    }
//    else if(keyCode==LEFT_ARROW){
//        dir=-1;
//        grid=transposeGrid(grid,dir);
//        rotated=true;
//    } 
//    else{
//        gamePlayed=false;
//    }
      
     if(gamePlayed){
        let past=copyGrid(grid);    //Here we have made copyGrid function to make new array equala to grid(main) array;
        for(let i=0;i<4;i++){
            grid[i]=slide(grid[i]);
            grid[i]=combineNumber(grid[i]);
            grid[i]=slide(grid[i]); 
        }
        let changed=compare(past, grid);   //Here we are comparig both array if arrays are not same means elemnts are changed and if changed then addNUmber
    
        if(flipped){
            grid=flip(grid);
        }
    
        if(rotated){
            grid=transposeGrid(grid);
        }
        if(changed){    //It also meansif(changed==true)
            addNumber();
        }
//         updateCanvas();
        let gameover=isGameOver();
         if(gameover){
//            console.log("Game Over Bad moves");
             
             alert("Sorry Not this Time Click The Reset Button To Play Again..");
          }
         let gamewon=isGameWon();
         if(gamewon){
             console.log("You Won and You will get what you u want from heart")
         }
     }
    
}
function draw(){
    background('#bbada0');
    noStroke();
    Drawgrid();
    select("#score_card").html(score);
    select("button").mousePressed(function(){
        location.reload(true);
    });
}


function slide(row){ 
    let arr=row.filter(value => value);
    let missing=4-arr.length;
    let zeroes=Array(missing).fill(0);
    arr=zeroes.concat(arr);
    return arr;
}



function combineNumber(row){
    for(let i=3;i>=1;i--){
        let a=row[i];
        let b=row[i-1];
        if(a==b){
            row[i]=a+b;
            score+=row[i];
            row[i-1]=0;
//            break;
        }
    }
    return row;
}


function Drawgrid(){
        let w=120;
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            let value=grid[i][j];
            let str=value.toString();
            
//            if(grid_new[i][j]==1){
//                stroke(200,0,200);
////                strokeWeight(4);
//                grid_new[i][j] = 0;
//            }
//            
//            else{
//               stroke(0); 
//            }
            if(value!=0){
            fill(colorSizes[str].color);
            }else{
                fill('#008000');
            }
            rect(i*w+15,j*w+15,w-10,w-10,8);
            
            
            if(grid[i][j]!==0){
                textAlign(CENTER,CENTER);
//                fill(0);
                   ///Here we have converted int into string for checking its length
//                let s_len=str.length-1;
//                let font_size=[64,64,40,16];   //here we have made array basis on str length if its 1 and 2 then size should be 64 and rest on size basis
//                let str="" + value;
                fill(colorSizes[str].tcolor);
                noStroke();
                textSize(colorSizes[str].size);
                text(value,i*w+w/2+10,j * w +w/2+10);
            }
        }
    }
}
