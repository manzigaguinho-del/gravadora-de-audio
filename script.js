// Audio recording and playback functionality

const recordButton = document.getElementById('record');
const stopButton = document.getElementById('stop');
const playButton = document.getElementById('play');
let mediaRecorder;
let audioChunks = [];

// Start recording
recordButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.start();
    console.log('Recording started');
});

// Stop recording
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    console.log('Recording stopped');

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        playButton.addEventListener('click', () => {
            const audio = new Audio(audioUrl);
            audio.play();
            console.log('Playback started');
        });

        console.log('Audio recording is ready for playback');
        audioChunks = [];
    };
});