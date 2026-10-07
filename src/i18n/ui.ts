// Textos de interfaz (navbar, hero, proyectos, contacto, pie y meta/SEO)
// en los dos idiomas. Mismo truco que en data/portfolio.ts: `en` se tipa como
// `typeof es`, así que si falta una cadena, TypeScript no compila.
import type { Lang } from '../data/portfolio';

const es = {
  meta: {
    description:
      "Bernardo Millán — Técnico en Sistemas Microinformáticos y Redes (SMR) con más de 8 años de trayectoria en retail textil y encargado de tienda. En búsqueda activa en IT y diseñador en @capsulecorp.3d.",
    jsonLd: {
      jobTitle: "Técnico en Sistemas Microinformáticos y Redes",
      knowsAbout: [
        "Sistemas Microinformáticos y Redes (SMR)",
        "Redes de Área Local y VLANs",
        "GNU/Linux y Windows Server",
        "Atención al cliente y gestión de equipos (Retail)",
        "Diseño CAD 3D Fusion 360",
        "Fabricación Aditiva FDM y Resina"
      ],
      description:
        "Profesional con más de 8 años en retail textil como encargado y dependiente, titulado en SMR y en búsqueda activa de empleo en IT."
    }
  },

  nav: {
    home: "Inicio",
    profile: "Perfil & CV",
    projects: "Proyectos 3D",
    contact: "Contacto",
    downloadCv: "Descargar CV",
    downloadCvShort: "CV",
    downloadCvTitle: "Descargar Curriculum Vitae en PDF",
    openMenu: "Abrir menú",
    mobileProfile: "Perfil & Historia",
    mobileStatus: "DISPONIBLE // IT SEEKER",
    mobileDownload: "Descargar CV PDF",
    switchAria: "Cambiar a inglés",
    switchTitle: "Ver la web en inglés"
  },

  hero: {
    status: "DISPONIBLE // BÚSQUEDA ACTIVA EN IT",
    tagline: "[SMR CERTIFIED] · [+8 AÑOS TEXTIL & ENCARGADO] · [@CAPSULECORP.3D]",
    viewProjects: "Ver Proyectos 3D"
  },

  projects: {
    marker: "PROYECTOS & FABRICACIÓN ADITIVA",
    fallbackTag: "PROYECTO 3D",
    imgLabel: "imagen",
    viewPost: "Ver publicación en Instagram",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    software: "SOFTWARE:",
    details: "DETALLES:",
    ctaTitle: "¿Tienes una pieza técnica, figura o encargo 3D?",
    ctaText:
      "Diseños personalizados a partir de bocetos, figuras coleccionables y prototipado rápido en FDM.",
    ctaLink: "Contactar en"
  },

  contact: {
    pill: "DISPONIBILIDAD INMEDIATA // CONTACTO",
    title: "INICIEMOS CONVERSACIÓN",
    intro:
      "Abierto a propuestas profesionales en soporte IT, técnico de sistemas, helpdesk o encargos especiales en @capsulecorp.3d.",
    searchStatus: "Estado de Búsqueda",
    searchActive: "Activa para incorporación inmediata",
    emailLabel: "Correo Electrónico",
    copy: "Copiar",
    copyDone: "✓ Copiado",
    instagramLabel: "Instagram 3D",
    downloadCv: "Descargar Currículum Vitae (PDF)",
    labelName: "Tu Nombre / Empresa",
    phName: "Ej: Reclutador / Empresa IT",
    labelEmail: "Tu Email de Contacto",
    phEmail: "tu@empresa.com",
    labelSubject: "Asunto / Motivo",
    phSubject: "Oportunidad laboral IT / Soporte / Fabricación 3D",
    labelMessage: "Mensaje",
    phMessage: "Cuéntame sobre la vacante o proyecto...",
    send: "Enviar Mensaje Directo",
    sending: "Enviando…",
    sent: "✓ Mensaje enviado — te contesto lo antes posible"
  },

  footer: {
    backToTop: "Volver arriba"
  }
};

const en: typeof es = {
  meta: {
    description:
      "Bernardo Millán — Computer Systems & Networks technician (SMR) with 8+ years in textile retail and as a store manager. Now looking for an IT role and designing at @capsulecorp.3d.",
    jsonLd: {
      jobTitle: "Computer Systems and Networks Technician",
      knowsAbout: [
        "Computer Systems & Networks (SMR)",
        "Local Area Networks and VLANs",
        "GNU/Linux and Windows Server",
        "Customer service and team management (Retail)",
        "CAD 3D design in Fusion 360",
        "Additive manufacturing: FDM and resin"
      ],
      description:
        "Professional with 8+ years in textile retail as store manager and sales associate, SMR graduate, actively looking for an IT job."
    }
  },

  nav: {
    home: "Home",
    profile: "Profile & CV",
    projects: "3D Projects",
    contact: "Contact",
    downloadCv: "Download CV",
    downloadCvShort: "CV",
    downloadCvTitle: "Download CV (PDF)",
    openMenu: "Open menu",
    mobileProfile: "Profile & Story",
    mobileStatus: "AVAILABLE // IT SEEKER",
    mobileDownload: "Download CV PDF",
    switchAria: "Switch to Spanish",
    switchTitle: "View this site in Spanish"
  },

  hero: {
    status: "AVAILABLE // ACTIVELY SEEKING AN IT ROLE",
    tagline: "[SMR CERTIFIED] · [+8 YRS TEXTILE & STORE MANAGER] · [@CAPSULECORP.3D]",
    viewProjects: "View 3D Projects"
  },

  projects: {
    marker: "PROJECTS & ADDITIVE MANUFACTURING",
    fallbackTag: "3D PROJECT",
    imgLabel: "image",
    viewPost: "View post on Instagram",
    prev: "Previous image",
    next: "Next image",
    software: "SOFTWARE:",
    details: "DETAILS:",
    ctaTitle: "Got a technical part, figure or 3D commission?",
    ctaText:
      "Custom designs from your own sketches, collectible figures and fast FDM prototyping.",
    ctaLink: "Contact on"
  },

  contact: {
    pill: "IMMEDIATE AVAILABILITY // CONTACT",
    title: "LET'S START A CONVERSATION",
    intro:
      "Open to professional opportunities in IT support, systems technician, helpdesk or special commissions at @capsulecorp.3d.",
    searchStatus: "Job Search Status",
    searchActive: "Active — ready to join immediately",
    emailLabel: "Email Address",
    copy: "Copy",
    copyDone: "✓ Copied",
    instagramLabel: "Instagram 3D",
    downloadCv: "Download Curriculum Vitae (PDF)",
    labelName: "Your Name / Company",
    phName: "e.g. Recruiter / IT Company",
    labelEmail: "Your Contact Email",
    phEmail: "you@company.com",
    labelSubject: "Subject / Reason",
    phSubject: "IT job opportunity / Support / 3D printing",
    labelMessage: "Message",
    phMessage: "Tell me about the role or project...",
    send: "Send Direct Message",
    sending: "Sending…",
    sent: "✓ Message sent — I'll get back to you as soon as possible"
  },

  footer: {
    backToTop: "Back to top"
  }
};

export type Ui = typeof es;
export type { Lang };
export const getUi = (lang: Lang): Ui => (lang === 'en' ? en : es);
