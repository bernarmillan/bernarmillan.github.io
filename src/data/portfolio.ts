// Contenido del portfolio en los dos idiomas del sitio.
// `es` es la fuente y `en` se tipa como `typeof es`: si falta una traducción,
// TypeScript no compila. Así es imposible que una versión se quede corta.
export type Lang = 'es' | 'en';

const es = {
  personalInfo: {
    name: "Bernardo Millán",
    firstName: "Bernardo",
    lastName: "Millán",
    monogram: "BM",
    role: "Técnico SMR · Fabricación Aditiva 3D",
    tagline: "+8 años en Retail Textil y gestión · Titulado SMR · Prototipado 3D",
    avatar: "/images/avatar.jpg",
    status: "Disponible // Búsqueda activa en IT",
    email: "bernarmillan@gmail.com",
    phone: "+34 600 000 000",
    location: "España",
    instagramHandle: "@capsulecorp.3d",
    instagramUrl: "https://www.instagram.com/capsulecorp.3d/",
    linkedin: "https://es.linkedin.com/in/bernardo-millan-luna-78b23135a",
    github: "https://github.com/bernarmillan",
    cvUrl: "/cv.pdf",
    editorialQuote: "",
  },

  cvPillars: [
    {
      id: "retail",
      badge: "+8 AÑOS DE EXPERIENCIA",
      title: "Retail Textil & Encargado",
      subtitle: "Liderazgo, Gestión & Operaciones",
      summary: "Más de 8 años en el sector textil como dependiente y ejerciendo el rol de encargado de tienda. Dominio absoluto de resolución de problemas bajo presión, gestión de personal, atención al cliente exigente y control exhaustivo de inventarios y caja.",
      skills: ["Liderazgo de equipos", "Resolución bajo presión", "Gestión operativa", "Atención al público"],
      icon: "retail"
    },
    {
      id: "smr",
      badge: "TITULACIÓN OFICIAL",
      title: "Técnico en Sistemas y Redes",
      subtitle: "Ciclo SMR (Sistemas Microinformáticos y Redes)",
      summary: "Formación especializada en despliegue de redes locales, configuración de direccionamiento IP y VLANs, mantenimiento preventivo y correctivo de hardware, soporte a puestos de trabajo y administración en entornos Linux y Windows.",
      skills: ["Redes LAN / VLANs", "GNU/Linux & Windows", "Mantenimiento hardware", "Virtualización"],
      icon: "terminal"
    },
    {
      id: "it-seeker",
      badge: "OBJETIVO PROFESIONAL",
      title: "Búsqueda Activa en IT",
      subtitle: "Soporte Técnico · Helpdesk · Redes",
      summary: "En transición activa y motivada al sector tecnológico para aportar mi capacidad resolutiva, ética de trabajo contrastada y formación técnica. Disponibilidad inmediata para incorporarme a equipos de soporte IT, Helpdesk o administración junior.",
      skills: ["Soporte L1 / L2", "Helpdesk", "Monitorización", "Disponibilidad inmediata"],
      icon: "target"
    }
  ],

  capsuleCorpInfo: {
    brand: "CAPSULE CORP 3D",
    tag: "@capsulecorp.3d",
    url: "https://www.instagram.com/capsulecorp.3d/",
    headline: "Del Concepto CAD a la Pieza Funcional",
    description: "Laboratorio de diseño paramétrico, prototipado físico y diseño personalizado. ",
    stats: [
      { label: "Tecnología", value: "FDM" },
      { label: "Software", value: "Fusion 360 / Blender" },
      { label: "Enfoque", value: "Funcionalidad & Estética" }
    ]
  },

  capsuleCorpProjects: [
    {
      id: "chasis-modular",
      title: "Funko pop personalizado",
      category: "Figuras",
      material: "PLA",
      software: "Blender",
      images: [
        "/images/capsulecorp/opt/part1.webp",
        "/images/capsulecorp/opt/part2.webp",
        "/images/capsulecorp/opt/part3.webp"
      ],
      instagramUrl: "https://www.instagram.com/capsulecorp.3d/",
      specs: "Figuras personalizadas basadas en dibujos de los propios clientes.",
      tag: "FIGURAS PERSONALIZADAS"
    },
    {
      id: "llavero-capsule",
      title: "Llavero en Fusion 360",
      category: "Modelado 3D",
      material: "PLA",
      software: "Fusion 360",
      images: [
        "/images/capsulecorp/opt/part4.webp",
        "/images/capsulecorp/opt/part5.webp",
      ],
      instagramUrl: "https://www.instagram.com/capsulecorp.3d/",
      specs: "Llavero personalizado diseñado en Fusion 360",
      tag: "CAD"
    }
  ]
};

const en: typeof es = {
  personalInfo: {
    name: "Bernardo Millán",
    firstName: "Bernardo",
    lastName: "Millán",
    monogram: "BM",
    role: "SMR Technician · Additive 3D Manufacturing",
    tagline: "+8 yrs in textile retail & store management · SMR graduate · 3D prototyping",
    avatar: "/images/avatar.jpg",
    status: "Available // Actively seeking an IT role",
    email: "bernarmillan@gmail.com",
    phone: "+34 600 000 000",
    location: "Spain",
    instagramHandle: "@capsulecorp.3d",
    instagramUrl: "https://www.instagram.com/capsulecorp.3d/",
    linkedin: "https://es.linkedin.com/in/bernardo-millan-luna-78b23135a",
    github: "https://github.com/bernarmillan",
    cvUrl: "/cv.pdf",
    editorialQuote: "",
  },

  cvPillars: [
    {
      id: "retail",
      badge: "+8 YEARS OF EXPERIENCE",
      title: "Textile Retail & Store Manager",
      subtitle: "Leadership, Management & Operations",
      summary: "More than 8 years in the textile industry as a sales associate and as store manager. Fully skilled at solving problems under pressure, managing staff, serving demanding customers and keeping strict control of inventory and cash.",
      skills: ["Team leadership", "Problem-solving under pressure", "Operations management", "Customer service"],
      icon: "retail"
    },
    {
      id: "smr",
      badge: "OFFICIAL QUALIFICATION",
      title: "Systems & Networks Technician",
      subtitle: "SMR vocational degree (Computer Systems & Networks)",
      summary: "Specialised training in local network rollouts, IP addressing and VLAN configuration, preventive and corrective hardware maintenance, end-user support and administration across Linux and Windows environments.",
      skills: ["LAN / VLAN networks", "GNU/Linux & Windows", "Hardware maintenance", "Virtualisation"],
      icon: "terminal"
    },
    {
      id: "it-seeker",
      badge: "CAREER OBJECTIVE",
      title: "Actively Seeking an IT Role",
      subtitle: "Technical Support · Helpdesk · Networking",
      summary: "Actively and willingly moving into the tech sector to bring my problem-solving ability, proven work ethic and technical training. Immediately available to join IT support, helpdesk or junior administration teams.",
      skills: ["L1 / L2 support", "Helpdesk", "Monitoring", "Available immediately"],
      icon: "target"
    }
  ],

  capsuleCorpInfo: {
    brand: "CAPSULE CORP 3D",
    tag: "@capsulecorp.3d",
    url: "https://www.instagram.com/capsulecorp.3d/",
    headline: "From CAD Concept to Functional Part",
    description: "Parametric design lab, physical prototyping and custom design. ",
    stats: [
      { label: "Technology", value: "FDM" },
      { label: "Software", value: "Fusion 360 / Blender" },
      { label: "Focus", value: "Functionality & Looks" }
    ]
  },

  capsuleCorpProjects: [
    {
      id: "chasis-modular",
      title: "Custom Funko Pop",
      category: "Figures",
      material: "PLA",
      software: "Blender",
      images: [
        "/images/capsulecorp/opt/part1.webp",
        "/images/capsulecorp/opt/part2.webp",
        "/images/capsulecorp/opt/part3.webp"
      ],
      instagramUrl: "https://www.instagram.com/capsulecorp.3d/",
      specs: "Custom figures based on the clients' own drawings.",
      tag: "CUSTOM FIGURES"
    },
    {
      id: "llavero-capsule",
      title: "Keychain in Fusion 360",
      category: "3D Modelling",
      material: "PLA",
      software: "Fusion 360",
      images: [
        "/images/capsulecorp/opt/part4.webp",
        "/images/capsulecorp/opt/part5.webp",
      ],
      instagramUrl: "https://www.instagram.com/capsulecorp.3d/",
      specs: "Custom keychain designed in Fusion 360",
      tag: "CAD"
    }
  ]
};

export type Portfolio = typeof es;

export const getPortfolio = (lang: Lang): Portfolio => (lang === 'en' ? en : es);
