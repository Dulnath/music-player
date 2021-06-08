const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = ['Have you ever seen', 'Broke my stake', 'Long way', 'No way', 'Human after all', 'Over the clouds', 'Maintain Maintain', 'Path of the lotus', 'Fate', 'Feed A', 'Sunday']

let songIndex = 0

window.onload = function() {
    const audio = document.querySelector('audio')

    function loadSong(song) {
        title.innerHTML = song
        audio.src = `Music/${song}.mp3`
        cover.src = `Images/${song}.jpg`
    }

    function prevSong() {
        songIndex--
        if (songIndex < 0) {
            songIndex = songs.length - 1
        }
        loadSong(songs[songIndex])
        playSong()
    }

    function nextSong() {
        songIndex++
        if (songIndex > (songs.length - 1)) {
            songIndex = 0
        }
        loadSong(songs[songIndex])
        playSong()
    }

    function playSong() {
        musicContainer.classList.add('play')
        playBtn.querySelector('i.fas').classList.remove('fa-play')
        playBtn.querySelector('i.fas').classList.add('fa-pause')
        audio.play()
    }

    function pauseSong() {
        musicContainer.classList.remove('play')
        playBtn.querySelector('i.fas').classList.add('fa-play')
        playBtn.querySelector('i.fas').classList.remove('fa-pause')
        audio.pause()
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement
        const progressPrecent = currentTime / duration * 100
        progress.style.width = `${progressPrecent}%`
    }

    playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play')
        if (isPlaying) {
            pauseSong()
        } else {
            playSong()
        }
    })

    function setProgress(e) {
        const width = this.clientWidth
        const clickX = e.offsetX
        const duration = audio.duration

        audio.currentTime = (clickX / width) * duration
    }

    nextBtn.addEventListener('click', nextSong)
    prevBtn.addEventListener('click', prevSong)

    audio.addEventListener('timeupdate', updateProgress)
    progressContainer.addEventListener('click', setProgress)

    audio.addEventListener('ended', nextSong)

    loadSong(songs[songIndex])
}