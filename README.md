# BullVPN Automation Testing with Playwright

โปรเจกต์ทดสอบระบบเบื้องต้นของเว็บ BullVPN ด้วย JavaScript + Playwright

## วิธีการติดตั้ง
1. ติดตั้ง Library ทั้งหมด:
   ```bash
   npm install
   ```
2. ติดตั้ง Playwright Browsers:
   ```bash
   npx playwright install
   ```

## การตั้งค่าก่อนรัน
1. คัดลอกไฟล์ `.env.example` และเปลี่ยนชื่อเป็น `.env.prod`
2. กรอกข้อมูลส่วนตัวในไฟล์ `.env.prod`:
   - `USER_NAME`: ชื่อผู้ใช้งาน
   - `PASSWORD`: รหัสผ่าน
   - `EMAIL`: อีเมลที่ลงทะเบียน

## วิธีการรันเทส
- **รันเทสทั้งหมด (Default):**
  ```bash
  npx playwright test
  ```
- **รันเทสผ่านสคริปต์ Production:**
  ```bash
  npm run test:prod
  ```
- **รันเทสแบบเปิด UI (สำหรับ Debug):**
  ```bash
  npx playwright test --ui
  ```
- **ดูผลการรันล่าสุด (HTML Report):**
  ```bash
  npx playwright show-report
  ```

## จุดเด่นของโปรเจกต์
- **Page Object Model (POM):** แยก Logic หน้าเว็บออกจากไฟล์เทสเพื่อให้ดูแลง่าย
- **Constants Management:** เก็บ Path และ Message ต่างๆ ไว้ในศูนย์กลาง (`utils/constants.js`)
- **Environment Support:** รองรับการจัดการข้อมูลผ่านไฟล์ `.env` (ที่ทำไว้ให้จะเป็น .env.prod เพราะตัวระบบเป็น Production)

## CI/CD (GitHub Actions)
โปรเจกต์นี้มีการตั้งค่า Workflow สำหรับรันเทสอัตโนมัติผ่าน GitHub Actions:
- **Trigger:** รันทุกครั้งที่มีการ `push` หรือ `pull_request` ไปยัง Branch `main`
- **Actions:** ระบบจะติดตั้ง Browser และรันเทสทั้งหมดให้โดยอัตโนมัติ
- **Report:** หลังรันเสร็จ สามารถดูสรุปผลการเทสได้ในหัวข้อ "Actions" บน GitHub