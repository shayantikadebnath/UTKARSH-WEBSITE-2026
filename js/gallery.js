document.addEventListener('DOMContentLoaded', () => {

    // ===== Intro Video Mute =====
    const video = document.getElementById('introVideo');
    const muteBtn = document.getElementById('introMuteBtn');

    if (video && muteBtn) {
        video.muted = false;
        muteBtn.textContent = '🔊';

        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? '🔇' : '🔊';
        });
    }

    // ===== Tab Switching + Lazy Load Juicer =====
    const tabs = document.querySelectorAll('.feed-tab');
    const panels = document.querySelectorAll('.feed-panel');
    const toggle = document.getElementById('feedToggle');

    // Track which Juicer feeds are already loaded
    const loadedFeeds = {
        linkedin: false,
        facebook: false
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Update tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update slider position
            if (toggle) {
                toggle.setAttribute('data-active', target);
            }

            // Show correct panel
            panels.forEach(panel => panel.classList.remove('active'));
            const activePanel = document.getElementById('panel-' + target);
            if (activePanel) {
                activePanel.classList.add('active');
            }

            // Load Juicer only when needed
            if (target === 'linkedin' && !loadedFeeds.linkedin) {
                loadJuicer(
                    'utkarsh-illuminating-leadership-119296320-719b4e3f-e7a5-4fc2-9e85-da46ab523b06',
                    'linkedin'
                );
                loadedFeeds.linkedin = true;
            }

            if (target === 'facebook' && !loadedFeeds.facebook) {
                loadJuicer('YOUR_FACEBOOK_FEED_ID', 'facebook');
                loadedFeeds.facebook = true;
            }

            // Force refresh if already loaded
            if ((target === 'linkedin' && loadedFeeds.linkedin) ||
                (target === 'facebook' && loadedFeeds.facebook)) {
                forceJuicerRefresh();
            }
        });
    });

    function loadJuicer(feedId, type) {
        const script = document.createElement('script');
        script.src = `https://www.juicer.io/embed/${feedId}/embed-code.js`;
        script.async = true;
        script.onload = () => {
            setTimeout(forceJuicerRefresh, 400);
        };
        document.body.appendChild(script);
    }

    function forceJuicerRefresh() {
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 600);
    }

});