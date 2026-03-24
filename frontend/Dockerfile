FROM node:18-alpine AS build
WORKDIR /app

# Baked into the JS bundle at build time (must match production Supabase project)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

COPY package*.json ./
RUN npm ci

COPY index.html ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY src ./src

RUN if [ -z "$VITE_SUPABASE_URL" ]; then \
      echo "ERROR: VITE_SUPABASE_URL is empty. Set it in .env next to docker-compose.yml (see .env.example)." >&2; \
      exit 1; \
    fi; \
    if [ -z "$VITE_SUPABASE_PUBLISHABLE_KEY" ] && [ -z "$VITE_SUPABASE_ANON_KEY" ]; then \
      echo "ERROR: Set VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY in that same .env." >&2; \
      exit 1; \
    fi

RUN npm run build

# The built files live at /app/dist — we copy them out via docker compose
