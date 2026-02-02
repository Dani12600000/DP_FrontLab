import projects from '~/assets/data/projects.json'

export const usePortfolioData = () => {
    const bio = {
        name: "Daniel",
        birthDate: "2004-07-03",
        role: "Full Stack Developer",
        description: "Versatile developer, adapting to any challenge like a morphing shape. Passionate about creating seamless and beautiful digital experiences.",
        email: "dp709020@gmail.com",
        phone: "939 053 007"
    };

    const timeline = [
        {
            year: "2004",
            title: "The Beginning",
            description: "Born into this world.",
            location: "Lisbon",
            icon: "mdi-baby-carriage"
        },
        {
            year: "2010 - 2015",
            title: "Escola de Caselas",
            description: "Primary Education (1st - 4th Grade). A 5-year journey.",
            location: "Lisbon",
            image: "/images/escola_caselas.webp",
            icon: "mdi-school"
        },
        {
            year: "2015 - 2019",
            title: "Escola Paula Vicente",
            description: "Middle School (5th - 8th Grade).",
            location: "Restelo, Lisbon",
            image: "/images/escola_paula_vicente.webp",
            icon: "mdi-school"
        },
        {
            year: "2019 - 2020",
            title: "Escola do Restelo",
            description: "9th Grade.",
            location: "Restelo, Lisbon",
            image: "/images/escola_restelo.webp",
            icon: "mdi-school"
        },
        {
            year: "2020 - 2023",
            title: "Escola Secundária Dr. Solano de Abreu",
            description: "High School & Professional Course (10th - 12th). Information Technology Technician.",
            details: "Detailed Project: PAP. Completed 2 Internships at Câmara Municipal de Abrantes during this period.",
            location: "Abrantes",
            image: "/images/escola_dr_solano_abreu.webp",
            icon: "mdi-laptop-code"
        },
        {
            year: "2023 - 2025",
            title: "ESTA - CTeSP",
            description: "Higher Education - Curso Técnico Superior Profissional.",
            details: "Internship: Planned to go to Germany, but destiny led back to Câmara Municipal de Abrantes for a 3rd successful internship.",
            location: "Abrantes",
            image: "/images/ESTA_Abrantes.jpg",
            icon: "mdi-domain"
        },
        {
            year: "Present",
            title: "SkillTech",
            description: "Full Stack Developer.",
            details: "Currently working at SkillTech, providing services for Câmara Municipal de Abrantes.",
            location: "Abrantes",
            image: null, 
            icon: "mdi-briefcase-account"
        }
    ];

    const skills = [
        { name: 'Vue.js', icon: 'mdi-vuejs', color: '#42b883' },
        { name: 'Nuxt', icon: 'mdi-nuxt', color: '#00DC82' },
        { name: 'Vuetify', icon: 'mdi-vuetify', color: '#1867C0' },
        { name: 'TypeScript', icon: 'mdi-language-typescript', color: '#3178C6' },
        { name: 'JavaScript', icon: 'mdi-language-javascript', color: '#F7DF1E' },
        { name: 'HTML5', icon: 'mdi-language-html5', color: '#E34F26' },
        { name: 'CSS3', icon: 'mdi-language-css3', color: '#1572B6' },
        { name: 'PHP', icon: 'mdi-language-php', color: '#777BB4' },
        { name: 'Python', icon: 'mdi-language-python', color: '#3776AB' },
        { name: 'Java', icon: 'mdi-language-java', color: '#007396' },
        { name: 'C', icon: 'mdi-language-c', color: '#A8B9CC' },
        { name: 'Visual Basic', icon: 'mdi-microsoft-visual-studio', color: '#5C2D91' },
        { name: 'Pascal', icon: 'mdi-code-braces', color: '#F25022' },
        { name: 'SQL', icon: 'mdi-database-search', color: '#336791' },
        { name: 'PostgreSQL', icon: 'mdi-database-outline', color: '#336791' },
        { name: 'MongoDB', icon: 'mdi-database', color: '#47A248' },
        { name: 'Node.js', icon: 'mdi-nodejs', color: '#339933' },
        { name: 'Git', icon: 'mdi-git', color: '#F05032' },
        { name: 'GSAP', icon: 'mdi-animation', color: '#88CE02' },
    ];

    return {
        bio,
        timeline,
        skills,
        projects
    };
};

