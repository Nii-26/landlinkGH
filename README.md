# LandLinkGH

LandLinkGH is a mobile-first, full-screen web mapping application for viewing parcel and land-related geospatial data in an interactive interface.

## Overview

This project combines a modern React + Vite frontend with map rendering capabilities to provide a lightweight land information viewer. It is optimized for usability on both desktop and mobile devices.

## Architecture

The application architecture is intentionally modular and **designed to scale to other regions** beyond the current dataset and deployment context.

- **UI Layer (React):** Reusable components for map controls and data interaction.
- **Mapping/Data Layer:** Integrates parcel geo-data and map services for spatial display.
- **Styling Layer (CSS):** Mobile-first responsive design for consistent experiences across screen sizes.
- **Build/Dev Layer (Vite):** Fast local development and production bundling.

This separation of concerns makes it easier to plug in additional regional datasets, region-specific map services, and localized workflows without reworking the entire application.

## Tech Stack

- **HTML** (primary markup)
- **JavaScript (React)**
- **CSS**
- **Vite**
- **esri-loader**

## Repository Structure

- `index.html` — app entry HTML shell
- `src/main.jsx` — React bootstrap entry
- `src/App.jsx` — primary app component
- `src/components/` — reusable UI/map components
- `src/styles.css` — global styles
- `parcels.geojson` — sample parcel geospatial data
- `vite.config.js` — Vite configuration

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

The repository is configured for static-site style deployment and can be hosted on platforms such as GitHub Pages (already enabled in repository settings) or other static hosting providers.

## Scaling to New Regions

To adapt LandLinkGH for new regions:

1. Replace or add regional GeoJSON/data sources.
2. Update map service endpoints/configuration for the target region.
3. Add region-specific UI options (filters, layers, naming).
4. Maintain shared core components while introducing region modules where needed.

Because the architecture separates data, map integration, and UI concerns, onboarding new regions can be done incrementally with minimal disruption.

## License

No license is currently specified in this repository. Add a `LICENSE` file if you want to define reuse terms.
