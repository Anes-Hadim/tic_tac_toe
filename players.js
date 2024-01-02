let grid=[
  [0,0,0],
  [0,0,0],
  [0,0,0]
];
let who=0;
function delay(time) {
  return new Promise(resolve => setTimeout(resolve,time));
}

start();
async function start() {
  let choose=Math.floor(Math.random()*2);
  if (choose===0) {
    document.getElementById('start').innerHTML='X first'
    who=1;
  } else {
    document.getElementById('start').innerHTML='O first'
    who=2;
  } 
}

function xo(line,colomn) {
  if (who===2) {
    O(line,colomn);
  } else if (who===1) {
    X(line,colomn);
  }
}

function O(line,colomn) {
  if (grid[line][colomn]===0&&!result()) {
    document.getElementById('start').innerHTML='X turn'
    document.getElementById(`${line}${colomn}`).innerHTML=`<img class="game" src="o.png">`;
    grid[line][colomn]=1;
    who=1;
    result();
  }
}

function X(line,colomn) {
  if (grid[line][colomn]===0&&!result()) {
    document.getElementById('start').innerHTML='O turn';
    document.getElementById(`${line}${colomn}`).innerHTML=`<img class="game" src="x.png">`;
    grid[line][colomn]=2;
    who=2;
    result();
  }
}

function result() {
  let p=document.getElementById('sd');
  let l1=grid[0][0]===grid[0][1]&&grid[0][1]===grid[0][2];
  let l2=grid[1][0]===grid[1][1]&&grid[1][1]===grid[1][2];
  let l3=grid[2][0]===grid[2][1]&&grid[2][1]===grid[2][2];
  let c1=grid[0][0]===grid[1][0]&&grid[1][0]===grid[2][0];
  let c2=grid[0][1]===grid[1][1]&&grid[1][1]===grid[2][1];
  let c3=grid[0][2]===grid[1][2]&&grid[1][2]===grid[2][2];
  let d1=grid[0][0]===grid[1][1]&&grid[1][1]===grid[2][2];
  let d2=grid[2][0]===grid[1][1]&&grid[1][1]===grid[0][2];
  if (l1&&grid[0][0]!==0){
    document.getElementById('start').innerHTML='<br>';
    grid[0][0]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  } else if (l2&&grid[1][0]!==0) {
    document.getElementById('start').innerHTML='<br>';
    grid[1][0]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  }else if (l3&&grid[2][0]!==0) {
    document.getElementById('start').innerHTML='<br>';
    grid[2][0]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  } else if (c1&&grid[0][0]!==0) {
    document.getElementById('start').innerHTML='<br>';
    grid[0][0]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  } else if (c2&&grid[0][1]!==0) {
    document.getElementById('start').innerHTML='<br>';
    grid[0][1]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  } else if (c3&&grid[0][2]!==0) {
    document.getElementById('start').innerHTML='<br>';
    grid[0][2]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  }else if ((d1&&grid[1][1]!==0)||(d2&&grid[1][1]!==0)) {
    document.getElementById('start').innerHTML='<br>';
    grid[1][1]===1 ? p.innerHTML=`<p id="score">O won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>` : p.innerHTML=`<p id="score">X won</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
  } else if (grid.every(row => row.every(cell => cell !== 0))) {
    document.getElementById('start').innerHTML='<br>';
    p.innerHTML = `<p id="score">It's a tie!</p>
    <button id="retry"><a href="players.html"><img id="arrow" src="refresh.png"></a></button>`;
    return true;
   } else return false;
}