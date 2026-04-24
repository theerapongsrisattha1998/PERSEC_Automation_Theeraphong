# BullVPN Automation Testing with Playwright

โปรเจกต์ทดสอบระบบ Login และ MyAccount ของ BullVPN ด้วย JavaScript + Playwright

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
2. กรอกข้อมูล `USER_NAME` และ `PASSWORD` และ `EMAIL` ในไฟล์ `.env` ให้เรียบร้อย

## วิธีการรันเทส
- รันเทสทั้งหมด:
  ```bash
  npx playwright test
  หรือ
  npm run test:prod
  ```
- รันเทสและดู Report:
  ```bash
  npx playwright show-report
  ```