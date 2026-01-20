import { treaty } from '@elysiajs/eden'
import type { App } from '../../../backend/src/index'

const backendUrl = import.meta.env.PROD 
  ? 'https://bun-elysia-crud-steel.vercel.app' 
  : 'http://localhost:3000'
// 👇 ใส่บรรทัดนี้ไว้ข้างบนตัวแปร api เพื่อปิด Error เฉพาะบรรทัดนี้
// @ts-ignore
export const api = treaty<App>(backendUrl, {
    fetch: {
        credentials: 'include' // สำคัญสำหรับการส่ง Cookie/Login
    }
})