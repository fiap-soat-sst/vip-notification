import { defineConfig } from 'vite';


export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
        poolOptions: {
            threads: {
                maxThreads: 1,
            },
        },
    },
})