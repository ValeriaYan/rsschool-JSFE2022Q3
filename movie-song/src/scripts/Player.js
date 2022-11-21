export default class Player {
    constructor(src, playerElem) {
        this.audio = new Audio();
        this.audio.src = src;
        this.isPlay = false;
        this.timeline = playerElem.querySelector('.player__timeline');
        this.currentTimeElem = playerElem.querySelector('.player__time-current');
        this.progress = playerElem.querySelector('.player__progress');
        this.duration = playerElem.querySelector('.player__time-duration');
        this.playBtn = playerElem.querySelector('.play');
        this.volumeIcon = playerElem.querySelector('.player__volume-icon');
        this.volumeRange = playerElem.querySelector('.player__volume-range');

        this.audio.addEventListener('timeupdate', this.fillProgressBar.bind(this));
        this.audio.addEventListener('timeupdate', this.setCurrentTimeElem.bind(this));
        this.timeline.addEventListener('click', (event) => this.setTimeCode(event.offsetX));
        this.playBtn.addEventListener('click', this.playAudio.bind(this));

        this.audio.addEventListener('loadeddata', this.setAudioDuration.bind(this));
        this.volumeRange.addEventListener('input', this.setVolume.bind(this));
        this.volumeIcon.addEventListener('click', this.offVolume(this));
    }

    changeSong(newSrc) {
        this.audio.src = newSrc;
        this.isPlay = false;
        this.toggleBtn();
        this.audio.currentTime = 0;
        this.fillProgressBar();
    }

    setTimeCode(timecode) {
        const widthTimeline = getComputedStyle(this.timeline).width;
        const timeSong = (timecode / parseInt(widthTimeline)) * this.audio.duration;
        this.audio.currentTime = timeSong;
        if(!this.isPlay){
            this.audio.play();
            this.isPlay = true;
        }
        this.toggleBtn();
        this.fillProgressBar();
    }

    setCurrentTimeElem() {
        const currentTime = Math.floor(this.audio.currentTime);
        let min = String(Math.floor(currentTime / 60));
        let sec = String(currentTime % 60);
        if(sec.length == 1){
            sec = `0${sec}`
        }
        this.currentTimeElem.textContent = `${min}:${sec}`;
    }

    
    fillProgressBar(){
        const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        if(this.audio.currentTime == 0) {
            this.progress.style.width = '0%';
        }
        if(progressPercent == 100) {
            this.isPlay = false;
            this.toggleBtn();
        }
    }

    setAudioDuration() {
        const duration = Math.floor(this.audio.duration);
        let min = String(Math.floor(duration / 60));
        let sec = String(duration % 60);
        if(sec.length == 1) {
            sec = `0${sec}`
        }
        this.duration.textContent = `${min}:${sec}`;
    }

    async playAudio(){
        if(!this.isPlay){
            await this.audio.play();
            this.isPlay = true;
        }else{
            this.audio.pause();
            this.isPlay = false;
        }
        
        this.toggleBtn();
    }

    pauseAudio() {
        this.audio.pause();
        this.isPlay = false;
        this.toggleBtn();
    }

    toggleBtn(){
        if(!this.isPlay){
            this.playBtn.classList.remove('pause');
        }else{
            this.playBtn.classList.add('pause');
        }
    }

    offVolume(){
        if(this.volumeIcon.classList.contains('volume-off')){
            this.volumeIcon.classList.remove('volume-off');
            this.volumeRange.value = '20';
            this.setVolume();
        }else{
            this.volumeIcon.classList.add('volume-off');
            this.volumeRange.value = '0';
            this.setVolume();
        }
    }
    
    progressRange(){
        const progress = this.volumeRange.value;
        this.volumeRange.style.setProperty('--progress', `${progress}%`);
    }
    
    changeIconVolume(){
        if(this.volumeRange.value == '0'){
            this.volumeIcon.classList.add('volume-off');
        }else{
            this.volumeIcon.classList.remove('volume-off');
        }
    }
    
    setVolume(){
        this.audio.volume = (this.volumeRange.value / 100);
        this.progressRange();
        this.changeIconVolume();
    }
    
    
}