#!/bin/bash

echo "Preprocessing environment variables"

# For each of the var in .env.production, replace with proper process env
while read line; do
  ENV_NAME=$(echo $line | cut -d "=" -f 1)
  STRING_TO_REPLACE=$(echo $line | cut -d "=" -f 2)

  eval "ACTUAL_ENV=\$$ENV_NAME"

  find /usr/share/nginx -type f -exec sed -i "s|$STRING_TO_REPLACE|$ACTUAL_ENV|g" {} \;
done < /var/www/.env.production

echo "Starting Nginx!"

# Run Nginx
nginx -g "daemon off;"
