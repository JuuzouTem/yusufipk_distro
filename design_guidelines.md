# DistroMatch Design Guidelines

## Design Philosophy
Create a premium, desktop-first "Tinder for Linux Distros" experience that feels cinematic and playful. Reject traditional survey-based tools in favor of visceral, swipe-based discovery using landscape desktop screenshots.

## Layout System

**Core Structure:**
- Single-page application with centered card stack as focal point
- Cards positioned in absolute center of viewport
- Use Tailwind spacing: p-4, p-6, p-8 for consistent padding
- Container max-width: 1200px for card stack area

**Card Dimensions:**
- Landscape orientation (16:9 aspect ratio) - NEVER vertical/portrait
- Recommended size: 900px width × 506px height (or proportional)
- Card stack: 3-5 cards visible with z-index layering
- Cards behind should be slightly offset and scaled down (scale-95)

## Component Architecture

**1. Card Stack System:**
- Top card: Full size, draggable, z-index highest
- Second card: scale-95, slight vertical offset (8px down)
- Third+ cards: scale-90, progressive offsets
- Empty state when deck is finished

**2. Card Component Structure:**
```
Card Container (rounded-2xl, shadow-2xl)
├── Screenshot Area (16:9, covers top 75% of card)
│   └── High-quality Linux desktop screenshot
└── Info Bar (bottom 25%, elegant dark overlay)
    ├── Witty Title (text-xl, font-bold)
    ├── Distro Name (text-sm, muted)
    └── Optional: Quick stats or tags
```

**3. Info Bar Design:**
- Semi-transparent dark background (bg-black/80 backdrop-blur-md)
- Padding: px-8 py-6
- Text must never overlap screenshot
- Rounded bottom corners matching card (rounded-b-2xl)

## Typography

**Fonts via Google Fonts:**
- Primary: Inter (headings, UI elements) - weights 400, 600, 700
- Secondary: Space Grotesk (witty card titles) - weights 500, 700

**Hierarchy:**
- Card titles: text-2xl font-bold (witty personality descriptions)
- Distro names: text-lg font-semibold
- UI labels: text-sm font-medium
- Metadata: text-xs text-gray-400

## Interaction Design

**Swipe Mechanics:**
- Drag threshold: 150px horizontal movement to trigger decision
- Swipe right (>150px) = LIKE
- Swipe left (<-150px) = DISLIKE
- Visual feedback: Rotate card based on drag distance (max ±15deg)
- On release: Physics-based throw animation if threshold met

**Animation Requirements (Framer Motion):**
- Front card drag: Follow cursor with spring physics
- Background card: Scale from 95 to 100 as front card moves
- Throw animation: Smooth exit with rotation matching swipe direction
- New card entrance: Fade in and scale up from 90 to 100
- Background gradient: Smooth color transition (300ms ease)

**Button Controls:**
- Bottom center: Two action buttons (Dislike/Like)
- Style: Large rounded buttons (w-16 h-16 rounded-full)
- Icons: X (dislike), Heart (like) from Lucide-React
- Hover states: Subtle scale-110 and shadow increase

## Background Treatment

**Dynamic Gradient:**
- Full viewport background
- Blur effect: backdrop-blur-3xl
- Color extraction: Sample dominant colors from current card screenshot
- Create radial gradient with extracted colors at 30% opacity
- Transition smoothly between cards (animate gradient-shift)
- Fallback: Subtle purple-to-blue gradient

## Data Structure

**Card Data Model:**
```
interface DistroCard {
  id: string
  distroName: string
  screenshot: string (URL or path)
  wittyTitle: string (e.g., "Terminal is life", "Mac envy approved")
  desktopEnvironment: string
  tags: string[]
  colorPalette?: string[] (for background gradient)
}
```

**Sample Witty Titles:**
- "Terminalden çıkmam" (Never leaves terminal)
- "Mac gibi olsun" (Make it Mac-like)
- "Sadece çalışsın yeter" (Just make it work)
- "Özelleştirme canavarı" (Customization beast)

## Images

**Screenshot Requirements:**
- High-resolution desktop screenshots (1920×1080 minimum)
- Various Linux distributions and desktop environments
- Clean, representative workspace examples
- Showcase different aesthetics (minimal, maximal, professional, gaming)
- 15-20 diverse examples covering: GNOME, KDE, i3, XFCE, Cinnamon, etc.

**Placement:**
- Each card features one full-bleed screenshot covering 75% of card height
- Aspect ratio strictly maintained at 16:9
- No hero section - app focuses entirely on card interaction

## Responsive Considerations

**Desktop-First (Primary):**
- Optimized for 1440px+ displays
- Cards remain landscape and centered
- Maximum engagement with large viewport

**Tablet (1024px):**
- Slightly smaller cards (700px width)
- Maintain landscape orientation
- Buttons remain accessible

**Mobile (768px and below):**
- Cards scale down but NEVER become vertical
- May need horizontal scrolling or reduced card size
- Swipe gestures remain primary interaction

## Special States

**Loading State:**
- Skeleton cards with shimmer effect
- Maintain card stack layout

**End of Deck:**
- "Recommendations ready!" message
- Reset or view results buttons
- Celebratory micro-animation

**Swipe Indicators:**
- Subtle overlay on card during drag showing LIKE (green) or NOPE (red)
- Opacity increases with drag distance
- Icon appears in drag direction

## Modular Architecture

**File Structure:**
- `/components/CardStack.tsx` - Main card container
- `/components/SwipeCard.tsx` - Individual draggable card
- `/components/ActionButtons.tsx` - Like/Dislike controls
- `/data/distros.ts` - Card data array
- `/utils/colorExtractor.ts` - Background gradient logic
- `/hooks/useSwipe.ts` - Swipe gesture management