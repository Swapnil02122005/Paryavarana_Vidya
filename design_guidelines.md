# Design Guidelines: Paryāvaraṇa Vidyā - Gamified Environmental Education Platform

## Design Approach

**Selected Approach: Material Design with Nature-Inspired Custom Elements**

This educational platform combines Material Design's proven usability patterns with custom gamification components. Material Design provides the structure and accessibility for educational content, while nature-inspired visual elements create emotional engagement around environmental themes.

**Key Design Principles:**
- **Clarity First**: Information hierarchy ensures students quickly understand lessons, challenges, and progress
- **Nature Connection**: Visual language reflects environmental themes through organic shapes, natural imagery, and earth-inspired colors
- **Motivational Design**: Gamification elements (badges, points, levels) are celebratory and encouraging, not competitive-aggressive
- **Accessibility**: High contrast, readable typography, and responsive layouts ensure usability across devices and network conditions

## Color Palette

**Primary Colors (Light Mode):**
- Primary Green: 142 65% 45% (forest green for trust and growth)
- Secondary Earth: 32 45% 55% (warm terracotta for grounding)
- Success/Achievement: 120 60% 50% (bright green for completed tasks)

**Primary Colors (Dark Mode):**
- Primary Green: 142 50% 55% (lighter forest green)
- Secondary Earth: 32 40% 45% (muted terracotta)
- Success/Achievement: 120 50% 45% (muted bright green)

**Accent Colors:**
- Sky Blue: 200 70% 60% (for water-related content, used sparingly)
- Warning/Energy: 38 90% 60% (for energy challenges, minimal use)

**Neutral Palette:**
- Light mode backgrounds: whites and soft grays (210 15% 98%, 210 10% 95%)
- Dark mode backgrounds: deep charcoals (220 15% 12%, 220 12% 16%)
- Text: High contrast - near-black on light, near-white on dark

## Typography

**Font Families:**
- Primary: Inter (via Google Fonts) - clean, modern, excellent readability for UI and educational content
- Display/Headers: Poppins (via Google Fonts) - friendly, approachable for gamification elements and hero sections

**Type Scale:**
- Hero/Display: text-5xl to text-6xl (Poppins, font-bold)
- Section Headers: text-3xl to text-4xl (Poppins, font-semibold)
- Card Titles: text-xl to text-2xl (Inter, font-semibold)
- Body Text: text-base to text-lg (Inter, font-normal)
- Captions/Meta: text-sm (Inter, font-medium)

## Layout System

**Spacing Units (Tailwind):**
Core spacing set: **2, 4, 6, 8, 12, 16, 20** for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-20 (mobile), py-16 to py-32 (desktop)
- Card gaps: gap-4 to gap-6
- Element margins: m-2, m-4, m-8

**Container Strategy:**
- Max-width containers: max-w-7xl for main content
- Dashboard grids: max-w-6xl
- Reading content: max-w-4xl
- Full-width for hero and data visualizations

## Component Library

**Navigation:**
- Sticky header with glass-morphism effect (backdrop-blur-lg, bg-white/90 in light mode)
- Student/Teacher role-based navigation with clear visual distinction
- Mobile: Hamburger menu with slide-in drawer
- Quick-access eco-points counter in header

**Hero Section:**
- Large hero image: Vibrant nature photography (Indian ecosystems - forests, rivers, mountains)
- Overlay with gradient: from transparent to primary green/dark overlay for text readability
- Hero headline: Poppins, text-5xl, with mission-driven messaging
- Primary CTA button: Solid primary green with white text
- Secondary stats banner: Transparent cards showing platform impact (students engaged, trees planted, etc.)

**Dashboard Cards:**
- Elevated cards with subtle shadows (shadow-md, hover:shadow-lg transitions)
- Progress indicators: Circular progress rings for completion, linear bars for points
- Badge display: Grid layout with animated reveals on achievement
- Challenge cards: Image thumbnail + title + difficulty indicator + eco-points value

**Gamification Elements:**
- Badges: Colorful circular icons with nature themes (leaf, tree, water drop, sun)
- Level indicators: Progress bars with milestone markers
- Leaderboard: Alternating row colors, profile avatars, animated rank changes
- Eco-points counter: Large, prominent with subtle pulse animation on update

**Forms & Inputs:**
- Material-style inputs with floating labels
- Dark mode: Dark backgrounds (bg-gray-800) with lighter borders
- File upload for challenge proof: Drag-drop zone with preview
- Quiz components: Card-based with immediate visual feedback

**Data Visualization:**
- Environmental impact charts: Line and bar charts with green gradients
- School comparison: Horizontal bar charts with school logos
- Personal stats: Radial progress charts for different eco-categories

**Interactive Elements:**
- Lesson modules: Expandable accordions with smooth transitions
- Challenge tracking: Stepper component showing multi-step completion
- AR/VR preview cards: Video thumbnails with play overlay icons

## Images

**Hero Image (Landing Page):**
Large, vibrant photograph of diverse Indian students in nature (outdoor learning, tree planting, or examining plants). Full-width, 70vh height on desktop. Image should convey youth empowerment and environmental connection.

**Dashboard Images:**
- Challenge cards: Thumbnail images for each eco-task (waste sorting, planting, energy audit)
- Badge backgrounds: Subtle nature patterns (leaves, water ripples)
- Achievement celebrations: Confetti or nature-particle animations overlay

**Content Images:**
- Lesson modules: Infographic-style illustrations of environmental concepts
- Regional content: Local ecosystem photos specific to Indian states
- Teacher dashboard: Student activity preview thumbnails

## Visual Effects & Animations

**Use Sparingly:**
- Badge unlock: Scale-up with gentle bounce (scale-0 to scale-100)
- Points increment: Number count-up animation with subtle glow
- Card hover: Gentle lift (translateY(-2px)) with shadow increase
- Loading states: Eco-themed skeleton loaders (leaf shapes, wave patterns)

**Avoid:** Distracting scroll animations, auto-playing videos, excessive parallax

## Accessibility & Responsive Design

- Touch targets: Minimum 44x44px on mobile
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Dark mode: Consistent implementation across all inputs, cards, and forms
- Mobile-first: Stack multi-column layouts to single column below md breakpoint
- Offline indicators: Clear visual state when content cached for low-bandwidth use