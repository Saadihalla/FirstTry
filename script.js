// -------- POPUP CONTROLLER (separate modal, not on home screen initially) --------
const popupOverlay = document.getElementById('darePopup');
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const feedbackDiv = document.getElementById('popupFeedback');
const resetMsgBtn = document.getElementById('resetDareMessageBtn');

// Helper: Open popup (makes visible, no content from home)
function openPopup() {
    if (popupOverlay) {
        popupOverlay.classList.add('active');
        // reset to fresh message when popup opens
        feedbackDiv.innerHTML = "✨ tap FIRST DARE or SECOND DARE ✨";
        feedbackDiv.style.background = "#e9dfd1";
    }
}

// Close popup
function closePopup() {
    if (popupOverlay) {
        popupOverlay.classList.remove('active');
    }
}

// Event listeners for popup toggles
if (openPopupBtn) {
    openPopupBtn.addEventListener('click', openPopup);
}

if (closePopupBtn) {
    closePopupBtn.addEventListener('click', closePopup);
}

// Click outside overlay to close (optional but good)
if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
}

// ----- DARE LOGIC inside popup (First Dare / Second Dare) -----
// Get both dare cards
const firstDareCard = document.querySelector('.dare-card[data-dare="first"]');
const secondDareCard = document.querySelector('.dare-card[data-dare="second"]');

// Helper to show feedback with different style based on dare choice
function handleDareSelection(dareType) {
    let messageHtml = '';
    let bgColor = '#fae6cf';
    if (dareType === 'first') {
        messageHtml = `🥜 YOU CHOSE FIRST DARE: PEANUT BUTTER TELEPORTATION!<br>
        <span style="font-size:0.85rem; display:inline-block; margin-top:5px;"> You instantly teleport to Paris, but your clothes are sticky & smelly. People think you're an idiot. </span>`;
    } else if (dareType === 'second') {
        messageHtml = `💥 YOU CHOSE SECOND DARE: EXPLOSIVE STRENGTH!<br>
        <span style="font-size:0.85rem; display:inline-block; margin-top:5px;"> You're a BITCH, now a random cat nearby vanishes in a puff of glitter. . </span>`;
    }
    if (feedbackDiv) {
        feedbackDiv.innerHTML = messageHtml;
        feedbackDiv.style.background = bgColor;
        feedbackDiv.style.fontWeight = '500';
    }
    // Optional: add a little haptic animation
    const activeCard = (dareType === 'first') ? firstDareCard : secondDareCard;
    if (activeCard) {
        activeCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            if (activeCard) activeCard.style.transform = '';
        }, 150);
    }
}

// Attach click listeners to FIRST DARE and SECOND DARE
if (firstDareCard) {
    firstDareCard.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDareSelection('first');
    });
}

if (secondDareCard) {
    secondDareCard.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDareSelection('second');
    });
}

// reset message button functionality (clears message inside popup)
if (resetMsgBtn) {
    resetMsgBtn.addEventListener('click', () => {
        if (feedbackDiv) {
            feedbackDiv.innerHTML = "👀 Dare reset — pick again? First or Second? 👀";
            feedbackDiv.style.background = "#e9dfd1";
            feedbackDiv.style.fontWeight = "600";
        }
    });
}

// ESC key closes popup
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
        closePopup();
    }
});

console.log("Ready: popup modal works isolated from home content. Click OPEN POPUP to see PICK YOUR DARE.");