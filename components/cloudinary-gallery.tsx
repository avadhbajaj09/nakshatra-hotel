"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3, Layers } from "lucide-react";

/* ─────────────────────────────────────────────
   IMAGE DATA — all 82 Cloudinary images
────────────────────────────────────────────── */
const BASE = "https://res.cloudinary.com/qtah71h2/image/upload";
const f = (id: string, name: string, category: string, label: string) => ({ id, url: `${BASE}/v1786616869/nakshatra-new-photoshoot-2026-08-13/${id}.jpg`, name, category, label });

// Cloudinary-optimized URL builder
const thumb = (rawUrl: string) => rawUrl.replace("/upload/", "/upload/w_700,h_520,c_fill,f_auto,q_auto/");
const full = (rawUrl: string) => rawUrl.replace("/upload/", "/upload/w_1600,f_auto,q_85/");

type GalleryImage = { id: number; url: string; name: string; category: string; label: string };

const IMAGES: GalleryImage[] = [
  { id: 1, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616869/nakshatra-new-photoshoot-2026-08-13/e4f4tneqxy4ymefmi0q4.jpg", name: "Banquet Hall Birthday Setup", category: "banquet", label: "Birthday Setup · Banquet Hall" },
  { id: 2, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616857/nakshatra-new-photoshoot-2026-08-13/loxne7joadvrrunvwabs.jpg", name: "Guest Room 06", category: "rooms", label: "Guest Room · Comfortable Stay" },
  { id: 3, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616862/nakshatra-new-photoshoot-2026-08-13/dmb2yozmtgjcs3dtvbmn.jpg", name: "Resort Exterior Front 02", category: "exterior", label: "Resort Exterior · Grand Facade" },
  { id: 4, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616882/nakshatra-new-photoshoot-2026-08-13/dci6d210aolnev2wt5et.jpg", name: "Ground Floor Public Pool 01", category: "pool-public", label: "Public Pool · Ground Floor" },
  { id: 5, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616875/nakshatra-new-photoshoot-2026-08-13/wdqclxmmryupnbodpmdi.jpg", name: "Ground Floor Pool Guest 04", category: "pool-public", label: "Pool Experience · Guest Delight" },
  { id: 6, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616932/nakshatra-new-photoshoot-2026-08-13/zyd3bvrtlvvv5z0wukl6.jpg", name: "3rd Floor Private Pool Chef Service", category: "pool-private", label: "Private Pool · Chef Service" },
  { id: 7, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616919/nakshatra-new-photoshoot-2026-08-13/kt69vgerxpmotckhwifw.jpg", name: "3rd Floor Private Pool Couple 01", category: "pool-private", label: "Private Pool · Couple Escape" },
  { id: 8, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616905/nakshatra-new-photoshoot-2026-08-13/dywjm9rsxlzjawqtpdrx.jpg", name: "Lobby Seating Area 02", category: "lobby", label: "Lobby · Elegant Seating" },
  { id: 9, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616952/nakshatra-new-photoshoot-2026-08-13/c3wjfir8t1itwwsgfxl4.jpg", name: "Ground Floor Pool Guest 05", category: "pool-public", label: "Pool · Guest Moments" },
  { id: 10, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616945/nakshatra-new-photoshoot-2026-08-13/t4yzmprdqc66pdbbkvgq.jpg", name: "Restaurant Spinach Curry", category: "restaurant", label: "Restaurant · Spinach Curry" },
  { id: 11, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616900/nakshatra-new-photoshoot-2026-08-13/vloz5myrtjforpbqnbmx.jpg", name: "Resort Exterior Garden 02", category: "exterior", label: "Resort Garden · Lush Greens" },
  { id: 12, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616926/nakshatra-new-photoshoot-2026-08-13/ke1tnitqaw18kirctxxh.jpg", name: "Restaurant Dining Experience 01", category: "restaurant", label: "Restaurant · Dining Experience" },
  { id: 13, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616958/nakshatra-new-photoshoot-2026-08-13/jtt3xk4ciypya02ktvya.jpg", name: "Public Pool Sunset 04", category: "pool-public", label: "Pool at Sunset · Golden Hour" },
  { id: 14, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616912/nakshatra-new-photoshoot-2026-08-13/nrrrg7nh7yrn4f4xyuc1.jpg", name: "Deluxe Guest Room 01", category: "rooms", label: "Deluxe Room · Premium Comfort" },
  { id: 15, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616939/nakshatra-new-photoshoot-2026-08-13/zigrplelc4ej8ulgb43m.jpg", name: "Banquet Hall Anniversary Party", category: "banquet", label: "Anniversary Party · Grand Hall" },
  { id: 16, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616995/nakshatra-new-photoshoot-2026-08-13/jnbsuvnnsjfqdnahfize.jpg", name: "Lobby Atrium 01", category: "lobby", label: "Lobby Atrium · Grand Arrival" },
  { id: 17, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616976/nakshatra-new-photoshoot-2026-08-13/osf3fbot2ozdvrnpmqs4.jpg", name: "Guest Room 07", category: "rooms", label: "Guest Room · Restful Stay" },
  { id: 18, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617015/nakshatra-new-photoshoot-2026-08-13/jrrf38snmdxsidugremw.jpg", name: "Restaurant Food Pasta", category: "restaurant", label: "Restaurant · Fresh Pasta" },
  { id: 19, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617009/nakshatra-new-photoshoot-2026-08-13/lx2hoplggenrateotf5c.jpg", name: "Public Pool Sunset 03", category: "pool-public", label: "Pool · Sunset Glow" },
  { id: 20, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616981/nakshatra-new-photoshoot-2026-08-13/hgj31h0ij7pzjlijxmdz.jpg", name: "Ground Floor Public Pool 07", category: "pool-public", label: "Public Pool · Crystal Clear" },
  { id: 21, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617035/nakshatra-new-photoshoot-2026-08-13/kkr7cqeagtsrwzxlopr1.jpg", name: "Banquet Hall Wedding Ceremony", category: "banquet", label: "Wedding Ceremony · Grand Hall" },
  { id: 22, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616989/nakshatra-new-photoshoot-2026-08-13/jbfh8ujuheaafnhbqsdi.jpg", name: "Public Pool Guest 02", category: "pool-public", label: "Pool · Refreshing Swim" },
  { id: 23, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617028/nakshatra-new-photoshoot-2026-08-13/r6hgwg0dx3f2vgigomhl.jpg", name: "Restaurant Celebration Setup", category: "restaurant", label: "Restaurant · Celebration Dining" },
  { id: 24, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617003/nakshatra-new-photoshoot-2026-08-13/bwnox39vxwbihkqaja1z.jpg", name: "Restaurant Interior 02", category: "restaurant", label: "Restaurant Interior · Elegant" },
  { id: 25, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617022/nakshatra-new-photoshoot-2026-08-13/ss31jzx6biooea5gygfl.jpg", name: "Banquet Hall Dining Setup 02", category: "banquet", label: "Banquet Dining · Grand Setup" },
  { id: 26, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617101/nakshatra-new-photoshoot-2026-08-13/x2esjufpw5h4k4nzosgc.jpg", name: "3rd Floor Private Pool Guest 02", category: "pool-private", label: "Private Pool · Exclusive Guest" },
  { id: 27, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617055/nakshatra-new-photoshoot-2026-08-13/yh32q0cafdju1prbgaj9.jpg", name: "3rd Floor Private Pool 03", category: "pool-private", label: "Private Pool · Serene Waters" },
  { id: 28, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617071/nakshatra-new-photoshoot-2026-08-13/mbka0pnhatnqkpr1j9uh.jpg", name: "Massage Room 01", category: "spa", label: "Spa & Massage · Relaxation Room" },
  { id: 29, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617060/nakshatra-new-photoshoot-2026-08-13/haxs0hikw2j7yxonqtz8.jpg", name: "3rd Floor Private Pool 02", category: "pool-private", label: "Private Pool · Rooftop Luxury" },
  { id: 30, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617085/nakshatra-new-photoshoot-2026-08-13/gudojikarherskpgsnh0.jpg", name: "3rd Floor Private Pool Night 02", category: "pool-private", label: "Private Pool · Night Glow" },
  { id: 31, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617114/nakshatra-new-photoshoot-2026-08-13/vmsklimk8xebmiibek4l.jpg", name: "3rd Floor Private Pool Guest 03", category: "pool-private", label: "Private Pool · Exclusive Stay" },
  { id: 32, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617064/nakshatra-new-photoshoot-2026-08-13/apsggadpoxkuzutabhlp.jpg", name: "Guest Room 01", category: "rooms", label: "Guest Room · Classic Comfort" },
  { id: 33, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617093/nakshatra-new-photoshoot-2026-08-13/rxhj3wfoj0ihrp0xcev8.jpg", name: "Restaurant Interior 03", category: "restaurant", label: "Restaurant · Warm Ambiance" },
  { id: 34, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617078/nakshatra-new-photoshoot-2026-08-13/wkh8f7xelc8ihncdcmuh.jpg", name: "Round Bed Suite 01", category: "rooms", label: "Round Bed Suite · Ultra Luxury" },
  { id: 35, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617107/nakshatra-new-photoshoot-2026-08-13/qyfxrc6p6wgxrvfpfiji.jpg", name: "Public Pool Sunset 02", category: "pool-public", label: "Pool at Sunset · Warm Hues" },
  { id: 36, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617157/nakshatra-new-photoshoot-2026-08-13/rwev391p2ngzsnk0wcyj.jpg", name: "Round Bed Suite 02", category: "rooms", label: "Round Bed Suite · Romantic Stay" },
  { id: 37, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617185/nakshatra-new-photoshoot-2026-08-13/h9k4zgg8tyzzbeps2wrj.jpg", name: "Public Pool Night 01", category: "pool-public", label: "Pool by Night · Illuminated" },
  { id: 38, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617175/nakshatra-new-photoshoot-2026-08-13/qvwj8acvdd8cmmpjcwty.jpg", name: "Public Pool Sunset 01", category: "pool-public", label: "Pool · First Sunset Light" },
  { id: 39, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617163/nakshatra-new-photoshoot-2026-08-13/wz4ept6r2drcdk8c8nh9.jpg", name: "Deluxe Guest Room 04", category: "rooms", label: "Deluxe Room · Spacious & Bright" },
  { id: 40, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617169/nakshatra-new-photoshoot-2026-08-13/gdldzoqyuhk5hrgfsvca.jpg", name: "3rd Floor Private Pool Night 01", category: "pool-private", label: "Private Pool · Starlit Night" },
  { id: 41, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617139/nakshatra-new-photoshoot-2026-08-13/pjtfuiie4ih6nffva4xy.jpg", name: "3rd Floor Private Pool 01", category: "pool-private", label: "Private Pool · Clear Skies" },
  { id: 42, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617152/nakshatra-new-photoshoot-2026-08-13/iqkmjqql85oimlehltm3.jpg", name: "Makeup Room 01", category: "spa", label: "Bridal Suite · Makeup Room" },
  { id: 43, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617180/nakshatra-new-photoshoot-2026-08-13/des5nllumnbq1aeqfuy8.jpg", name: "Fountain Courtyard 01", category: "exterior", label: "Fountain Courtyard · Tranquil" },
  { id: 44, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617146/nakshatra-new-photoshoot-2026-08-13/u4qb2zxybtoak9t89jlx.jpg", name: "Ground Floor Public Pool 09", category: "pool-public", label: "Public Pool · Spacious Area" },
  { id: 45, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617134/nakshatra-new-photoshoot-2026-08-13/zo5hisolqoxcloghhew7.jpg", name: "Guest Room 02", category: "rooms", label: "Guest Room · Warm & Inviting" },
  { id: 46, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617210/nakshatra-new-photoshoot-2026-08-13/xzpspj9a1pfd1avi3dc9.jpg", name: "Guest Room 03", category: "rooms", label: "Guest Room · Modern Comfort" },
  { id: 47, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617246/nakshatra-new-photoshoot-2026-08-13/mzzqt1gdvcizbw6q2ihx.jpg", name: "Banquet Hall Dining Setup 01", category: "banquet", label: "Banquet Hall · Gala Dining" },
  { id: 48, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617221/nakshatra-new-photoshoot-2026-08-13/tpx5nzpph0ycagy1p9ll.jpg", name: "Ground Floor Public Pool 08", category: "pool-public", label: "Public Pool · Pristine Waters" },
  { id: 49, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617259/nakshatra-new-photoshoot-2026-08-13/r94wjjm5swtpb8oqqrrp.jpg", name: "3rd Floor Private Pool Guest 01", category: "pool-private", label: "Private Pool · Couple Retreat" },
  { id: 50, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617268/nakshatra-new-photoshoot-2026-08-13/yiihvaifivhl86bkh5vs.jpg", name: "Restaurant Food Platter", category: "restaurant", label: "Restaurant · Signature Platter" },
  { id: 51, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617240/nakshatra-new-photoshoot-2026-08-13/mvf6exi15d36dkqbs5s4.jpg", name: "Lobby Reception 01", category: "lobby", label: "Lobby Reception · Welcome Desk" },
  { id: 52, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617252/nakshatra-new-photoshoot-2026-08-13/m3kjkvorwod8zkbl3vdx.jpg", name: "3rd Floor Private Pool Photoshoot", category: "pool-private", label: "Private Pool · Fashion Shoot" },
  { id: 53, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617234/nakshatra-new-photoshoot-2026-08-13/uaa3k3se5ylzvrwxlxuz.jpg", name: "Lobby Elevators 01", category: "lobby", label: "Lobby · Elegant Elevators" },
  { id: 54, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617216/nakshatra-new-photoshoot-2026-08-13/n1w6dh2eynvdqvntrr4k.jpg", name: "Resort Exterior Lawn 01", category: "exterior", label: "Resort Lawn · Lush Grounds" },
  { id: 55, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617228/nakshatra-new-photoshoot-2026-08-13/qtcmrahyxkkrxqnb8ecj.jpg", name: "Deluxe Guest Room 05", category: "rooms", label: "Deluxe Room · Premium Suite" },
  { id: 56, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617290/nakshatra-new-photoshoot-2026-08-13/pfl08sldromtxz49k9ch.jpg", name: "Resort Exterior Driveway 01", category: "exterior", label: "Grand Driveway · Resort Arrival" },
  { id: 57, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617297/nakshatra-new-photoshoot-2026-08-13/sm4efzixhuudcxyds7zh.jpg", name: "Guest Floor Corridor 01", category: "lobby", label: "Guest Corridor · Elegant Hallway" },
  { id: 58, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617336/nakshatra-new-photoshoot-2026-08-13/fyqi1gfvsmyc8f3g97qr.jpg", name: "3rd Floor Private Pool Family", category: "pool-private", label: "Private Pool · Family Moments" },
  { id: 59, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617304/nakshatra-new-photoshoot-2026-08-13/xucnlbsrazmqkptkjtyu.jpg", name: "Deluxe Guest Room 02", category: "rooms", label: "Deluxe Room · Serene Interior" },
  { id: 60, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617318/nakshatra-new-photoshoot-2026-08-13/sjrmhf0nmxbv0dluv1nc.jpg", name: "Banquet Hall Table Setup 01", category: "banquet", label: "Banquet Hall · Table Setup" },
  { id: 61, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617330/nakshatra-new-photoshoot-2026-08-13/kb3xuyfuzqwotttagqa0.jpg", name: "Banquet Hall Event Setup 01", category: "banquet", label: "Banquet · Corporate Event" },
  { id: 62, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617284/nakshatra-new-photoshoot-2026-08-13/j2bz0g9u48wtjvmgvccm.jpg", name: "Guest Room 04", category: "rooms", label: "Guest Room · Cozy Retreat" },
  { id: 63, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617325/nakshatra-new-photoshoot-2026-08-13/efv0d8jhbnfnbbd3brj6.jpg", name: "Banquet Hall Birthday Party 01", category: "banquet", label: "Birthday Party · Grand Celebration" },
  { id: 64, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617342/nakshatra-new-photoshoot-2026-08-13/nqrzxssrgkjueqms9jxr.jpg", name: "Banquet Hall Wedding Buffet 01", category: "banquet", label: "Wedding Buffet · Lavish Spread" },
  { id: 65, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617310/nakshatra-new-photoshoot-2026-08-13/yuy3h6u8xcdz2mztboqd.jpg", name: "3rd Floor Private Pool Couple 02", category: "pool-private", label: "Private Pool · Romantic Evening" },
  { id: 66, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617382/nakshatra-new-photoshoot-2026-08-13/m5a0srhdlegn8o9aznla.jpg", name: "Lobby Seating Area 01", category: "lobby", label: "Lobby · Relaxed Seating" },
  { id: 67, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617409/nakshatra-new-photoshoot-2026-08-13/nywx5vxpu2lbs5msiehv.jpg", name: "Public Pool Guest 06", category: "pool-public", label: "Pool · Joyful Swim" },
  { id: 68, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617395/nakshatra-new-photoshoot-2026-08-13/fmipheny2aw0dbuagewi.jpg", name: "Ground Floor Public Pool 03", category: "pool-public", label: "Public Pool · Clear & Inviting" },
  { id: 69, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617371/nakshatra-new-photoshoot-2026-08-13/rund6ldg3itazocbbfkw.jpg", name: "Restaurant Dining Experience 02", category: "restaurant", label: "Restaurant · Fine Dining Table" },
  { id: 70, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617376/nakshatra-new-photoshoot-2026-08-13/wgouvtvxcrxfgt6ridba.jpg", name: "Guest Room 08", category: "rooms", label: "Guest Room · Bright & Airy" },
  { id: 71, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617365/nakshatra-new-photoshoot-2026-08-13/ey806uiw0tuqep2mde5p.jpg", name: "Restaurant Private Dining 01", category: "restaurant", label: "Private Dining · Exclusive Table" },
  { id: 72, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616835/nakshatra-new-photoshoot-2026-08-13/zlbg1gtdom6rwpslnbl1.jpg", name: "Deluxe Guest Room Service 01", category: "rooms", label: "Deluxe Room · Butler Service" },
  { id: 73, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617401/nakshatra-new-photoshoot-2026-08-13/iy8dlafxgtry8ypdtfpl.jpg", name: "Banquet Hall Wedding Setup 01", category: "banquet", label: "Wedding Setup · Floral Stage" },
  { id: 74, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617388/nakshatra-new-photoshoot-2026-08-13/akqpekijqgvoehzbnljj.jpg", name: "Restaurant Private Event 01", category: "restaurant", label: "Restaurant · Private Event" },
  { id: 75, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617356/nakshatra-new-photoshoot-2026-08-13/vacfcznrwb9sn87xvo1l.jpg", name: "Guest Room 05", category: "rooms", label: "Guest Room · Evening Glow" },
  { id: 76, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617415/nakshatra-new-photoshoot-2026-08-13/ydaly3y6h5enmabhw96n.jpg", name: "Banquet Hall Corporate Event 01", category: "banquet", label: "Corporate Event · Grand Hall" },
  { id: 77, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617451/nakshatra-new-photoshoot-2026-08-13/uabmth7vtowtlf6uniom.jpg", name: "Banquet Hall Wedding Stage 01", category: "banquet", label: "Wedding Stage · Grand Decor" },
  { id: 78, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617432/nakshatra-new-photoshoot-2026-08-13/uab6wyvzzszkslrd9mib.jpg", name: "Kids Play Area 01", category: "exterior", label: "Kids Play Area · Family Fun" },
  { id: 79, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617457/nakshatra-new-photoshoot-2026-08-13/xwceoigx87rfwog17wwp.jpg", name: "Restaurant Food Kebab 01", category: "restaurant", label: "Restaurant · Sizzling Kebab" },
  { id: 80, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617443/nakshatra-new-photoshoot-2026-08-13/q3ea6lihe9ufljajzhrv.jpg", name: "Resort Exterior Front 01", category: "exterior", label: "Resort · Iconic Front Facade" },
  { id: 81, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786617437/nakshatra-new-photoshoot-2026-08-13/pcntlcq36kj9aebmqzn8.jpg", name: "Deluxe Guest Room 03", category: "rooms", label: "Deluxe Room · Plush Bedding" },
  { id: 82, url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616869/nakshatra-new-photoshoot-2026-08-13/e4f4tneqxy4ymefmi0q4.jpg", name: "Banquet Hall Birthday Setup 01", category: "banquet", label: "Birthday Setup · Colourful Decor" },
];

const CATEGORIES = [
  { id: "all", label: "All Photos", emoji: "✦" },
  { id: "pool-private", label: "Private Pool", emoji: "🌊" },
  { id: "pool-public", label: "Guest Pool", emoji: "💧" },
  { id: "rooms", label: "Rooms & Suites", emoji: "🛏" },
  { id: "banquet", label: "Banquet & Events", emoji: "🎊" },
  { id: "restaurant", label: "Restaurant", emoji: "🍽" },
  { id: "exterior", label: "Resort Exterior", emoji: "🏨" },
  { id: "lobby", label: "Lobby & Spaces", emoji: "🏛" },
  { id: "spa", label: "Spa & Wellness", emoji: "✨" },
];

export function CloudinaryGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = activeCategory === "all" ? IMAGES : IMAGES.filter(img => img.category === activeCategory);
  const count = filtered.length;

  const prev = useCallback(() => setActiveIndex(i => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setActiveIndex(i => (i + 1) % count), [count]);

  const lightboxPrev = useCallback(() => setLightboxIndex(i => (i - 1 + count) % count), [count]);
  const lightboxNext = useCallback(() => setLightboxIndex(i => (i + 1) % count), [count]);

  // Category change resets index
  useEffect(() => { setActiveIndex(0); }, [activeCategory]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "ArrowLeft") lightboxPrev();
        if (e.key === "ArrowRight") lightboxNext();
        if (e.key === "Escape") setLightboxOpen(false);
      } else {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, prev, next, lightboxPrev, lightboxNext]);

  // Auto-play
  useEffect(() => {
    if (isPaused || lightboxOpen || viewMode === "grid") { if (autoPlayRef.current) clearInterval(autoPlayRef.current); return; }
    autoPlayRef.current = setInterval(() => setActiveIndex(i => (i + 1) % count), 4000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isPaused, lightboxOpen, viewMode, count]);

  // Scroll lock when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true); };

  // Touch handlers for carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) { dx > 0 ? prev() : next(); }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Touch handlers for lightbox
  const lbTouchStartX = useRef<number | null>(null);
  const handleLbTouchStart = (e: React.TouchEvent) => { lbTouchStartX.current = e.touches[0].clientX; };
  const handleLbTouchEnd = (e: React.TouchEvent) => {
    if (lbTouchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - lbTouchStartX.current;
    if (Math.abs(dx) > 40) { dx > 0 ? lightboxPrev() : lightboxNext(); }
    lbTouchStartX.current = null;
  };

  // 3D transform calculation
  const getCardStyle = (index: number): React.CSSProperties => {
    const total = Math.min(count, 9);
    const spread = Math.min(count, 9);
    let offset = index - activeIndex;
    if (offset > spread / 2) offset -= count;
    if (offset < -spread / 2) offset += count;
    if (Math.abs(offset) > 4) return { display: "none" };
    const absOff = Math.abs(offset);
    const translateX = offset * 260;
    const translateZ = -absOff * 120;
    const rotateY = offset * -42;
    const scale = 1 - absOff * 0.12;
    const opacity = 1 - absOff * 0.22;
    const zIndex = 10 - absOff;
    const filter = absOff > 0 ? `blur(${absOff * 0.8}px) brightness(${1 - absOff * 0.15})` : "none";
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity, zIndex, filter,
      transition: "all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };
  };

  const activeImage = filtered[activeIndex];
  const lightboxImage = filtered[lightboxIndex];

  return (
    <div className="cg-root">
      {/* ── HERO HEADER ── */}
      <div className="cg-hero-header">
        <p className="cg-eyebrow kicker">✦ NAKSHATRA HOTEL &amp; RESORT · KHARGONE</p>
        <h1 className="cg-title">A glimpse of <em>Nakshatra.</em></h1>
        <p className="cg-subtitle">{IMAGES.length} real photographs from our 2026 photoshoot — rooms, pools, celebrations &amp; resort life.</p>
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div className="cg-filter-wrap">
        <div className="cg-filter-strip" role="tablist" aria-label="Filter gallery by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`cg-filter-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="cg-pill-emoji">{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className="cg-pill-count">{cat.id === "all" ? IMAGES.length : IMAGES.filter(i => i.category === cat.id).length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── VIEW TOGGLE ── */}
      <div className="cg-view-toggle">
        <button className={`cg-view-btn ${viewMode === "3d" ? "active" : ""}`} onClick={() => setViewMode("3d")} aria-label="3D carousel view">
          <Layers size={16}/> <span>3D View</span>
        </button>
        <button className={`cg-view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")} aria-label="Grid view">
          <Grid3X3 size={16}/> <span>Grid View</span>
        </button>
        <span className="cg-count-badge">{count} photos</span>
      </div>

      {/* ── 3D CAROUSEL ── */}
      {viewMode === "3d" && (
        <div
          className="cg-stage-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="cg-stage">
            <div className="cg-scene" style={{ perspective: "1400px" }}>
              <div className="cg-track">
                {filtered.slice(0, Math.min(count, 9)).map((img, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={img.id}
                      className={`cg-card ${isActive ? "cg-card-active" : ""}`}
                      style={getCardStyle(i)}
                      onClick={() => { if (isActive) openLightbox(i); else setActiveIndex(i); }}
                      role="button"
                      tabIndex={isActive ? 0 : -1}
                      aria-label={isActive ? `Open ${img.label} in lightbox` : `View ${img.label}`}
                      onKeyDown={e => { if (isActive && (e.key === "Enter" || e.key === " ")) openLightbox(i); }}
                    >
                      <div className="cg-card-inner">
                        <img
                          src={thumb(img.url)}
                          alt={img.label}
                          loading={Math.abs(i - activeIndex) <= 2 ? "eager" : "lazy"}
                          draggable={false}
                        />
                        <div className="cg-card-shine" />
                        {isActive && (
                          <div className="cg-card-overlay">
                            <span className="cg-card-zoom"><ZoomIn size={22}/></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── NAV BUTTONS ── */}
            <button className="cg-nav cg-nav-prev" onClick={prev} aria-label="Previous image"><ChevronLeft size={28}/></button>
            <button className="cg-nav cg-nav-next" onClick={next} aria-label="Next image"><ChevronRight size={28}/></button>
          </div>

          {/* ── ACTIVE LABEL ── */}
          {activeImage && (
            <div className="cg-active-label">
              <p className="kicker">{CATEGORIES.find(c => c.id === activeImage.category)?.label}</p>
              <h2>{activeImage.label}</h2>
              <p className="cg-nav-hint">← Swipe or use arrow keys to explore → <span>Click centre image to open full screen</span></p>
            </div>
          )}

          {/* ── DOT INDICATORS ── */}
          <div className="cg-dots" role="tablist" aria-label="Carousel position">
            {filtered.slice(0, Math.min(count, 9)).map((_, i) => (
              <button
                key={i}
                className={`cg-dot ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                role="tab"
                aria-selected={i === activeIndex}
              />
            ))}
          </div>

          {/* ── PROGRESS THUMBNAILS ── */}
          <div className="cg-thumb-strip">
            {filtered.slice(Math.max(0, activeIndex - 3), Math.min(count, activeIndex + 8)).map((img, relIdx) => {
              const absIdx = Math.max(0, activeIndex - 3) + relIdx;
              return (
                <button
                  key={img.id}
                  className={`cg-thumb ${absIdx === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(absIdx)}
                  aria-label={img.label}
                >
                  <img src={thumb(img.url)} alt="" loading="lazy" draggable={false}/>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {viewMode === "grid" && (
        <div className="cg-grid">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              className="cg-grid-item"
              onClick={() => openLightbox(i)}
              aria-label={`Open ${img.label} in full screen`}
            >
              <img src={thumb(img.url)} alt={img.label} loading="lazy" draggable={false}/>
              <div className="cg-grid-overlay">
                <ZoomIn size={20}/>
                <span>{img.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && lightboxImage && (
        <div
          className="cg-lightbox"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
          onTouchStart={handleLbTouchStart}
          onTouchEnd={handleLbTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="cg-lb-inner">
            {/* Close */}
            <button className="cg-lb-close" onClick={() => setLightboxOpen(false)} aria-label="Close lightbox"><X size={24}/></button>

            {/* Prev */}
            <button className="cg-lb-nav cg-lb-prev" onClick={(e) => { e.stopPropagation(); lightboxPrev(); }} aria-label="Previous image"><ChevronLeft size={32}/></button>

            {/* Image */}
            <div className="cg-lb-image-wrap">
              <img
                key={lightboxImage.id}
                src={full(lightboxImage.url)}
                alt={lightboxImage.label}
                className="cg-lb-image"
                draggable={false}
              />
            </div>

            {/* Next */}
            <button className="cg-lb-nav cg-lb-next" onClick={(e) => { e.stopPropagation(); lightboxNext(); }} aria-label="Next image"><ChevronRight size={32}/></button>

            {/* Caption */}
            <div className="cg-lb-caption">
              <p className="kicker">{CATEGORIES.find(c => c.id === lightboxImage.category)?.emoji} {CATEGORIES.find(c => c.id === lightboxImage.category)?.label}</p>
              <h3>{lightboxImage.label}</h3>
              <span>{lightboxIndex + 1} / {count}</span>
            </div>

            {/* Thumbnail strip */}
            <div className="cg-lb-thumbs">
              {filtered.map((img, i) => (
                <button
                  key={img.id}
                  className={`cg-lb-thumb ${i === lightboxIndex ? "active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  aria-label={img.label}
                >
                  <img src={thumb(img.url)} alt="" loading="lazy" draggable={false}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA STRIP ── */}
      <div className="cg-cta-strip">
        <div className="cg-cta-content">
          <p className="kicker">✦ EXPERIENCE NAKSHATRA IN PERSON</p>
          <h2>Every photo tells<br/><em>a real story.</em></h2>
          <p>60 rooms, private pools, grand banquet hall, fine dining &amp; resort grounds — all in Khargone, Madhya Pradesh.</p>
          <a
            href="https://wa.me/919425088369?text=Hello%20Nakshatra%20Hotel%20%26%20Resort%2C%20I%20saw%20your%20gallery%20and%20would%20like%20to%20inquire%20about%20availability."
            target="_blank"
            rel="noreferrer"
            className="gold-button"
          >
            Book via WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
