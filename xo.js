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
  if (!result(grid,false)) {
    let bestScore = -Infinity
    let bestMove;
    for(let i=0;i<3;i++) {
      for(let j=0;j<3;j++) {
        if(grid[i][j]===0) {
          grid[i][j]=1;
          let score = minimax(grid,0,false);
          grid[i][j]=0;
          if(score>bestScore) {
            bestScore = score;
            bestMove = [i,j];
          }
        }
      }
    }
    document.getElementById(`${bestMove[0]}${bestMove[1]}`).innerHTML=`<img class="game" src="o.png">`;
    grid[bestMove[0]][bestMove[1]]=1;
    who=true;
    result(grid,false);
  }
}

let scores = {
  computer: 1,
  human: -1,
  tie: 0
}

function minimax(board,depth, ismax) {
  let score = result(board,true);
  if (score !=='') {
    return scores[score]
  }

  if (ismax) {
    let bestScore = -Infinity
    for(let i=0;i<3;i++) {
      for(let j=0;j<3;j++) {
        if(board[i][j]===0) {
          board[i][j]=1;
          let score = minimax(board,depth+1,false);
          board[i][j]=0;
          if(score>bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity
    for(let i=0;i<3;i++) {
      for(let j=0;j<3;j++) {
        if(board[i][j]===0) {
          board[i][j]=2;
          let score = minimax(board,depth+1,true);
          board[i][j]=0;
          if(score<bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  }
}

async function xo(line,colomn) {
  if (grid[line][colomn]===0&&who&&!result(grid,false)) {
    document.getElementById(`${line}${colomn}`).innerHTML=`<img class="game" src="x.png">`;
    grid[line][colomn]=2;
    who=false;
    result(grid,false)
    await delay(1000);
    computer()
  }
}

function result(board,test) {
  let p = document.getElementById('sd');
  const showResult = (message) => {
    p.innerHTML = `<p id="score">${message}</p>
    <button id="retry"><a href="xo.html"><img id="arrow" src="refresh.png"></a></button>`;
  };

  const checkLine = (a, b, c) => board[a[0]][a[1]] === board[b[0]][b[1]] && board[b[0]][b[1]] === board[c[0]][c[1]] && board[a[0]][a[1]] !== 0;

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
      if(board[line[0][0]][line[0][1]] === 1) {
        !test && showResult('you lost');
        return 'computer';
      }else {
        !test && showResult('you won');
        return 'human';
      }
    }
  }

  if (board.every(row => row.every(cell => cell !== 0))) {
    !test && showResult("It's a tie!");
    return 'tie';
  }

  return '';
}

