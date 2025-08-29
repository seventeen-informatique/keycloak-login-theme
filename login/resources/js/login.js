// Script pour améliorer l'expérience utilisateur de la page de connexion
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation du logo au chargement
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        setTimeout(() => {
            logo.style.transition = 'all 0.5s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Amélioration des interactions avec les champs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        
        // Animation de focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validation en temps réel (optionnelle)
            validateInput(this);
        });
        
        // Animation lors de la saisie
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
        
        // Vérifier si le champ a déjà une valeur
        if (input.value.length > 0) {
            input.parentElement.classList.add('has-value');
        }
    });
    
    // Gestion du formulaire de connexion
    const loginForm = document.getElementById('kc-form-login');
    const loginButton = document.getElementById('kc-login');
    
    if (loginForm && loginButton) {
        loginForm.addEventListener('submit', function(e) {
            // Validation côté client
            let isValid = true;
            const requiredInputs = this.querySelectorAll('input[required], #username, #password');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showFieldError(input, 'Ce champ est requis');
                }
            });
            
            if (isValid) {
                // Animation du bouton de soumission
                loginButton.disabled = true;
                loginButton.innerHTML = '<span class="loading-spinner"></span> Connexion...';
                loginButton.classList.add('loading');
                
                // Timeout de sécurité pour réactiver le bouton si nécessaire
                setTimeout(() => {
                    if (loginButton.disabled) {
                        loginButton.disabled = false;
                        loginButton.innerHTML = 'Se connecter';
                        loginButton.classList.remove('loading');
                    }
                }, 10000);
            } else {
                e.preventDefault();
            }
        });
    }
    
    // Fonction de validation des champs
    function validateInput(input) {
        clearFieldError(input);
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value && !emailRegex.test(input.value)) {
                showFieldError(input, 'Format d\'email invalide');
                return false;
            }
        }
        
        if (input.name === 'password' && input.value.length > 0 && input.value.length < 6) {
            showFieldError(input, 'Le mot de passe doit contenir au moins 6 caractères');
            return false;
        }
        
        return true;
    }
    
    // Afficher une erreur sur un champ
    function showFieldError(input, message) {
        input.classList.add('error');
        
        // Supprimer l'ancien message d'erreur s'il existe
        clearFieldError(input);
        
        // Créer le nouveau message d'erreur
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message client-error';
        errorElement.textContent = message;
        
        input.parentElement.appendChild(errorElement);
    }
    
    // Supprimer l'erreur d'un champ
    function clearFieldError(input) {
        input.classList.remove('error');
        const existingError = input.parentElement.querySelector('.client-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Animation des liens
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Gestion du thème sombre/clair (si supporté)
    function initThemeToggle() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Écouter les changements de préférence
        prefersDark.addEventListener('change', (e) => {
            updateTheme(e.matches);
        });
        
        // Initialiser le thème
        updateTheme(prefersDark.matches);
    }
    
    function updateTheme(isDark) {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
    
    // Initialiser la gestion des thèmes
    initThemeToggle();
    
    // Amélioration de l'accessibilité
    initAccessibilityFeatures();
    
    function initAccessibilityFeatures() {
        // Focus visible pour la navigation au clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Annoncer les erreurs aux lecteurs d'écran
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.setAttribute('aria-live', 'polite');
            error.setAttribute('role', 'alert');
        });
    }
    
    // Debug: log pour vérifier que le script est chargé
    console.log('Thème de connexion personnalisé chargé avec succès');
});

// Styles CSS additionnels via JavaScript
const additionalStyles = `
    .loading-spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .btn.loading {
        opacity: 0.8;
        cursor: not-allowed;
    }
    
    .form-group.focused .form-label {
        color: var(--primary-color);
        transform: translateY(-2px);
        transition: all 0.2s ease;
    }
    
    .form-group.has-value .form-label {
        font-weight: 600;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .client-error {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Injecter les styles additionnels
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);