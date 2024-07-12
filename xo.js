let grid=[
  [0,0,0],
  [0,0,0],
  [0,0,0]
];
let who=false;
function delay(time) {
  return new Promise(resolve => setTimeout(resolve,time));
}
//who is first
start();
async function start() {
  let choose=Math.floor(Math.random()*2);
  if (choose===0) {
    document.getElementById('start').innerHTML='you go second'
    await delay(1000);
    document.getElementById('start').innerHTML='<br>'
    computer()
  } else {
    document.getElementById('start').innerHTML='you go first'
    who=true;
    await delay(2000);
    document.getElementById('start').innerHTML='<br>'
  } 
}

function computer() {
  let line=Math.floor(Math.random()*3);
  let colomn=Math.floor(Math.random()*3);
  if (grid[line][colomn]===0&&!result()) {
    document.getElementById(`${line}${colomn}`).innerHTML=`<img class="game" src="o.png">`;
    grid[line][colomn]=1;
    who=true;
    result();
  } else {
    computer()
  }
}

async function xo(line,colomn) {
  if (grid[line][colomn]===0&&who&&!result()) {
    document.getElementById(`${line}${colomn}`).innerHTML=`<img class="game" src="x.png">`;
    grid[line][colomn]=2;
    who=false;
    result()
    await delay(1000);
    computer()
  }
}

function result() {
  let p = document.getElementById('sd');
  const showResult = (message) => {
    p.innerHTML = `<p id="score">${message}</p>
    <button id="retry"><a href="xo.html"><img id="arrow" src="refresh.png"></a></button>`;
  };

  const checkLine = (a, b, c) => grid[a[0]][a[1]] === grid[b[0]][b[1]] && grid[b[0]][b[1]] === grid[c[0]][c[1]] && grid[a[0]][a[1]] !== 0;

  const lines = [
    [[0, 0], [0, 1], [0, 2]], // row 1
    [[1, 0], [1, 1], [1, 2]], // row 2
    [[2, 0], [2, 1], [2, 2]], // row 3
    [[0, 0], [1, 0], [2, 0]], // column 1
    [[0, 1], [1, 1], [2, 1]], // column 2
    [[0, 2], [1, 2], [2, 2]], // column 3
    [[0, 0], [1, 1], [2, 2]], // diagonal 1
    [[2, 0], [1, 1], [0, 2]]  // diagonal 2
  ];

  for (const line of lines) {
    if (checkLine(...line)) {
      if(grid[line[0][0]][line[0][1]] === 1) {
        showResult('you lost');
        return 'computer';
      }else {
        showResult('you won');
        return 'human';
      }
    }
  }

  if (grid.every(row => row.every(cell => cell !== 0))) {
    showResult("It's a tie!");
    return 'tie';
  }

  return '';
}

