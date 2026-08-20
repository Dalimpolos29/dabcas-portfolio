import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [{ href: "/" }, ...nav].map((page) => ({
    url: `${site.url}${page.href === "/" ? "" : page.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.href === "/" ? 1 : 0.8,
  }));

  const projects = getAllProjects().map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
