// Função para suavizar o scroll ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adiciona classe ativa ao item do menu conforme scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .nav-links li');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.querySelector('a').getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Animação para os cards de features
const featureCards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});


// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// FAQ Category Filter
const categories = document.querySelectorAll('.category');

categories.forEach(category => {
    category.addEventListener('click', () => {
        // Update active category
        categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        
        const categoryName = category.getAttribute('data-category');
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Filter items
        faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (categoryName === 'all' || itemCategory === categoryName) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
    });
});

// FAQ Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', searchFAQ);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchFAQ();
});

function searchFAQ() {
    const term = searchInput.value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (term.trim() === '') {
        faqItems.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (question.includes(term) || answer.includes(term)) {
            item.style.display = 'block';
            item.classList.add('active'); // Auto-expand matching items
        } else {
            item.style.display = 'none';
        }
    });
}