const laguList = [
  {
    judul: "Indahnya Dirimu",
    penyanyi: "HIVI",
    file: "./assets/indahnyadirimu.mp3",
    cover: "./assets/jaehyun.jpg",
  },
  {
    judul: "Satu-Satunya",
    penyanyi: "HIVI",
    file: "./assets/satusatunya.mp3",
    cover: "./assets/jeno.jpg",
  },
  {
    judul: "Nuansa Bening",
    penyanyi: "Vidi Aldiano",
    file: "./assets/nuansabening.mp3",
    cover: "./assets/taeyong.jpg",
  },
  {
    judul: "Wanitaku",
    penyanyi: "Noah",
    file: "./assets/wanitaku.mp3",
    cover: "./assets/haechan.jpg",
  },
  {
    judul: "Lebih Indah",
    penyanyi: "Adera",
    file: "./assets/lebihindah.mp3",
    cover: "./assets/jaemin.jpg",
  },
];

let indexSekarang = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cover = document.getElementById("cover");
const judulLagu = document.getElementById("judulLagu");
const penyanyi = document.getElementById("penyanyi");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");

function loadLagu(index) {
  const lagu = laguList[index];

  audio.src = lagu.file;
  cover.src = lagu.cover;
  judulLagu.textContent = lagu.judul;
  penyanyi.textContent = lagu.penyanyi;

  const semuaProgressBar = document.querySelectorAll(".progress-bar");
  semuaProgressBar.forEach((bar) => {
    bar.style.width = "0%";
    bar.classList.remove("active");
  });

  const playerCards = document.querySelectorAll(
    ".music, .music2, .music3, .music4, .music5"
  );
  if (playerCards[index]) {
    const progressBarDiCard = playerCards[index].querySelector(".progress-bar");
    if (progressBarDiCard) {
      progressBarDiCard.classList.add("active");
    }
  }

  // Tunggu sampai audio siap sebelum play
  audio.addEventListener(
    "canplay",
    () => {
      audio
        .play()
        .then(() => {
          playBtn.innerHTML = '<i class="bi bi-pause"></i>';
        })
        .catch((error) => {
          console.error("Gagal memutar audio:", error);
        });
    },
    { once: true }
  );
}

// Play setelah load selesai
audio
  .play()
  .then(() => {
    playBtn.innerHTML = '<i class="bi bi-pause"></i>';
  })
  .catch((error) => {
    console.error("Gagal memutar audio:", error);
  });

function playAudio() {
  audio
    .play()
    .then(() => {
      playBtn.innerHTML = '<i class="bi bi-pause"></i>';
    })
    .catch((error) => {
      console.error("Gagal memutar audio:", error);
    });
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="bi bi-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="bi bi-play"></i>';
  }
});

nextBtn.addEventListener("click", () => {
  indexSekarang = (indexSekarang + 1) % laguList.length;
  loadLagu(indexSekarang);
});

prevBtn.addEventListener("click", () => {
  indexSekarang = (indexSekarang - 1 + laguList.length) % laguList.length;
  loadLagu(indexSekarang);
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
  } else {
    console.log("duration belum tersedia:", audio.src);
  }
});

// Seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
  indexSekarang = (indexSekarang + 1) % laguList.length;
  loadLagu(indexSekarang);
});
