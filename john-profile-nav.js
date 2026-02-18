document.addEventListener('DOMContentLoaded', () => {
    const profileNavButton = document.querySelector('.profile-nav-button');

    if (profileNavButton) {
        profileNavButton.addEventListener('click', () => {
            window.location.href = 'john-profile.html';
        });
    }
});
