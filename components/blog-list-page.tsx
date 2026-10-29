/**
 * BlogListPage — /blog listing page with all posts.
 */

import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export function BlogListPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
  ]);

  return (
    <main className="subpage">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="page-hero">
        <img
          src="/images/hero-resort.jpg"
          alt="Nakshatra Hotel & Resort Blog — Khargone Travel & Stay Guide"
        />
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="kicker">KHARGONE TRAVEL GUIDE</p>
          <h1>
            Hotel &amp; Travel <em>Blog</em>
          </h1>
          <p>
            Guides on places to visit, where to stay, wedding planning and
            dining in Khargone, Madhya Pradesh.
          </p>
        </div>
      </section>

      {/* Post list */}
      <section className="section-shell" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="rich-section-head" style={{ marginBottom: "2.5rem" }}>
          <p className="kicker">ALL POSTS</p>
          <h2>
            Guides &amp; <em>travel advice.</em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {blogPosts.map((post) => (
            <article key={post.slug} className="glass-panel" style={{ padding: "1.5rem 1.75rem" }}>
              <p className="kicker" style={{ marginBottom: "0.5rem" }}>
                {post.readingTime} ·{" "}
                {new Date(post.updated).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.93rem", marginBottom: "1.25rem" }}>
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                style={{ fontWeight: 600, fontSize: "0.9rem" }}
              >
                Read guide →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
