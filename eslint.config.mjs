import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'src/admin/**',
      'src/auth/**',
      'src/config/**',
      'src/distribution/**',
      'src/prisma/**',
      'src/mail/**',
      'src/common/**',
      'src/discount/**',
      'src/order/**',
      'src/paystack/**',
      'src/products/**',
      'src/public/**',
      'src/shared/**',
      'src/user/**',
      'src/app.*.ts',
      'src/main.ts',
      'scripts/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
