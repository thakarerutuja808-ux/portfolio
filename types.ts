
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  longDescription: string;
}

export interface Hobby {
  id: string;
  name: string;
  icon: string;
  desc: string;
  longDescription: string;
  gallery: string[];
}

export interface Skill {
  name: string;
  level: string;
  icon: string;
}

export interface Tool {
  name: string;
  icon: string;
}
