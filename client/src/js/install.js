const butInstall = document.getElementById('buttonInstall');

/* ----------- BEFORE INSTALL PROMPT EVENT ---------- */
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Store triggered events
    window.deferredPrompt = event;

    // Remove hidden class from button.
    butInstall.classList.toggle('hidden', false);
});

/* ------------ BUTTON INSTALL CLICK HANDLER ----------- */
butInstall.addEventListener('click', async () => {
    // Select the deferredPrompt
    const promptEvent = window.deferredPrompt;
    // If there is no deferredPrompt exit out of the function
    if (!promptEvent) {
        return;
    }
    // Show prompt
    promptEvent.prompt();
    // Reset deferred prompt variable; can only be used once.
    window.deferredPrompt = null;
    // Hide install button
    butInstall.classList.toggle('hidden', true);
});

/* ----------------- APP INSTALLED EVENT HANDLER ----------------- */
window.addEventListener('appinstalled', () => {
    // Clear prompt
    window.deferredPrompt = null;
});
