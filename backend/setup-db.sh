#!/bin/bash

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "Creating database schema..."
npx prisma db push

# Create a seed script if needed
# echo "Seeding database..."
# npx prisma db seed

echo "Database setup complete!"