import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectLinks = {
  /** Public URL of the running product. */
  live?: string;
  /** Source repository, if it's open. */
  repo?: string;
  /** Anything else worth linking — a case study, a store listing, a demo video. */
  caseStudy?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  /** One sentence. Used on cards and in search results. */
  summary: string;
  /** e.g. "Solo developer" or "Lead frontend, team of 4". */
  role: string;
  /** Who it was for. Use "Personal project" when there was no client. */
  client: string;
  year: number;
  /** Technologies, most important first. Rendered as chips. */
  stack: string[];
  /** 2–4 outcome bullets. Numbers beat adjectives. */
  highlights: string[];
  /** Featured projects lead the homepage. */
  featured: boolean;
  /** "live" | "in-progress" | "archived" */
  status: "live" | "in-progress" | "archived";
  links: ProjectLinks;
  /** Path under /public, e.g. "/projects/inventory.png". Optional. */
  cover?: string;
  /** Controls ordering — lower numbers first. */
  order: number;
};

export type Project = ProjectMeta & {
  /** Raw MDX body, compiled by the page that renders it. */
  content: string;
};

function readProject(filename: string): Project {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    role: data.role ?? "Solo developer",
    client: data.client ?? "Personal project",
    year: data.year ?? new Date().getFullYear(),
    stack: data.stack ?? [],
    highlights: data.highlights ?? [],
    featured: data.featured ?? false,
    status: data.status ?? "live",
    links: data.links ?? {},
    cover: data.cover,
    order: data.order ?? 99,
    content,
  };
}

/** Every project, newest and highest-priority first. */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readProject)
    .sort((a, b) => a.order - b.order || b.year - a.year);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}
