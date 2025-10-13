export const projectsData = [
  {
    id: 1,
    name: "GetShorts",
    description: `I developed a web application that quickly 
    downloads videos from platforms like TikTok, Facebook, Instagram, and Twitter.`,
    date: "2024-08-1",
    demoLink: "https://getshorts.slocksert.dev/",
    tags: ["React", "Docker", "RabbitMQ", "Node.js", "Python", "Golang", "Next.js", "TailwindCSS", "DevOps"]
  },
  {
    id: 2,
    name: "NurseUtils",
    description: `I developed a web application to help nurses manage the data of
    other centers and hospitals in the region. The app allows users to add, edit,
    and delete centers, agents and locations. I used Django with MySQL as the database.`,
    date: "2024-10-1",
    demoLink: "https://nurseutils.slocksert.dev",
    tags: ["Django", "MySQL", "Bootstrap", "Python", "Docker"]
  },
  {
    id: 3,
    name: "Portfolio",
    description: `My portfolio built with React and TailWind CSS`,
    date: "2024-01-1",
    demoLink: "https://slocksert.dev",
    tags: ["React", "TailwindCSS", "Docker"]
  },
  {
    id: 4,
    name: "Automation Project", 
    description: `Developed a bot using Selenium to meet client needs, which involved accessing a website where the
    client manually transcribed real estate data to a Word document, including data and images. 
    Successfully automated a process that would have taken weeks of effort into just a few hours.`,
    date: "2023-11-1",
    demoLink: "https://github.com/slocksert/tayrbot",
    tags: ["Python", "Selenium", "Automation"]
  },
  {
    id: 5,
    name: "CyberSecurity Insights",
    description: `I developed this website as an extension project aimed at raising awareness among children in public and private schools`,
    date: "2023-07-1",
    demoLink: "https://cybersegurancainsights.github.io",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 6,
    name: "RBAC API",
    description: `The RBAC API is a FastAPI implementation featuring Role-Based Access Control (RBAC), utilizing 
    a MySQL Docker container as its database backend and Alembic for seamless migrations. This personal project
    was created with the goal of mastering dependency injection and implementing robust role management for 
    access control. Ideal for developers aiming to learn and implement advanced authentication and authorization
    mechanisms in their applications.`,
    date: "2022-07-1",
    demoLink: "https://github.com/slocksert/rbac",
    tags: ["Python", "FastAPI", "MySQL", "Docker", "Alembic"]
  },
  {
    id: 7,
    name: "Random Dictionary",
    description: `Discover a new word every time you visit with Random Dictionary. This service integrates two APIs:
    one to fetch a JSON packed with words and another to query a dictionary API with each selected word. Users can 
    save interesting words by clicking the Star icon, ensuring a personalized vocabulary collection. Ideal for 
    language enthusiasts looking to expand their lexicon effortlessly.`,
    date: "2023-11-1",
    demoLink: "https://rdict.slocksert.dev/",
    tags: ["Django", "Python", "JavaScript", "HTML", "CSS", "MySQL", "Docker"]
  },
  {
    id: 8,
    name: "News Webscraper",
    description: `The Headline Finder extracts headlines, links, dates, and corresponding images from G1's website 
    (local news website). Built using SQLAlchemy for seamless database interaction and FastAPI for robust web framework
    support, this software scrapes news data, stores it initially in a CSV file, and efficiently manages data 
    duplication by checking existing entries in the database before committing new updates. Ideal for those needing
    a reliable tool to stay updated with the latest headlines from G1.`,
    date: "2024-04-1",
    demoLink: "https://github.com/slocksert/g1_WebScrapper",
    tags: ["Python", "FastAPI", "SQLAlchemy", "WebScrapper", "Selenium", "CSV", "MySQL", "Docker"]
  },
  {
    id: 9,
    name: "Linux Home Organizer",
    description: `File Organizer leverages Python for its core functionality, utilizing libraries for file handling 
    and directory management. It provides a straightforward GUI interface powered by Tkinter, ensuring ease of use
    across different platforms. Ideal for automating file organization tasks, this tool enhances productivity by 
    efficiently categorizing files into designated folders based on their formats.`,
    date: "2022-04-1",
    demoLink: "https://github.com/slocksert/Organizer",
    tags: ["Python", "Tkinter", "GUI", "Automation"]
  },
  
];

export const BtnList = [
  { label: "About", link: "/about", icon: "about", newTab: false },
  { label: "Projects", link: "/projects", icon: "projects", newTab: false },
  { label: "Contact", link: "/contact", icon: "contact", newTab: false },
  {
    label: "Github",
    link: "https://github.com/jjola00",
    icon: "github",
    newTab: true,
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/jay-jay-olajitan/",
    icon: "linkedin",
    newTab: true,
  },
  {
    label: "Resume",
    link: "/resume.pdf",
    icon: "resume",
    newTab: true,
  },
];


