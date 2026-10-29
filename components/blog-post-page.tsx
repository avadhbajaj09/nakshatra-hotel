/**
 * BlogPostPage — individual blog post template.
 * Renders Article, BreadcrumbList, and FAQPage JSON-LD.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { JsonLd } from "@/components/json-ld";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

type Props = {
  slug: string;
};

export function BlogPostPage({ slug }: Props) {
  const post = getBlogPost(slug);
  if (!post) return notFound();

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.description,
    url: postUrl,
    datePublished: post.date,
    dateModified: post.updated,
    image: siteConfig.ogImage,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: postUrl },
  ]);

  const faqSchema = buildFaqSchema(post.faqs);

  // Other posts for internal linking
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="subpage">
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero */}
      <section className="page-hero">
        <img
          src="/images/hero-resort.jpg"
          alt={`${post.title} — Nakshatra Hotel & Resort Khargone`}
        />
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="kicker">
            {post.readingTime} · Updated{" "}
            {new Date(post.updated).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </section>

      {/* Article content */}
      <article className="section-shell" style={{ paddingTop: "3rem", maxWidth: "800px" }}>
        {/* Reading time & date */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            fontSize: "0.87rem",
            color: "#777",
            flexWrap: "wrap",
          }}
        >
          <span>📖 {post.readingTime}</span>
          <span>
            Published:{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            Last updated:{" "}
            {new Date(post.updated).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Main content — HTML from blog post data */}
        <div
          className="blog-content"
          style={{ lineHeight: 1.85, color: "#333" }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* FAQ section */}
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>
            Frequently Asked Questions
          </h2>
          {post.faqs.map((faq) => (
            <details
              key={faq.q}
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                padding: "1rem 0",
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {faq.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p
                style={{
                  marginTop: "0.75rem",
                  lineHeight: 1.7,
                  color: "#444",
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div
          className="glass-panel"
          style={{
            marginTop: "3rem",
            padding: "1.75rem 2rem",
            textAlign: "center",
          }}
        >
          <p className="kicker">STAY AT NAKSHATRA HOTEL</p>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>
            Plan your Khargone visit
          </h2>
          <p style={{ color: "#555", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Nakshatra Hotel &amp; Resort — Sanawad Road, near D-Mart, Khargone.
            60 AC rooms from ₹2,999/night. Pool, restaurant &amp; ample parking.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={siteConfig.whatsappUrl}
              className="gold-button"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp to Book
            </a>
            <Link href="/rooms" className="gold-button" style={{ background: "transparent", border: "1px solid currentColor" }}>
              View Rooms
            </Link>
          </div>
        </div>
      </article>

      {/* Internal links */}
      <section className="section-shell" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="rich-section-head" style={{ marginBottom: "2rem" }}>
          <p className="kicker">CONTINUE READING</p>
          <h2>
            More guides &amp; <em>travel tips.</em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {relatedPosts.map((related) => (
            <article key={related.slug} className="glass-panel" style={{ padding: "1.25rem 1.5rem" }}>
              <p className="kicker" style={{ marginBottom: "0.5rem" }}>
                {related.readingTime}
              </p>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                <Link
                  href={`/blog/${related.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {related.title}
                </Link>
              </h3>
              <Link
                href={`/blog/${related.slug}`}
                style={{ fontWeight: 600, fontSize: "0.88rem" }}
              >
                Read →
              </Link>
            </article>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/blog" style={{ fontWeight: 600 }}>
            ← All blog posts
          </Link>
        </div>
      </section>
    </main>
  );
}
