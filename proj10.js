const puzzleContainer = document.getElementById('puzzle');
    const timerDisplay = document.getElementById('timer');
    const bestTimeDisplay = document.getElementById('best-time');
    const successMessage = document.getElementById('success');

    // global variables to store the board, timer, and current piece
    let pieces = [];
    let draggedPiece = null;
    let startTime = null;
    let timerInterval = null;
    let bestTime = localStorage.getItem('bestTime') || null;

    // creates the game board based on the shuffled indices
    function initPuzzle() {
      pieces = [];
      puzzleContainer.innerHTML = '';
    
      // Create the shuffled indices
      const indices = shuffle([...Array(9).keys()]);
    
      for (let i = 0; i < 9; i++) {
        // create "slots" so there are larger drop zones
        const slot = document.createElement('div');
        slot.classList.add('tile-slot');
        slot.dataset.index = i;
    
        const shuffledIndex = indices[i];
    
        // create pieces
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.draggable = true;
        piece.dataset.correctIndex = shuffledIndex;
        piece.style.backgroundImage = `url('waterfall.jpg')`;
        piece.style.backgroundPosition = `-${(shuffledIndex % 3) * 100}px -${Math.floor(shuffledIndex / 3) * 100}px`;
    
        // event listeners for dragging and dropping
        piece.addEventListener('dragstart', dragStart);
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('drop', drop);
    
        slot.appendChild(piece);
        pieces.push(piece);
        puzzleContainer.appendChild(slot);
      }
    
      successMessage.style.display = 'none';
      startTimer();
    }
    

    // set the target when dragged
    function dragStart(e) {
      draggedPiece = e.target;
    }

    function dragOver(e) {
      e.preventDefault();
    }

    // swap when dropped
    function drop(e) {
      e.preventDefault();
      const dropzone = e.currentTarget;
      const targetPiece = dropzone.querySelector('.piece');
    
      if (!draggedPiece || draggedPiece === targetPiece) return;
    
      const fromSlot = draggedPiece.parentElement;
      const toSlot = dropzone;
    
      fromSlot.appendChild(targetPiece);
      toSlot.appendChild(draggedPiece);
    
      // update what is proper
      checkAllPieces();
    }

    // checks the board to see which pieces are correct and which are incorrect
    function checkAllPieces() {
      let correct = 0;
      const slots = document.querySelectorAll('.tile-slot');
      
      slots.forEach((slot, index) => {
        const piece = slot.querySelector('.piece');
        if (piece) {
          if (parseInt(piece.dataset.correctIndex) === index) {
            // LOCK IT INTO PLACE IF CORRECT
            correct++;
            piece.draggable = false;
            piece.classList.add('locked');
          } else {
            piece.draggable = true;
            piece.classList.remove('locked');
          }
        }
      });
    
      // if they are all correct
      if (correct === 9) {
        // stop timer
        stopTimer();

        // show success message
        successMessage.style.display = 'block';
    
        const timeTaken = Date.now() - startTime;

        // update high score
        if (!bestTime || timeTaken < bestTime) {
          bestTime = timeTaken;
          localStorage.setItem('bestTime', bestTime);
          updateBestTime();
        }
      }
    }

    // update high score
    function updateBestTime() {
      bestTimeDisplay.textContent = `Best Time: ${Math.floor(bestTime / 1000)}s`;
    }

    // starts the timer when it's reset
    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      startTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = `Time: ${elapsed}s`;
      }, 1000);
    }

    // stops the timer when complete
    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
    

    // reset the puzzle (shuffle & reset timer) by calling init
    function resetGame() {
      initPuzzle();
    }

    // shuffle the puzzle
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        // randomization
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    if (bestTime) updateBestTime();
    initPuzzle();