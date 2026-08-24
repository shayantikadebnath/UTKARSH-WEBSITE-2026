document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.notice-item');

    items.forEach(item => {
        const header = item.querySelector('.notice-header');

        header.addEventListener('click', () => {
            // Close other open items (optional – remove if you want multiple open)
            items.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});