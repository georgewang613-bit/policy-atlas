import {defineConfig,loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {opinionMiddleware} from './server/opinions.mjs';
export default defineConfig(({mode})=>{const env=loadEnv(mode,process.cwd(),'');return {base:'./',plugins:[react(),{name:'local-opinion-service',configureServer(server){server.middlewares.use(opinionMiddleware(env));},configurePreviewServer(server){server.middlewares.use(opinionMiddleware(env));}}],server:{host:'127.0.0.1',watch:{usePolling:true,interval:300}},preview:{host:'127.0.0.1'},build:{outDir:'docs'}};});
