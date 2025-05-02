document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

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

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

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

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill in all fields');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="ri-loader-2-line ri-spin ri-lg mr-2"></i> Sending...';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
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

    function animateRadarChart() {
        const chartDom = document.getElementById('radar-chart');
        const myChart = echarts.init(chartDom);

        function getChartOptions() {
            const isMobile = window.innerWidth < 640;
            const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
            const fontSize = isMobile ? 10 : isTablet ? 12 : 14;
            const radius = isMobile ? '55%' : isTablet ? '65%' : '70%';
            const textColor = document.body.classList.contains('dark') ? '#f3f4f6' : '#1f2937';

            return {
                radar: {
                    indicator: [
                        { name: 'Frontend', max: 100 },
                        { name: 'Backend', max: 100 },
                        { name: 'DBMS', max: 100 },
                        { name: 'API Dev', max: 100 },
                        { name: 'DSA', max: 100 }
                    ],
                    shape: 'circle',
                    radius: radius,
                    name: {
                        textStyle: {
                            color: textColor,
                            fontWeight: 'bold',
                            fontSize: fontSize
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: document.body.classList.contains('dark')
                                ? ['#111827', '#1f2937', '#374151', '#4b5563', '#374151']
                                : ['#fff', '#f1f1f1', '#e5e7eb', '#d1d5db', '#e5e7eb'],
                            opacity: 0.8
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: document.body.classList.contains('dark') ? '#374151' : '#e5e7eb'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: document.body.classList.contains('dark') ? '#374151' : '#e5e7eb'
                        }
                    }
                },
                series: [{
                    name: 'Skills',
                    type: 'radar',
                    data: [{
                        value: [85, 80, 80, 85, 90],
                        name: 'Skill Levels',
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function(params) {
                                return params.value + '%';
                            },
                            color: textColor,
                            fontSize: fontSize,
                            fontWeight: 'bold'
                        },
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
        }

        myChart.setOption(getChartOptions());

        window.addEventListener('resize', () => {
            myChart.resize();
            myChart.setOption(getChartOptions());
        });

        themeToggle.addEventListener('change', () => {
            myChart.setOption(getChartOptions());
        });
    }

    function animateSkillRaceBars() {
        const skillBars = document.querySelectorAll('.skill-race-bar');
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 100);
        });
    }

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

    const aboutSection = document.getElementById('about');
    const skillsSection = document.getElementById('skills');
    if (aboutSection) observer.observe(aboutSection);
    if (skillsSection) observer.observe(skillsSection);

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