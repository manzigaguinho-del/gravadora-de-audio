// script.js: Functionality for recording and playing audio using MediaRecorder API

// Select elements
const recordButton = document.getElementById('record');
const playButton = document.getElementById('play');
const audioElement = document.getElementById('audio');

let mediaRecorder;
let audioChunks = [];

// Start recording
recordButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };  

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioElement.src = audioUrl;
        audioChunks = [];
    };
});

// Stop recording
recordButton.addEventListener('dblclick', () => {
    mediaRecorder.stop();
});

// Play audio
playButton.addEventListener('click', () => {
    audioElement.play();
});