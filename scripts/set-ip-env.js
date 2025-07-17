// scripts/set-local-ip.js

const fs = require('fs');
const path = require('path');
const internalIp = require('internal-ip');

const ip = internalIp.v4.sync();
const port = 3001;
const envPath = path.resolve(__dirname, '../.env');

const envContent = `EXPO_PUBLIC_API_URL=http://${ip}:${port}\n`;

fs.writeFileSync(envPath, envContent);
console.log(`✅ .env mis à jour avec IP locale : http://${ip}:${port}`);
