/* ===================== مكان التعديل السريع =====================
   1) الرسالة داخل الظرف: عدّل نص #letterContent في letter.html.
   2) الصور: ضع صورك داخل images بأسماء photo-1.jpg حتى photo-6.jpg.
   3) الأغنية: ضع ملف MP3 باسم birthday-song.mp3 داخل assets.
   4) QR: ضع الصورة باسم qr-code.png داخل assets.
   ================================================================ */

const audio = document.getElementById('birthdayAudio');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

if (audio) {
  const savedTime = sessionStorage.getItem('birthdayAudioTime');
  const shouldResume = sessionStorage.getItem('birthdayAudioPlaying') === 'true';

  if (savedTime) {
    audio.currentTime = Number(savedTime);
  }

  audio.addEventListener('play', () => {
    sessionStorage.setItem('birthdayAudioPlaying', 'true');
  });

  audio.addEventListener('pause', () => {
    sessionStorage.setItem('birthdayAudioPlaying', 'false');
  });

  window.addEventListener('pagehide', () => {
    sessionStorage.setItem('birthdayAudioTime', String(audio.currentTime));
  });

  if (shouldResume) {
    audio.play().catch(() => {
      if (musicLabel) {
        musicLabel.textContent = 'اضغطي لتكملي الأغنية';
      }
    });
  }
}

if (audio && musicToggle) {
  musicToggle.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        musicToggle.classList.add('playing');
        musicLabel.textContent = 'الأغنية شغّالة';
      } catch {
        musicLabel.textContent = 'ضيفي الأغنية أولاً';
      }
    } else {
      audio.pause();
      musicToggle.classList.remove('playing');
      musicLabel.textContent = 'شغّلي الأغنية';
    }
  });
}

const envelope = document.getElementById('envelope');
const letterStatus = document.getElementById('letterStatus');

if (envelope) {
  envelope.addEventListener('click', () => {
    const open = envelope.classList.toggle('open');
    envelope.setAttribute('aria-expanded', String(open));

    if (letterStatus) {
      letterStatus.textContent = open
        ? 'الجواب اتفتح… اقريه براحتك ♡'
        : 'الجواب مقفول مخصوص ليكي';
    }
  });
}

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const answerResult = document.getElementById('answerResult');

let noAttempts = 0;

if (yesButton) {
  yesButton.addEventListener('click', () => {
    answerResult.textContent =
      'كنت عارف إنك هتحبيها… كل سنة وإنتِ طيبة يا روحي 😂❤';

    yesButton.textContent = 'أحلى Yes في الدنيا ♡';
  });
}

if (noButton) {
  const runAway = () => {
    noAttempts++;

    const card = noButton.closest('.question-card');
    const rect = card.getBoundingClientRect();
    const maxX = Math.max(20, rect.width / 2 - 80);
    const maxY = 90;
    const randomX = (Math.random() * maxX * 2 - maxX).toFixed(0);
    const randomY = (Math.random() * maxY * 2 - maxY).toFixed(0);

    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;

    if (noAttempts === 3) {
      answerResult.textContent =
        'no برضو يبت ';
    }

    if (noAttempts >= 6) {
      answerResult.textContent =
        'يبت المرة دوسي yes';
    }
  };

  noButton.addEventListener('mouseenter', runAway);

  noButton.addEventListener('touchstart', (event) => {
    event.preventDefault();
    runAway();
  });

  noButton.addEventListener('click', runAway);
  const correctPin = "12345678";

const pinScreen = document.getElementById("pinScreen");
const pinInput = document.getElementById("pinInput");
const pinButton = document.getElementById("pinButton");
const pinError = document.getElementById("pinError");

if (pinButton) {
  pinButton.addEventListener("click", () => {
    const enteredPin = pinInput.value.trim();

    if (!/^\d{8}$/.test(enteredPin)) {
      pinError.textContent =
        "لازم الـ PIN يكون 8 أرقام بالضبط.";
      return;
    }

    if (enteredPin === correctPin) {
      pinScreen.style.display = "none";
    } else {
      pinError.textContent =
        "الـ PIN غلط، جربي تاني يا روحي ♡";

      pinInput.value = "";
      pinInput.focus();
    }
  });
}

if (pinInput) {
  pinInput.addEventListener("input", () => {
    pinInput.value = pinInput.value.replace(/\D/g, "").slice(0, 8);
  });

  pinInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      pinButton.click();
    }
  });
}

}
