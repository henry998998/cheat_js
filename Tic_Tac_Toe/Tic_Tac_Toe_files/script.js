const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// 出現勝利的條件
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let pospk = ['0','1','2','3','4','5','6','7','8']

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn
let findKey = (obj, value, compare = (a, b) => a === b) =>{
      return Object.keys(obj).find(k => compare(obj[k], value))
    }
startGame()

restartButton.addEventListener('click', startGame)

// 遊戲開始
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    // 只能點選一次=>再次點選不會觸發事件
    cell.addEventListener('click', handdleClick, { once: true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

// 點擊後觸發事件
function handdleClick(e) {
  // console.log('clicked')

  const cell = e.target
  
  // place Mark 填上圈圈或叉叉
  placeMark(cell, X_CLASS)
  
  // 1.Check For Win O或X勝利
  checkWin(X_CLASS,cell)


  
}
  
// 結束遊戲
function endGame(draw) {
  // 平手
  if(draw) {
    winningMessageTextElement.innerText = 'Draw!'
  
  // O或X勝利
  } else {
    // 出現 O's Wins! 或　X's Wins!
    winningMessageTextElement.innerText = `${circleTurn ? "O's" :　"X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}


// place Mark 填上圈圈或叉叉
function placeMark(cell, currentClass) {
  console.log(cell);
  cell.classList.add(currentClass);
}

// Check For Win 確認勝負
function checkWin(currentClass,cell=null) {
  if(WINNING_COMBINATION.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })){
    winningMessageTextElement.innerText = `${currentClass=='x' ? "X's" :　"O's"} Wins!`
    winningMessageElement.classList.add('show')
  }else{
    isDraw(cell)
  }
}

// Check For Draw 平手
function isDraw(cell=null) {
  if([...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || 
    cell.classList.contains(CIRCLE_CLASS)
  })){
    winningMessageTextElement.innerText = 'Draw!'
    winningMessageElement.classList.add('show')
  }else if(cell){
    //遊戲未結束 隨機幫圈圈選一個位子 並判定是否結束
    pospk.splice(findKey(pospk,cell.getAttribute('pospk')), 1);

    var index = Math.floor((Math.random()*pospk.length))
    placeMark(document.querySelector("div[pospk='"+pospk[index]+"']"),CIRCLE_CLASS)
    document.querySelector("div[pospk='"+pospk[index]+"']").removeEventListener('click', handdleClick);
    pospk.splice(index, 1)
    checkWin(CIRCLE_CLASS)
  }
}

function setBoardHoverClass() {
  pospk = ['0','1','2','3','4','5','6','7','8']

  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}