"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GallerySet } from "@/lib/galleries";

export function PropertyGallery({ eyebrow, title, copy, images }: GallerySet) {
  const [selected, setSelected] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const previous = () => setSelected(current => current === null ? null : (current - 1 + images.length) % images.length);
  const next = () => setSelected(current => current === null ? null : (current + 1) % images.length);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [selected, images.length]);

  return <section className="property-gallery-section">
    <div className="property-gallery-heading section-shell"><div><p className="kicker">{eyebrow}</p><h2>{title}</h2></div><div><p>{copy}</p><span>Select an image to expand · swipe or use arrow controls</span></div></div>
    <div className="property-gallery-grid">{images.map((image, index) => <button key={image} className={`gallery-tile tile-${index % 7}`} onClick={() => setSelected(index)} aria-label={`Open photograph ${index + 1} of ${images.length}`}><img src={image} alt={`${title} · photograph ${index + 1}`} loading={index < 3 ? "eager" : "lazy"}/><span><Camera/><Expand/></span></button>)}</div>
    {selected !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} full-screen gallery`} onClick={() => setSelected(null)}>
      <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close gallery"><X/></button>
      <button className="lightbox-arrow lightbox-previous" onClick={event => { event.stopPropagation(); previous(); }} aria-label="Previous photograph"><ChevronLeft/></button>
      <figure onClick={event => event.stopPropagation()} onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => { const end = event.changedTouches[0]?.clientX; if (touchStart.current === null || end === undefined) return; const distance = end - touchStart.current; if (distance > 45) previous(); if (distance < -45) next(); touchStart.current = null; }}><img src={images[selected]} alt={`${title} · photograph ${selected + 1}`}/><figcaption><span>{eyebrow}</span><b><Camera/> GALLERY VIEW</b></figcaption></figure>
      <button className="lightbox-arrow lightbox-next" onClick={event => { event.stopPropagation(); next(); }} aria-label="Next photograph"><ChevronRight/></button>
    </div>}
  </section>;
}
