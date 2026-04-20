# 📘 Product Requirements Document (PRD)
## Vidyakul — Website & Mobile App
**Version:** 1.0  
**Date:** April 2026  
**Author:** Tushar (Based on Vidyakul Platform Analysis)  
**Platform Scope:** Web (Next.js) + Mobile App (React Native / Flutter)

---

## 1. 🧭 Product Overview

### 1.1 Vision
Vidyakul is India's regional-language online education platform targeting Class 9–12 students and competitive exam aspirants (JEE, NEET, CUET, Defence, TET). Its core value proposition: **"Apni Bhasha Mein Padho"** — quality education delivered in Hindi and regional languages to Bharat (Tier 2–3 cities).

### 1.2 Mission
Deliver affordable, accessible, live + recorded learning to students who can't access expensive English-medium coaching.

### 1.3 Target Users
| User Type | Description |
|-----------|-------------|
| **Students** | Class 9–12 + entrance exam aspirants, Hindi/regional-language medium |
| **Teachers/Educators** | Subject matter experts who want to launch courses |
| **Parents** | Monitor child's progress |
| **Admin** | Platform operators managing content, payments, fraud |

### 1.4 Key Stats (Current)
- 506+ Courses & Videos
- 265+ Expert Teachers
- 6.5L+ Students
- 310+ Live Classes Completed

---

## 2. 🎯 Goals & Success Metrics

| Goal | KPI |
|------|-----|
| Increase student retention | DAU/MAU ratio ≥ 40% |
| Grow teacher supply | New teacher onboarding/month ≥ 20 |
| Monetization | Paid subscription conversion ≥ 8% of registered |
| App engagement | Avg session time ≥ 18 min/day |
| Content quality | Course completion rate ≥ 55% |

---

## 3. 🗂️ Feature Modules

---

### MODULE 1 — Authentication & Onboarding

#### 3.1.1 Auth Flow (Web + App)
- **OTP-based login** via Indian mobile number (+91)
- Social login: Google, Facebook, LinkedIn
- New user: Phone → OTP → Profile Setup (Name, Class, State, Language preference)
- Returning user: Phone → OTP → Dashboard

#### 3.1.2 Onboarding Flow (First-time user)
1. **Goal Selection** → "Main kya padhna chahta hoon?" (Class 9/10/11/12, JEE, NEET, CUET, Defence, TET)
2. **Subject Selection** → Based on goal
3. **Language Preference** → Hindi / English / Regional
4. **Free Trial Trigger** → Show 1 free live class immediately

#### 3.1.3 Requirements
- OTP expiry: 5 minutes
- Resend OTP cooldown: 30 seconds
- Remember device for 30 days
- Forgot password via OTP reset

---

### MODULE 2 — Home / Discovery

#### 3.2.1 Web Homepage Sections
| Section | Content |
|---------|---------|
| Hero Banner | Live class countdown, CTA "Start Learning" |
| Featured Batches | Curated Master Batches by class/exam |
| Free Live Classes | Next 3 upcoming live classes |
| Top Teachers | Teacher cards with ratings |
| Trending Notes | Top downloaded e-books this week |
| Testimonials | Student success stories |
| App Download Banner | Google Play CTA |

#### 3.2.2 App Home Screen
- Personalized feed based on enrolled courses
- "Today's Classes" widget (next live class countdown)
- Quick access: Continue Learning, Practice Test, My Notes
- Notification bell with badge

---

### MODULE 3 — Course Catalog

#### 3.3.1 Categories
- Classes (9, 10, 11, 12) — Science, Commerce, Arts
- Competitive Exams: JEE, NEET, CUET
- Job Prep, Defence (NDA, CDS), TET
- Graduate Courses

#### 3.3.2 Course Listing Page
- Filter by: Class, Subject, Language, Price (Free/Paid), Teacher, Rating
- Sort by: Popularity, Newest, Rating, Price
- Course Card: Thumbnail, Teacher Name, Rating, Student Count, Price/Free tag, Language badge

#### 3.3.3 Course Detail Page
| Section | Details |
|---------|---------|
| Header | Title, Teacher, Rating, Enrolled count |
| Preview | Intro video (first lesson free) |
| Curriculum | Chapter-wise accordion with video list |
| About Teacher | Photo, bio, rating, total students |
| What You'll Learn | Bullet points |
| Reviews | Student reviews with star ratings |
| Price + CTA | "Enroll Free" or "Buy Now" with Razorpay |

---

### MODULE 4 — Live Classes

#### 3.4.1 Live Class Features
- Scheduled live sessions (teacher broadcasts, students watch)
- In-class **chat/Q&A** panel (students can type doubts)
- Teacher can **pin questions**, do **polls**
- **Hand raise** feature — teacher picks student to ask verbally
- Live session **recording** auto-saved to course
- Max student count per batch (to maintain quality feel — show "Limited Seats")
- Class reminder notification: 30 min before, 5 min before

#### 3.4.2 Live Class States
| State | UI |
|-------|----|
| Upcoming | Countdown timer + "Set Reminder" button |
| Live Now | Red "LIVE" badge + Join button |
| Completed | "Watch Recording" button |
| Missed | "Catch Up" tag |

#### 3.4.3 Tech Stack Suggestion
- **Streaming:** Agora.io or LiveKit (WebRTC-based for low latency)
- **Chat:** Firebase Realtime DB or Supabase Realtime
- **Recording:** Store on Cloudflare R2 / AWS S3

---

### MODULE 5 — Recorded Courses / Video Player

#### 3.5.1 Video Player Features
- Custom player (not YouTube embed) — Vidyakul branded
- **Speed control:** 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- **Subtitles** (Hindi/English toggle)
- **Resume from last position** (progress saved per video)
- **Notes panel** alongside video (student can type personal notes per timestamp)
- **Download for offline** (App only, encrypted)
- Progress bar with chapter markers

#### 3.5.2 Course Progress Tracking
- Per-video completion (>80% watched = ✅)
- Chapter completion %
- Overall course completion % shown on dashboard

---

### MODULE 6 — Smart Notes / E-Books

#### 3.6.1 Notes System
- Teacher uploads: PDF, handwritten scan, PPT
- Student can: Download, Bookmark, Highlight (app)
- Notes tagged by: Subject, Class, Chapter, Language
- Search notes by keyword

#### 3.6.2 Student Personal Notes
- Text notes linked to video timestamp
- Export notes as PDF
- Sync across devices

---

### MODULE 7 — Practice Tests & Mock Tests

#### 3.7.1 Test Types
| Type | Description |
|------|-------------|
| Daily Quiz | 10 questions, chapter-wise, every day |
| Chapter Test | After completing a chapter |
| Mock Test | Full-length exam simulation (JEE/NEET pattern) |
| Custom Test | Student selects topics |

#### 3.7.2 Test Engine Features
- MCQ with 4 options
- Negative marking support (configurable per test)
- Timer (visible countdown)
- Review mode (mark for review, skip, comeback)
- **Submit & Analyze:** Score, correct/incorrect with explanation
- **Leaderboard** per test/batch

#### 3.7.3 Performance Analytics (Student)
- Subject-wise accuracy %
- Weak chapters identified
- Time spent per question (heatmap)
- Score trend over time (line graph)

---

### MODULE 8 — Student Dashboard

#### 3.8.1 Dashboard Sections
| Section | Content |
|---------|---------|
| My Learning | Enrolled courses with progress bars |
| Upcoming | Next live class with countdown |
| Streak | Daily login streak (gamification) |
| Achievements | Badges unlocked |
| Performance | Recent test scores, weak areas |
| Saved Notes | Bookmarked e-books |
| Notifications | Unread notifications center |

#### 3.8.2 Gamification Elements
- **Daily Streak** (fire emoji 🔥) — login every day
- **XP Points** for: watching video, completing test, attending live class
- **Badges:** "First 10 Videos", "Live Class Pro", "Quiz Champion", etc.
- **Weekly Leaderboard** within batch/class

---

### MODULE 9 — Teacher Portal

#### 3.9.1 Teacher Onboarding (via "Launch Your Course" CTA)
1. Apply to teach (Name, Subject, Demo video link, Qualification)
2. Admin review & approval
3. Teacher profile setup (photo, bio, social links)
4. Bank account KYC for payouts

#### 3.9.2 Teacher Dashboard
| Feature | Details |
|---------|---------|
| Course Builder | Create course → Add sections → Upload videos |
| Live Class Scheduler | Set date/time, set student limit, send notifications |
| Student Analytics | Who enrolled, who completed, who dropped off |
| Revenue Dashboard | Monthly earnings, payout schedule |
| Q&A Management | Answer student doubts from course page |
| Notes Upload | Upload PDFs per chapter |

#### 3.9.3 Revenue Model for Teachers
- Vidyakul takes 30% platform fee
- Teacher gets 70% of paid course revenue
- Free courses: No earnings (teacher builds audience)
- Bonus: Top-rated teachers get "Vidyakul Verified" badge

---

### MODULE 10 — Subscription & Payments

#### 3.10.1 Pricing Tiers
| Plan | Price | Features |
|------|-------|---------|
| **Free** | ₹0 | Limited live classes, limited notes, ads |
| **Monthly** | ₹199/month | All courses in 1 class, unlimited tests |
| **Annual** | ₹999/year | All classes + exams, no ads, offline download |
| **Combo** | ₹1499/year | All classes + all competitive exams |

#### 3.10.2 Payment Features
- **Razorpay** integration (UPI, Cards, Net Banking, EMI)
- Auto-renewal with cancel anytime
- Payment failure retry flow
- Receipt email via Resend
- Referral code discount system

---

### MODULE 11 — Notifications System

#### 3.11.1 Notification Types
| Trigger | Message |
|---------|---------|
| Live class starting soon | "Aaj 4 PM baje Physics live class hai! 🔔" |
| New content in enrolled course | "New chapter added in your course" |
| Test reminder | "Aaj ka quiz abhi tak nahi diya!" |
| Streak at risk | "Kal login karna mat bhoolna! 🔥" |
| Offer/Sale | "Annual plan par 40% OFF — aaj hi lelo!" |

#### 3.11.2 Channels
- **Push Notifications** (App — FCM)
- **WhatsApp** (Opt-in, business API)
- **SMS** (OTP + critical only, Twilio/MSG91)
- **Email** (Resend for receipts, welcome email)
- **In-app Notification Center**

---

### MODULE 12 — Search

- Global search: Courses, Teachers, Notes, Topics
- Autocomplete with popular searches
- Filter results by type (Course / Note / Teacher / Test)
- "Did you mean?" spell correction for Hinglish queries

---

### MODULE 13 — Admin Panel

#### 3.13.1 Admin Features
| Module | Actions |
|--------|---------|
| User Management | View, ban, verify students & teachers |
| Content Moderation | Approve/reject teacher courses |
| Revenue Reports | MRR, ARR, churn rate, cohort analysis |
| Promo Codes | Create & track discount coupons |
| Push Notifications | Send broadcast to all/segment |
| Support Tickets | View & resolve student issues |

---

## 4. 📱 Mobile App — Platform-Specific Requirements

### 4.1 Android App
- Min Android version: 8.0 (Oreo)
- Offline download (encrypted using ExoPlayer / DRM)
- Background audio playback for lectures
- Picture-in-Picture (PiP) for video while multitasking
- Gesture navigation support
- Widget: "Today's Class Countdown" on home screen

### 4.2 iOS App (Future Phase)
- iOS 14+
- Same core features
- AirPlay support for casting to Apple TV

### 4.3 App Performance Requirements
| Metric | Target |
|--------|--------|
| App launch time (cold start) | < 2.5 seconds |
| Video start time | < 3 seconds on 4G |
| Offline video quality | 360p / 480p / 720p options |
| Crash-free rate | > 99.5% |

---

## 5. 🏗️ Technical Architecture

### 5.1 Web (Recommended Stack)
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth | Custom OTP (MSG91) + NextAuth |
| Database | PostgreSQL via Supabase |
| Storage | Cloudflare R2 (videos, notes) |
| Payments | Razorpay |
| Email | Resend |
| Live Streaming | Agora.io |
| CDN | Cloudflare |
| Hosting | Vercel (Web) |

### 5.2 Mobile App Stack
| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo) or Flutter |
| State Management | Redux Toolkit / Zustand |
| Video Player | ExoPlayer (Android) / AVPlayer (iOS) |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Offline Storage | SQLite + Encrypted FS |
| Analytics | Mixpanel / Amplitude |

### 5.3 API Design
- REST API (Next.js API routes) for web
- Shared API endpoints for mobile app
- Rate limiting: 100 req/min per user
- JWT tokens (15 min expiry) + Refresh tokens (30 days)

---

## 6. 🚀 Phased Roadmap

### Phase 1 — Foundation (Month 1–2)
- [x] Auth (OTP login + social)
- [x] Course listing + detail pages
- [x] Video player (recorded courses)
- [x] Basic student dashboard
- [x] Razorpay payments
- [x] E-book downloads (PDF)

### Phase 2 — Engagement (Month 3–4)
- [ ] Live class module (Agora integration)
- [ ] Practice tests + quiz engine
- [ ] Gamification (streak, XP, badges)
- [ ] Teacher portal (course builder)
- [ ] Push notifications (FCM)
- [ ] Search with filters

### Phase 3 — Scale (Month 5–6)
- [ ] WhatsApp notifications (opt-in)
- [ ] Offline video downloads (app)
- [ ] Performance analytics dashboard
- [ ] Admin panel
- [ ] Referral program
- [ ] iOS app

### Phase 4 — SaaS Expansion (Month 7+)
- [ ] Multi-institute support (white-label for coaching centers)
- [ ] Custom domain per institute
- [ ] B2B pricing model

---

## 7. 🔒 Non-Functional Requirements

| Requirement | Spec |
|------------|------|
| **Uptime** | 99.9% SLA |
| **Security** | HTTPS, OTP-based auth, encrypted video DRM |
| **GDPR/IT Act** | Indian IT Act 2000 compliant, privacy policy |
| **Scalability** | Handle 50,000 concurrent live class viewers |
| **Accessibility** | Hindi UI text, large font support |
| **Data Backup** | Daily automated backups |

---

## 8. 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#6C3CE1` | Buttons, CTAs |
| Secondary | `#FF6B35` | Badges, highlights |
| Success | `#22C55E` | Completion states |
| Background | `#F8F9FF` | Page background |
| Text Primary | `#1A1A2E` | Headings |
| Text Secondary | `#64748B` | Subtext |

### Typography
- Display: Baloo 2 (Hindi-compatible)
- Body: Noto Sans (multilingual support)
- Monospace: JetBrains Mono (for scores/numbers)

### Component Library
- Buttons: Primary, Secondary, Ghost, Danger
- Cards: Course Card, Teacher Card, Test Card
- Modals: Auth, Payment, Confirmation
- Toast notifications: Success, Error, Info

---

## 9. 📊 Analytics & Tracking

### Student Events to Track
- Course enrolled
- Video started / completed
- Live class joined / left
- Test started / submitted
- Note downloaded
- Subscription purchased
- App opened (session start)

### Teacher Events
- Course published
- Live class started
- Revenue earned

### Tool: Mixpanel or PostHog (self-hosted)

---

## 10. 🔧 Integrations

| Service | Purpose |
|---------|---------|
| MSG91 | OTP SMS delivery |
| Razorpay | Payments |
| Agora.io | Live streaming |
| Firebase FCM | Push notifications |
| Resend | Transactional emails |
| Cloudflare R2 | Video/Note storage |
| WhatsApp Business API | Notifications (opt-in) |
| Google Analytics 4 | Web traffic analytics |

---

## 11. ❓ Open Questions / Future Considerations

1. **AI Doubt Solver** — Chatbot for instant doubt resolution (GPT-4 based, Hindi)
2. **AI-Generated Notes** — Auto-summarize video lectures into notes
3. **Vernacular Language Expansion** — Tamil, Telugu, Marathi, Bengali
4. **Offline-First App** — Full offline mode for rural areas with poor connectivity
5. **Parent Dashboard** — Separate view for parents to track child's progress
6. **Career Counseling** — Post-12th guidance module

---

*PRD prepared by Tushar | Based on Vidyakul.com platform analysis | April 2026*
