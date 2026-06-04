#!/bin/bash

# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
