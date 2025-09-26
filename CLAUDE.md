# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Starts Vite dev server on port 3000 (configured in vite.config.ts) and automatically opens browser.

**Build for production:**
```bash
npm run build
```
Creates production build in `build/` directory using Vite.

**Install dependencies:**
```bash
npm i
```

## Architecture Overview

This is a React + TypeScript mobile deep link testing application built with Vite. The app validates and tests deep links (URI schemes, universal links, and app links).

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6 with React SWC plugin
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Icons**: Lucide React

### Core Components
The main application flow centers around deep link validation and testing:

1. **App.tsx**: Root component with dark mode state management using localStorage
2. **LinkTester.tsx**: Main form component that handles link input and orchestrates validation/testing
3. **LinkValidator.tsx**: Validates link formats (URI schemes, universal links, app links) and displays status badges
4. **GeneratedLink.tsx**: Displays validated links and provides test functionality
5. **DebugInfo.tsx**: Shows debugging information with timestamps

### Design System
The project uses a comprehensive design system built on:
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Headless component primitives
- **Custom CSS Variables**: Defined in `src/styles/globals.css` for theming
- **Dark Mode**: Toggle implementation with system preference detection

### File Structure
- `src/components/ui/`: shadcn/ui components (button, card, input, etc.)
- `src/components/`: Application-specific components
- `src/styles/`: Global styles and Tailwind configuration
- `vite.config.ts`: Extensive alias configuration for all dependencies

### Key Features
- **Link Validation**: Supports URI schemes (`myapp://`), universal links (`https://`), and app links
- **Real-time Validation**: Live feedback as user types
- **Dark Mode**: Persistent theme switching with system preference detection
- **Korean Localization**: UI text and timestamp formatting in Korean
- **Mobile-First Design**: Responsive layout optimized for mobile testing

### Vite Configuration Notes
The `vite.config.ts` contains extensive package version aliases, suggesting this may be a bundle or distribution build. The development server runs on port 3000 with auto-open enabled.