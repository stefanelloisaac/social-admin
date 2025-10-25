export type Platform = "instagram" | "facebook" | "tiktok" | "linkedin";

export interface PlatformConfig {
  id: Platform;
  label: string;
  description: string;
  href: string;
  pageDescription: string;
  placeholderText: string;
  buttonText: {
    new: string;
    edit: string;
    delete: string;
    schedule: string;
    reschedule: string;
  };
}

export const PLATFORMS_CONFIG: Record<Platform, PlatformConfig> = {
  instagram: {
    id: "instagram",
    label: "Instagram",
    description: "Crie, agende e analise seus posts do Instagram com facilidade.",
    href: "/instagram",
    pageDescription: "Gerencie e agende seus posts de Instagram",
    placeholderText: "Buscar posts...",
    buttonText: {
      new: "Novo Post",
      edit: "Editar",
      delete: "Deletar",
      schedule: "Agendar",
      reschedule: "Reagendar",
    },
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    description: "Organize e gerencie seus posts do Facebook de forma centralizada.",
    href: "/facebook",
    pageDescription: "Gerencie e agende seus posts do Facebook",
    placeholderText: "Buscar posts...",
    buttonText: {
      new: "Novo Post",
      edit: "Editar",
      delete: "Deletar",
      schedule: "Agendar",
      reschedule: "Reagendar",
    },
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    description: "Crie, agende e controle seu conteúdo do TikTok em um único painel.",
    href: "/tiktok",
    pageDescription: "Gerencie e agende seus vídeos do TikTok",
    placeholderText: "Buscar vídeos...",
    buttonText: {
      new: "Novo Vídeo",
      edit: "Editar",
      delete: "Deletar",
      schedule: "Agendar",
      reschedule: "Reagendar",
    },
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    description: "Compartilhe conteúdo profissional e expanda sua rede de negócios.",
    href: "/linkedin",
    pageDescription: "Gerencie e agende seus posts do LinkedIn",
    placeholderText: "Buscar posts...",
    buttonText: {
      new: "Novo Post",
      edit: "Editar",
      delete: "Deletar",
      schedule: "Agendar",
      reschedule: "Reagendar",
    },
  },
};

export function getPlatformConfig(platform: Platform): PlatformConfig {
  return PLATFORMS_CONFIG[platform];
}

export function getAllPlatforms(): PlatformConfig[] {
  return Object.values(PLATFORMS_CONFIG);
}
