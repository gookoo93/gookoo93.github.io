// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio page loaded');
    showContent(0);
});

// Easter Egg Toggle
function toggleEasterEgg() {
    const modal = document.getElementById('easterEggModal');
    modal.classList.toggle('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('easterEggModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
}

// Tab Switching
function switchTab(index) {
    const tabs = document.querySelectorAll('.file-tab');
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update breadcrumb based on selected tab
    updateBreadcrumb(index);
    
    // Show corresponding content
    showContent(index);
    
    // Skill 탭(index 1)이면 타이핑 시작
    if (index === 1 && !typingStarted) {
        typingStarted = true;
        setTimeout(typeEffect, 500);
    }
}

// Update Breadcrumb
function updateBreadcrumb(index) {
    const breadcrumbData = [
        {
            icon: '📄',
            tag: '&lt;Introduce&gt;',
            description: '클라이언트 개발자 김구태를 소개합니다'
        },
        {
            icon: '⚙️',
            tag: '&lt;Skill&gt;',
            description: '저는 이런 것들을 할 수 있습니다'
        },
        {
            icon: '💼',
            tag: '&lt;Portfolio&gt;',
            description: '제가 만든 것들을 구경해보세요'
        },
        {
            icon: '📧',
            tag: '&lt;Contact&gt;',
            description: '저에게 연락하는 방법은 여기에 있습니다'
        }
    ];
    
    const data = breadcrumbData[index];
    const breadcrumb = document.getElementById('breadcrumb');
    
    breadcrumb.innerHTML = `
        <span class="breadcrumb-item">src</span>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-item">homepage</span>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-icon">${data.icon}</span>
        <span class="breadcrumb-tag">${data.tag}</span>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-icon">💬</span>
        <span class="breadcrumb-description">${data.description}</span>
    `;
}

// Show Content based on tab
function showContent(index) {
    // Hide all content sections
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected content
    const contentId = ['introduce-content', 'skill-content', 'portfolio-content', 'contact-content'][index];
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
    
    // Scroll to top of scrollable content
    const scrollableContent = document.querySelector('.scrollable-content');
    if (scrollableContent) {
        scrollableContent.scrollTop = 0;
    }
}

// 타이핑 애니메이션
const typingTexts = [
    { text: "UNITY", bold: true },
    { text: "COCOS 2D-X", bold: true },
    { text: "PHOTON", bold: true },
    { text: "C언어", bold: true },
    { text: "C#", bold: true},
    { text: "C++", bold: true },
    { text: "웹 프론트", bold: true },
    { text: "디자인이 가능한", bold: true }
];

let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let typingStarted = false;

function typeEffect() {
    const container = document.getElementById('typing-container');
    if (!container) return;
    
    const currentItem = typingTexts[currentIndex];
    const currentWord = currentItem.text;
    const isBold = currentItem.bold;
    
    if (isDeleting) {
        // 한 글자씩 지우기
        charIndex--;
        typingSpeed = 50; // 지울 때는 빠르게
        
        // 다 지웠으면 다음 단어로
        if (charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % typingTexts.length;
            typingSpeed = 500; // 다음 단어 전 잠시 대기
        }
    } else {
        // 한 글자씩 쓰기
        charIndex++;
        typingSpeed = 150; // 쓸 때는 적당한 속도
        
        // 다 썼으면 잠시 대기 후 지우기 시작
        if (charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // 2초 대기
        }
    }
    
    // 텍스트 + 커서 함께 표시
    const displayText = currentWord.substring(0, charIndex);
    const fontWeight = isBold ? 'font-weight: 700;' : 'font-weight: 500;';
    container.innerHTML = `<span style="${fontWeight}">${displayText}</span><span class="typing-cursor">|</span>`;
    
    setTimeout(typeEffect, typingSpeed);
}
