document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.remove('light');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll down button functionality
    const scrollDownButton = document.getElementById('scroll-down');
    scrollDownButton.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill in all fields');
                return;
            }
            
            // Submit button state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="ri-loader-2-line ri-spin ri-lg mr-2"></i> Sending...';
            
            // Create form data object
            const formData = new FormData(contactForm);
            
            // Send form data to FormSubmit
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            });
        });
    }

    // Animate radar chart in About section
    function animateRadarChart() {
        var chartDom = document.getElementById('radar-chart');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            radar: {
                indicator: [
                    { name: 'Frontend Development', max: 100 },
                    { name: 'Backend Development', max: 100 },
                    { name: 'Database Management', max: 100 },
                    { name: 'API Development', max: 100 },
                    { name: 'Problem Solving', max: 100 }
                ],
                shape: 'circle',
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#fff', '#f1f1f1', '#e5e7eb', '#d1d5db', '#e5e7eb'],
                        opacity: 0.8
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#e5e7eb'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#e5e7eb'
                    }
                },
                name: {
                    textStyle: {
                        color: '#1f2937'
                    }
                }
            },
            series: [{
                name: 'Skills',
                type: 'radar',
                data: [{
                    value: [85, 80, 80, 85, 90],
                    name: 'My Skills',
                    areaStyle: {
                        color: 'rgba(59, 130, 246, 0.5)'
                    },
                    lineStyle: {
                        color: '#3b82f6'
                    },
                    itemStyle: {
                        color: '#3b82f6'
                    }
                }]
            }]
        };

        option && myChart.setOption(option);

        // Dark mode adjustment
        const body = document.body;
        const updateChartTheme = () => {
            if (body.classList.contains('dark')) {
                myChart.setOption({
                    radar: {
                        axisLine: { lineStyle: { color: '#374151' } },
                        splitLine: { lineStyle: { color: '#374151' } },
                        splitArea: {
                            areaStyle: {
                                color: ['#111827', '#1f2937', '#374151', '#4b5563', '#374151'],
                                opacity: 0.8
                            }
                        },
                        name: { textStyle: { color: '#f3f4f6' } }
                    },
                    series: [{
                        areaStyle: { color: 'rgba(59, 130, 246, 0.5)' },
                        lineStyle: { color: '#3b82f6' },
                        itemStyle: { color: '#3b82f6' }
                    }]
                });
            } else {
                myChart.setOption({
                    radar: {
                        axisLine: { lineStyle: { color: '#e5e7eb' } },
                        splitLine: { lineStyle: { color: '#e5e7eb' } },
                        splitArea: {
                            areaStyle: {
                                color: ['#fff', '#f1f1f1', '#e5e7eb', '#d1d5db', '#e5e7eb'],
                                opacity: 0.8
                            }
                        },
                        name: { textStyle: { color: '#1f2937' } }
                    },
                    series: [{
                        areaStyle: { color: 'rgba(59, 130, 246, 0.5)' },
                        lineStyle: { color: '#3b82f6' },
                        itemStyle: { color: '#3b82f6' }
                    }]
                });
            }
        };

        updateChartTheme();
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('change', updateChartTheme);

        // Resize handler
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    }

    // Animate skill race bars in Skills section
    function animateSkillRaceBars() {
        const skillBars = document.querySelectorAll('.skill-race-bar');
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 100); // Staggered animation with 100ms delay per bar
        });
    }

    // Use IntersectionObserver to trigger animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateRadarChart();
                } else if (entry.target.id === 'skills') {
                    animateSkillRaceBars();
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe the sections
    const aboutSection = document.getElementById('about');
    const skillsSection = document.getElementById('skills');
    if (aboutSection) observer.observe(aboutSection);
    if (skillsSection) observer.observe(skillsSection);

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});