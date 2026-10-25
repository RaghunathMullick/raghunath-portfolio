import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]

// GitHub Actions supplies GITHUB_REPOSITORY as "owner/repository". Local builds
// remain rooted at '/', while project Pages builds receive '/repository/'.
export default defineConfig({
  base: repository ? `/${repository}/` : '/',
  plugins: [react()],
})
