# zonr.dev - Time Zone Syncer

A modern, elegant web application that helps you share and synchronize time across different time zones. Built with Next.js 15, React 19, and TypeScript.

## Features

- 🌍 **Universal Time Sharing**: Create shareable links that automatically convert times to the recipient's local timezone
- 🎯 **Precise Time Selection**: Interactive date-time picker with hour, minute, second, and AM/PM selection
- 🌐 **Comprehensive Time Zone Support**: Access to all major time zones, organized by region
- 🎨 **Modern UI**: Beautiful, responsive design using Shadcn UI and Tailwind CSS
- 🌓 **Dark Mode Support**: Seamless light/dark mode switching
- ✨ **Interactive Feedback**: Delightful confetti animation when copying links

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**:
  - Shadcn UI
  - Radix UI Primitives
  - Tailwind CSS
- **Date/Time Libraries**:
  - Luxon
  - date-fns
  - date-fns-tz
  - @vvo/tzdb
- **Validation**: Zod
- **Development**:
  - ESLint
  - Prettier
  - TypeScript
  - Turbopack

## Getting Started

### Prerequisites

- Node.js 22.0.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sevadus/zonr.git
cd zonr
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Select your desired date and time using the interactive picker
2. Choose the appropriate timezone
3. Copy the generated shareable link
4. Share the link with others - they'll see the time converted to their local timezone!

## Development

### Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm build:pages` - Build for Cloudflare Pages

### Project Structure

```
zonr/
├── src/
│   ├── app/                 # Next.js app router files
│   │   ├── features/       # Feature-specific components
│   │   └── ui/            # Reusable UI components
│   └── lib/               # Utility functions and helpers
├── public/                # Static assets
└── [config files]         # Configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT license.

## Author

Made with ❤️ by [Sevadus](https://twitch.tv/sevadus)
