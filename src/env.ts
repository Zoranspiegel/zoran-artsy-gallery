import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    ARTSY_CLIENT_ID: z.string().min(1),
    ARTSY_CLIENT_SECRET: z.string().min(1),
    MONGODB_URI: z.string().min(1)
  },
  client: {},
  experimental__runtimeEnv: {}
});

export default env;
