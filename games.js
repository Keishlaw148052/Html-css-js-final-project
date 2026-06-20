// Bible Games JavaScript

console.log("Games page loaded!");

// Sound effects
const correctSound = new Audio('media/notification-digital-chime-betacut-1-00-02.mp3');
const wrongSound = new Audio('media/meme-fail-alert-locran-1-00-01.mp3');
const victorySound = new Audio('media/Victory Sound Effect (For Video Editing).mp3');

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Game Menu Navigation
    const gameMenuBtns = document.querySelectorAll('.game-menu-btn');
    const gameSections = document.querySelectorAll('.game-section');

    gameMenuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            gameMenuBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Hide all game sections
            gameSections.forEach(section => section.classList.remove('active'));

            // Show selected game
            const gameType = this.getAttribute('data-game');
            document.getElementById(`${gameType}-game`).classList.add('active');
        });
    });

    // ===== GAME 1: GUESS THE CHARACTER =====
    
    const characters = [
        {
            name: "Noah",
            clue: "I built a huge boat to save animals from a great flood. God told me it would rain for 40 days and nights!",
            hint: "I saved two of every animal!",
            options: ["Noah", "Moses", "Abraham", "David"]
        },
        {
            name: "David",
            clue: "I was a shepherd boy who defeated a giant named Goliath with just a sling and five stones.",
            hint: "I became the king of Israel!",
            options: ["David", "Samson", "Joshua", "Solomon"]
        },
        {
            name: "Moses",
            clue: "I led God's people out of Egypt and parted the Red Sea. God spoke to me from a burning bush!",
            hint: "I received the Ten Commandments!",
            options: ["Moses", "Aaron", "Joshua", "Elijah"]
        },
        {
            name: "Jonah",
            clue: "I tried to run away from God and ended up inside a big fish for three days!",
            hint: "I preached to the city of Nineveh!",
            options: ["Jonah", "Daniel", "Elijah", "Jeremiah"]
        },
        {
            name: "Daniel",
            clue: "I was thrown into a den of lions because I prayed to God, but the lions didn't hurt me!",
            hint: "I interpreted dreams for the king!",
            options: ["Daniel", "David", "Joseph", "Samson"]
        },
        {
            name: "Esther",
            clue: "I was a brave queen who saved my people from destruction by speaking to the king.",
            hint: "I had a cousin named Mordecai!",
            options: ["Esther", "Ruth", "Mary", "Deborah"]
        },
        {
            name: "Peter",
            clue: "I was a fisherman who became Jesus' close friend. I walked on water but got scared and started to sink!",
            hint: "Jesus called me 'the rock'!",
            options: ["Peter", "John", "James", "Andrew"]
        },
        {
            name: "Mary",
            clue: "An angel told me I would give birth to Jesus, God's son. I was very young and faithful.",
            hint: "I sang a beautiful song of praise to God!",
            options: ["Mary", "Elizabeth", "Ruth", "Sarah"]
        }
    ];

    let currentCharacter = null;
    let previousCharacter = null;
    let guessScore = 0;
    let guessStreak = 0;
    let hintUsed = false;

    const clueText = document.getElementById('clue-text');
    const answerBtns = document.querySelectorAll('.answer-btn');
    const newCharacterBtn = document.getElementById('new-character-btn');
    const hintBtn = document.getElementById('hint-btn');
    const guessFeedback = document.getElementById('guess-feedback');
    const guessScoreDisplay = document.getElementById('guess-score');
    const guessStreakDisplay = document.getElementById('guess-streak');

    function loadNewCharacter() {
        let newCharacter;
        
        // Keep picking until we get a different character
        do {
            newCharacter = characters[Math.floor(Math.random() * characters.length)];
        } while (newCharacter === previousCharacter && characters.length > 1);
        
        previousCharacter = newCharacter;
        currentCharacter = newCharacter;
        
        clueText.textContent = currentCharacter.clue;
        hintUsed = false;
        hintBtn.disabled = false;
        guessFeedback.classList.add('hidden');
        
        // Change button text to "Next Character" after first click
        newCharacterBtn.textContent = 'Next Character';

        // Shuffle and set options
        const shuffled = [...currentCharacter.options].sort(() => Math.random() - 0.5);
        answerBtns.forEach((btn, index) => {
            btn.textContent = shuffled[index];
            btn.disabled = false;
            btn.className = 'answer-btn';
        });
    }

    answerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedAnswer = this.textContent;
            answerBtns.forEach(b => b.disabled = true);

            if (selectedAnswer === currentCharacter.name) {
                this.classList.add('correct');
                correctSound.play();
                guessScore += hintUsed ? 1 : 2;
                guessStreak++;
                showFeedback(`🎉 Correct! It was ${currentCharacter.name}!`, 'success');
            } else {
                this.classList.add('wrong');
                wrongSound.play();
                guessStreak = 0;
                // Show correct answer
                answerBtns.forEach(b => {
                    if (b.textContent === currentCharacter.name) {
                        b.classList.add('correct');
                    }
                });
                showFeedback(`❌ Wrong! It was ${currentCharacter.name}.`, 'error');
            }

            guessScoreDisplay.textContent = guessScore;
            guessStreakDisplay.textContent = guessStreak;
        });
    });

    newCharacterBtn.addEventListener('click', loadNewCharacter);

    hintBtn.addEventListener('click', function() {
        clueText.textContent += `\n\n💡 HINT: ${currentCharacter.hint}`;
        this.disabled = true;
        hintUsed = true;
    });

    // ===== GAME 2: PUZZLE GAME =====
    
    const puzzleWords = [
        { word: "NOAH", hint: "Built the ark" },
        { word: "DAVID", hint: "Defeated Goliath" },
        { word: "MOSES", hint: "Parted the Red Sea" },
        { word: "JESUS", hint: "Son of God" },
        { word: "FAITH", hint: "Believing in God" },
        { word: "PRAYER", hint: "Talking to God" },
        { word: "GRACE", hint: "God's undeserved favor" },
        { word: "LOVE", hint: "God's greatest gift" },
        { word: "ANGEL", hint: "God's messenger" },
        { word: "MIRACLE", hint: "God's amazing work" },
        { word: "DISCIPLES", hint: "Jesus' followers" },
        { word: "CROSS", hint: "Where Jesus died" }
    ];

    let currentPuzzle = null;
    let puzzleScore = 0;
    let puzzleTimer = 0;
    let puzzleInterval = null;

    const scrambledWord = document.getElementById('scrambled-word');
    const puzzleHintText = document.getElementById('puzzle-hint-text');
    const puzzleAnswer = document.getElementById('puzzle-answer');
    const checkPuzzleBtn = document.getElementById('check-puzzle-btn');
    const newPuzzleBtn = document.getElementById('new-puzzle-btn');
    const revealPuzzleBtn = document.getElementById('reveal-puzzle-btn');
    const puzzleFeedback = document.getElementById('puzzle-feedback');
    const puzzleScoreDisplay = document.getElementById('puzzle-score');
    const puzzleTimerDisplay = document.getElementById('puzzle-timer');

    function scrambleWord(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    function loadNewPuzzle() {
        currentPuzzle = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
        let scrambled = scrambleWord(currentPuzzle.word);
        
        // Make sure it's actually scrambled
        while (scrambled === currentPuzzle.word && currentPuzzle.word.length > 3) {
            scrambled = scrambleWord(currentPuzzle.word);
        }

        scrambledWord.textContent = scrambled;
        puzzleHintText.textContent = currentPuzzle.hint;
        puzzleAnswer.value = '';
        puzzleAnswer.disabled = false;
        checkPuzzleBtn.disabled = false;
        puzzleFeedback.classList.add('hidden');

        // Start timer
        puzzleTimer = 0;
        clearInterval(puzzleInterval);
        puzzleInterval = setInterval(() => {
            puzzleTimer++;
            puzzleTimerDisplay.textContent = `${puzzleTimer}s`;
        }, 1000);
    }

    checkPuzzleBtn.addEventListener('click', function() {
        const answer = puzzleAnswer.value.toUpperCase().trim();
        
        if (answer === currentPuzzle.word) {
            clearInterval(puzzleInterval);
            correctSound.play();
            puzzleScore++;
            puzzleScoreDisplay.textContent = puzzleScore;
            showFeedback(`🎉 Perfect! The word was ${currentPuzzle.word}!`, 'success', 'puzzle');
            puzzleAnswer.disabled = true;
            this.disabled = true;
        } else {
            wrongSound.play();
            showFeedback(`❌ Try again! Keep unscrambling...`, 'error', 'puzzle');
        }
    });

    puzzleAnswer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPuzzleBtn.click();
        }
    });

    newPuzzleBtn.addEventListener('click', loadNewPuzzle);

    revealPuzzleBtn.addEventListener('click', function() {
        clearInterval(puzzleInterval);
        scrambledWord.textContent = currentPuzzle.word;
        puzzleAnswer.value = currentPuzzle.word;
        puzzleAnswer.disabled = true;
        checkPuzzleBtn.disabled = true;
        showFeedback(`👀 The answer was: ${currentPuzzle.word}`, 'info', 'puzzle');
    });

    // ===== GAME 3: BIBLE QUIZ =====
    
    const quizQuestions = [
        {
            question: "How many days and nights did it rain during Noah's flood?",
            options: ["30 days", "40 days", "50 days", "60 days"],
            correct: 1
        },
        {
            question: "What did David use to defeat Goliath?",
            options: ["A sword", "A spear", "A sling and stones", "A bow and arrow"],
            correct: 2
        },
        {
            question: "Who was swallowed by a great fish?",
            options: ["Moses", "Jonah", "Peter", "Paul"],
            correct: 1
        },
        {
            question: "How many disciples did Jesus have?",
            options: ["10", "11", "12", "13"],
            correct: 2
        },
        {
            question: "Who parted the Red Sea?",
            options: ["Moses", "Abraham", "Joshua", "Elijah"],
            correct: 0
        },
        {
            question: "What did God create on the first day?",
            options: ["Animals", "Light", "Water", "Plants"],
            correct: 1
        },
        {
            question: "Who built an ark?",
            options: ["Abraham", "Noah", "Moses", "David"],
            correct: 1
        },
        {
            question: "Where was Jesus born?",
            options: ["Jerusalem", "Nazareth", "Bethlehem", "Egypt"],
            correct: 2
        },
        {
            question: "Who was the strongest man in the Bible?",
            options: ["David", "Goliath", "Samson", "Joshua"],
            correct: 2
        },
        {
            question: "What did Jesus do at the wedding in Cana?",
            options: ["Healed the sick", "Fed 5000 people", "Turned water into wine", "Walked on water"],
            correct: 2
        }
    ];

    let currentQuestionIndex = 0;
    let quizCorrect = 0;
    let quizWrong = 0;
    let quizStarted = false;

    const quizQuestion = document.getElementById('quiz-question');
    const quizOptionBtns = document.querySelectorAll('.quiz-option-btn');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizResults = document.getElementById('quiz-results');
    const currentQuestionDisplay = document.getElementById('current-question');
    const progressFill = document.getElementById('progress-fill');
    const quizCorrectDisplay = document.getElementById('quiz-correct');
    const quizWrongDisplay = document.getElementById('quiz-wrong');
    const finalScoreDisplay = document.getElementById('final-score');
    const resultMessage = document.getElementById('result-message');

    function startQuiz() {
        quizStarted = true;
        currentQuestionIndex = 0;
        quizCorrect = 0;
        quizWrong = 0;
        quizCorrectDisplay.textContent = 0;
        quizWrongDisplay.textContent = 0;
        quizResults.classList.add('hidden');
        startQuizBtn.classList.add('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            endQuiz();
            return;
        }

        const q = quizQuestions[currentQuestionIndex];
        quizQuestion.textContent = q.question;
        currentQuestionDisplay.textContent = currentQuestionIndex + 1;
        progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

        quizOptionBtns.forEach((btn, index) => {
            btn.textContent = q.options[index];
            btn.disabled = false;
            btn.className = 'quiz-option-btn';
        });

        quizFeedback.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
    }

    quizOptionBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const q = quizQuestions[currentQuestionIndex];
            quizOptionBtns.forEach(b => b.disabled = true);

            if (index === q.correct) {
                this.classList.add('correct');
                correctSound.play();
                quizCorrect++;
                quizCorrectDisplay.textContent = quizCorrect;
                showFeedback('✅ Correct! Great job!', 'success', 'quiz');
            } else {
                this.classList.add('wrong');
                wrongSound.play();
                quizOptionBtns[q.correct].classList.add('correct');
                quizWrong++;
                quizWrongDisplay.textContent = quizWrong;
                showFeedback(`❌ Wrong! The correct answer was: ${q.options[q.correct]}`, 'error', 'quiz');
            }

            nextQuestionBtn.classList.remove('hidden');
        });
    });

    nextQuestionBtn.addEventListener('click', function() {
        currentQuestionIndex++;
        loadQuestion();
    });

    startQuizBtn.addEventListener('click', startQuiz);

    restartQuizBtn.addEventListener('click', startQuiz);

    function endQuiz() {
        quizResults.classList.remove('hidden');
        finalScoreDisplay.textContent = quizCorrect;

        let message = '';
        if (quizCorrect === 10) {
            victorySound.play();
            message = '🌟 Perfect! You\'re a Bible expert!';
        } else if (quizCorrect >= 7) {
            victorySound.play();
            message = '😊 Excellent work! You know your Bible stories!';
        } else if (quizCorrect >= 5) {
            message = '🧠 Genius! You\'re a Bible scholar!';
        } else {
            message = '📖 Keep reading your Bible to learn more!';
        }

        resultMessage.textContent = message;
        quizQuestion.textContent = 'Quiz Complete!';
        quizOptionBtns.forEach(btn => btn.classList.add('hidden'));
    }

    // Helper function to show feedback
    function showFeedback(message, type, gameType = 'guess') {
        let feedbackElement;
        if (gameType === 'guess') {
            feedbackElement = guessFeedback;
        } else if (gameType === 'puzzle') {
            feedbackElement = puzzleFeedback;
        } else {
            feedbackElement = quizFeedback;
        }

        feedbackElement.textContent = message;
        feedbackElement.className = `feedback ${type}`;
        feedbackElement.classList.remove('hidden');
    }

    console.log('All games initialized successfully!');
});
