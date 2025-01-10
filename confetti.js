
    const blastConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
        };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    // Get the name input field
    const nameInput = document.getElementById('formbutton');

    if (nameInput) {
        nameInput.addEventListener('click', () => {
            blastConfetti(); // Call the function to blast confetti
        });
    } else {
        console.error('button with ID "formbutton" not found.');
    }
;


