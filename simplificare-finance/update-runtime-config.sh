#!/bin/sh

# Replace the placeholders in runtime-config.js with actual environment variables
echo "Updating runtime-config.js with environment variables..."

cat << EOF > /app/build/runtime-config.js
window.env = {
  REACT_APP_API_TOKEN: "$REACT_APP_API_TOKEN",
  REACT_APP_BASE_URL: "$REACT_APP_BASE_URL"
};
EOF
