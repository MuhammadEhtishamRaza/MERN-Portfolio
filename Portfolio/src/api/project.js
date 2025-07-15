export async function fetchServices() {
  return [
    {
      id: 1,
      title: "Web Development",
      img: "service1.svg",
      description:
        "Build dynamic, scalable, and secure web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js), tailored to business needs.",
    },
    {
      id: 2,
      title: "Mobile Development",
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

export async function fetchServiceData() {
  return [
    {
      id: 1,
      description:
        "I'm a Software Engineer specializing in MERN, Flask, FastAPI, and Flutter. I deliver scalable, high-performance web and mobile solutions tailored to business needs.",
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

export async function fetchHeroData() {
  return [
    {
      id: 1,
      title: "Muhammad Ehtisham Raza",
      description:
        "I'm a Software Engineer specializing in MERN stack, Flask, FastAPI, and Flutter. I build scalable full-stack web and mobile applications.",
      image: "portfolio.png",
    },
  ];
}

export async function fetchAbout() {
  return [
    {
      id: 1,
      description1:
        "I'm a Software Engineer specializing in MERN stack, Flask, FastAPI, and cross-platform mobile development with Flutter. I build scalable, high-performance, and user-centric web and mobile applications.",
      description2:
        "Proficient in RESTful API design, state management, and clean architecture.",
      image: "about.png",
    },
  ];
}

export async function fetchContact() {
  return [
    {
      id: 1,
      address: "Street No. 01, Sector: I-8/1, Islamabad",
      phone: "+92-310-5476796",
      email: "muhammadehtishamraza15@gmail.com",
      github: "www.github.com/MuhammadEhtishamRaza",
    },
  ];
}
