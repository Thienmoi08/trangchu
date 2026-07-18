// File: main.js
// Hệ thống điều phối trung tâm

// 1. Gom dữ liệu (Sau này có unit4.js thì chỉ cần khai báo thêm vào đây)
const allUnits = [unit3Data]; 

// 2. Hàm lấy danh sách tất cả nghĩa để làm đáp án nhiễu (siêu khó)
function getAllPossibleMeanings() {
    let allMeanings = [];
    allUnits.forEach(unit => {
        // Gom từ topic_vocabulary
        unit.topic_vocabulary.forEach(item => allMeanings.push(item.meaning));
        // Gom từ phrasal_verbs
        unit.phrasal_verbs.forEach(item => allMeanings.push(item.meaning));
    });
    return [...new Set(allMeanings)]; // Xóa trùng lặp
}

// 3. Hàm tạo câu hỏi trắc nghiệm
function generateQuiz(unitData) {
    const allWords = unitData.topic_vocabulary; // Hoặc thêm phrasal_verbs
    const target = allWords[Math.floor(Math.random() * allWords.length)];
    
    let options = [target.meaning];
    let allMeanings = getAllPossibleMeanings();
    
    while (options.length < 4) {
        let rand = allMeanings[Math.floor(Math.random() * allMeanings.length)];
        if (!options.includes(rand)) options.push(rand);
    }
    
    // Xáo trộn
    options.sort(() => Math.random() - 0.5);
    
    return { word: target.word, correct: target.meaning, options: options };
}

// 4. Hàm check giọng nói (Dùng Web Speech API)
function checkSpeaking(expectedWord) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
        const userSpeech = event.results[0][0].transcript.toLowerCase();
        if (userSpeech.includes(expectedWord.toLowerCase())) {
            alert("Đỉnh lắm Bro! Đúng rồi.");
        } else {
            alert("Sai rồi bro, nói lại xem: " + userSpeech);
        }
    };
    recognition.start();
}
