export async function fetchServices() {
  return [
    {
      id: 1,
      title: "Full-Stack Web Development",
      img: "service1.svg",
      description:
        "Build dynamic, scalable, and secure web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), tailored to business needs.",
    },
    {
      id: 2,
      title: "Mobile App Development",
      img: "service2.svg",
      description:
        "Develop high-performance, responsive mobile applications for Android and iOS using Flutter, with a focus on UI/UX and native-like performance.",
    },
    {
      id: 3,
      title: "Backend Development",
      img: "service3.svg",
      description:
        "Design and implement robust APIs and backend systems using Flask or FastAPI, with support for authentication and third-party integrations.",
    },
  ];
}

export async function fetchPortfolio() {
  return [
    {
      id: 1,
      image: "portfolio-1.png",
    },
    {
      id: 2,
      image: "portfolio-2.png",
    },
    {
      id: 3,
      image: "portfolio-3.png",
    },
    {
      id: 4,
      image: "portfolio-4.png",
    },
    {
      id: 5,
      image: "portfolio-5.png",
    },
  ];
}

export async function fetchExperience() {
  return [
    {
      id: 1,
      duration: "June 2024 - August 2024",
      position: "Web Developer",
      company: "Ezitech",
      description:
        "This internship provided hands-on training in frontend development and core web fundamentals. I worked on a project solving real-world challenges in modern web design.",
    },
    {
      id: 2,
      duration: "July 2025 - Present",
      position: "Software Engineer",
      company: "Altegon",
      description:
        "This internship provided hands-on training in frontend development and core web fundamentals. I worked on a project solving real-world challenges in modern web design.",
    },
    {
      id: 3,
      duration: "July 2025 - Present",
      position: "MERN Developer",
      company: "Upwork",
      description:
        "This internship provided hands-on training in frontend development and core web fundamentals. I worked on a project solving real-world challenges in modern web design.",
    },
  ];
}
