# API Documentation - Online Election Project

**Base URL:** `http://localhost:3000`

**Production URL:** `https://online-election-project.onrender.com/`

---

## 📋 Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Vote APIs](#vote-apis)
3. [Party APIs](#party-apis)
4. [Constituency APIs](#constituency-apis)

---

## 🔐 Authentication APIs

Base Path: `/auth`

### 1. ลงทะเบียนผู้ใช้งาน (Register)

**Endpoint:** `POST /auth/register`

**Description:** ลงทะเบียนผู้ใช้งานใหม่เข้าสู่ระบบ

**Authentication:** ไม่ต้องการ

**Request Body:**
```json
{
  "nationalId": "string",           // เลขบัตรประชาชน 13 หัก (required)
  "firstname": "string",            // ชื่อจริง (required)
  "lastname": "string",             // นามสกุล (required)
  "address": "string",              // ที่อยู่ (required)
  "province": "string",             // จังหวัด (required)
  "district": "string",             // อำเภอ (required)
  "subdistrict": "string",          // ตำบล (required)
  "consituencyId": "number",        // ID เขตเลือกตั้ง (required)
  "password": "string",             // รหัสผ่าน (required)
  "confirmPassword": "string"       // ยืนยันรหัสผ่าน (required)
}
```

**Response:**

Success (201):
```json
{
  "status": "success",
  "message": "User registered successfully",
  "userId": 1
}
```

Error (400 - เลขบัตรซ้ำ):
```json
{
  "status": "error",
  "message": "เลขบัตรประชาชนนี้ถูกใช้งานแล้วจ้า"
}
```

Error (500):
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

### 2. เข้าสู่ระบบ (Login)

**Endpoint:** `POST /auth/login`

**Description:** เข้าสู่ระบบด้วยเลขบัตรประชาชนและรหัสผ่าน

**Authentication:** ไม่ต้องการ

**Request Body:**
```json
{
  "nationalId": "string",    // เลขบัตรประชาชน 13 หลัก (required)
  "password": "string"       // รหัสผ่าน (required)
}
```

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nationalId": "1234567890123",
    "firstname": "สมชาย",
    "lastname": "ใจดี",
    "consituencypercent": "กรุงเทพมหานคร",
    "consituencynumber": 1,
    "rolename": ["ROLE_VOTER"],
    "currentRole": "ROLE_VOTER"
  }
}
```

Error (400):
```json
{
  "status": "error",
  "message": "กรุณากรอกบัตรประชาชน"
}
```

Error (404):
```json
{
  "status": "error",
  "message": "ไม่พบผู้ใช้งานนี้ในระบบ"
}
```

Error (401):
```json
{
  "status": "error",
  "message": "รหัสผ่านไม่ถูกต้อง"
}
```

---

### 3. ดูข้อมูลโปรไฟล์ (Get Profile)

**Endpoint:** `GET /auth/profile`

**Description:** ดึงข้อมูลโปรไฟล์ของผู้ใช้ที่ล็อกอินอยู่

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**

Success (200):
```json
{
  "status": "success",
  "user": {
    "id": 1,
    "nationalId": "1234567890123",
    "firstname": "สมชาย",
    "lastname": "ใจดี",
    "consituencypercent": "กรุงเทพมหานคร",
    "consituencynumber": 1,
    "rolename": ["ROLE_VOTER", "ROLE_ADMIN"],
    "currentRole": "ROLE_VOTER"
  }
}
```

Error (401):
```json
{
  "message": "You are not logged in! Please log in to get access"
}
```

---

### 4. สลับบทบาท (Switch Role)

**Endpoint:** `POST /auth/switch-role`

**Description:** สลับบทบาทระหว่าง ROLE_VOTER, ROLE_ADMIN, ROLE_ECT

**Authentication:** Required (Bearer Token + Admin/ECT Role)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "newRole": "string"    // "ROLE_VOTER" | "ROLE_ADMIN" | "ROLE_ECT" (required)
}
```

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "สลับบทบาทเป็น ROLE_ADMIN สำเร็จ",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Error (403):
```json
{
  "message": "You are not authorized to perform this action"
}
```

---

### 5. ดึงรายชื่อผู้ใช้ทั้งหมด (Get All Users)

**Endpoint:** `GET /auth/users`

**Description:** ดึงรายชื่อผู้ใช้ทั้งหมดในระบบ พร้อมบทบาทของแต่ละคน (เฉพาะ Admin)

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin role)

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nationalId": "1234567890123",
      "firstname": "สมชาย",
      "lastname": "ใจดี",
      "role": [
        {
          "id": 1,
          "roleName": "ROLE_VOTER"
        },
        {
          "id": 2,
          "roleName": "ROLE_ADMIN"
        }
      ]
    },
    {
      "id": 3,
      "nationalId": "3333333333333",
      "firstname": "กรรฑกา",
      "lastname": "เพื่อธรรม",
      "role": [
        {
          "id": 3,
          "roleName": "ROLE_ECT"
        },
        {
          "id": 4,
          "roleName": "ROLE_VOTER"
        }
      ]
    }
  ]
}
```

---

### 6. เพิ่มบทบาทให้ผู้ใช้ (Add Role)

**Endpoint:** `POST /auth/add-role`

**Description:** เพิ่มบทบาทให้กับผู้ใช้ (เฉพาะ Admin)

**Authentication:** Required (Bearer Token + Admin Role)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "userid": "number",        // ID ของผู้ใช้ (required)
  "roleName": "string"       // "ROLE_VOTER" | "ROLE_ADMIN" | "ROLE_ECT" (required)
}
```

**Response:**

Success (201):
```json
{
  "status": "success",
  "message": "เพิ่มบทบาทผู้ใช้สำเร็จ",
  "data": {
    "id": 5,
    "usersId": 1,
    "roleName": "ROLE_ADMIN"
  }
}
```

Error (403):
```json
{
  "message": "You are not authorized to perform this action"
}
```

---

### 7. ลบบทบาทผู้ใช้ (Delete Role)

**Endpoint:** `DELETE /auth/delete-role`

**Description:** ลบบทบาทของผู้ใช้ (เฉพาะ Admin)

**Authentication:** Required (Bearer Token + Admin Role)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "userid": "number",        // ID ของผู้ใช้ (required)
  "roleName": "string"       // "ROLE_VOTER" | "ROLE_ADMIN" | "ROLE_ECT" (required)
}
```

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "ลบบทบาทผู้ใช้สำเร็จ",
  "data": {
    "count": 1
  }
}
```

---

### 8. ดึงรายชื่อจังหวัดทั้งหมด (Get Provinces)

**Endpoint:** `GET /auth/provinces`

**Description:** ดึงรายชื่อจังหวัดทั้งหมดในระบบ

**Authentication:** ไม่ต้องการ

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": [
    "กรุงเทพมหานคร",
    "เชียงใหม่"
  ]
}
```

---

### 9. ดึงรายชื่ออำเภอตามจังหวัด (Get Districts)

**Endpoint:** `GET /auth/districts/:province`

**Description:** ดึงรายชื่ออำเภอทั้งหมดในจังหวัดที่ระบุ

**Authentication:** ไม่ต้องการ

**Path Parameters:**
- `province` (string) - ชื่อจังหวัด

**Example:** `GET /auth/districts/กรุงเทพมหานคร`

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": [
    {
      "district": "บางรัก"
    },
    {
      "district": "คลองเตย"
    }
  ]
}
```

---

### 10. ดึงรายชื่อตำบลตามอำเภอ (Get Subdistricts)

**Endpoint:** `GET /auth/subdistricts/:district?province=xxx`

**Description:** ดึงรายชื่อตำบลทั้งหมดในอำเภอที่ระบุ

**Authentication:** ไม่ต้องการ

**Path Parameters:**
- `district` (string) - ชื่ออำเภอ

**Query Parameters:**
- `province` (string) - ชื่อจังหวัด (required)

**Example:** `GET /auth/subdistricts/คลองเตย?province=กรุงเทพมหานคร`

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": [
    {
      "subdistrict": "คลองเตย"
    },
    {
      "subdistrict": "คลองตัน"
    }
  ]
}
```

---

### 11. ดึงหมายเลขเขตเลือกตั้ง (Get Constituency Number)

**Endpoint:** `GET /auth/constituencynumbers/:subdistrict?province=xxx&district=xxx`

**Description:** ดึงหมายเลขเขตเลือกตั้งตามตำบล

**Authentication:** ไม่ต้องการ

**Path Parameters:**
- `subdistrict` (string) - ชื่อตำบล

**Query Parameters:**
- `province` (string) - ชื่อจังหวัด (required)
- `district` (string) - ชื่ออำเภอ (required)

**Example:** `GET /auth/constituencynumbers/คลองเตย?province=กรุงเทพมหานคร&district=คลองเตย`

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": {
    "consituencynumber": 1,
    "id": 5
  }
}
```

---

## 🗳️ Vote APIs

Base Path: `/vote`

### 1. ลงคะแนนเลือกตั้ง (Submit Vote)

**Endpoint:** `POST /vote`

**Description:** ลงคะแนนเลือกตั้งให้กับผู้สมัคร

**Authentication:** Required (Bearer Token + Voter Role)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "userId": "number",           // ID ของผู้ใช้ (required)
  "consituencyId": "number",    // ID เขตเลือกตั้ง (required)
  "candidateId": "number"       // ID ผู้สมัคร (required)
}
```

**Response:**

Success (200):
```json
{
  "message": "บันทึกคะแนนเลือกตั้งสำเร็จ",
  "data": {
    "id": 1,
    "userId": 1,
    "consituencyId": 5,
    "candidateId": 3,
    "createdAt": "2026-02-09T10:30:00.000Z"
  }
}
```

Error (401):
```json
{
  "message": "Unauthoized"
}
```

Error (403):
```json
{
  "message": "You are not authorized to perform this action"
}
```

---

### 2. ดูประวัติการลงคะแนน (Get Vote History)

**Endpoint:** `GET /vote/:userId`

**Description:** ดูประวัติการลงคะแนนของผู้ใช้

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Path Parameters:**
- `userId` (number) - ID ของผู้ใช้

**Example:** `GET /vote/1`

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "userId": 1,
    "consituencyId": 5,
    "candidateId": 3,
    "createdAt": "2026-02-09T10:30:00.000Z",
    "candidate": {
      "id": 3,
      "name": "สมชาย รักชาติ",
      "partyId": 2
    }
  }
}
```

---

## 🏛️ Party APIs

Base Path: `/party`

### 1. สร้างพรรคการเมือง (Create Party)

**Endpoint:** `POST /party`

**Description:** สร้างพรรคการเมืองใหม่

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin role)

**Request Body:**
```json
{
  "name": "string",           // ชื่อพรรค (required)
  "imageurl": "string",       // URL รูปภาพโลโก้พรรค (optional)
  "policy": "string"          // นโยบายพรรค (optional)
}
```

**Response:**

Success (201):
```json
{
  "id": 1,
  "name": "พรรคประชาธิปไตย",
  "imageurl": "https://example.com/logo.png",
  "policy": "นโยบายเพื่อประชาชน",
  "createdAt": "2026-02-09T10:30:00.000Z"
}
```

Error (400 - ชื่อซ้ำ):
```json
{
  "message": "พรรคการเมืองนี้มีอยู่ในระบบแล้ว"
}
```

Error (400 - ไม่ระบุชื่อ):
```json
{
  "message": "ต้องระบุชื่อพรรคการเมือง"
}
```

---

### 2. ดึงรายชื่อพรรคทั้งหมด (Get All Parties)

**Endpoint:** `GET /party`

**Description:** ดึงรายชื่อพรรคการเมืองทั้งหมด

**Authentication:** ไม่ต้องการ

**Response:**

Success (200):
```json
[
  {
    "id": 1,
    "name": "พรรคประชาธิปไตย",
    "imageurl": "https://example.com/logo.png",
    "policy": "นโยบายเพื่อประชาชน",
    "createdAt": "2026-02-09T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "พรรคเพื่อไทย",
    "imageurl": null,
    "policy": null,
    "createdAt": "2026-02-09T11:00:00.000Z"
  }
]
```

---

### 3. ดึงข้อมูลพรรคตาม ID (Get Party by ID)

**Endpoint:** `GET /party/:id`

**Description:** ดึงข้อมูลพรรคการเมืองตาม ID

**Authentication:** ไม่ต้องการ

**Path Parameters:**
- `id` (number) - ID ของพรรค

**Example:** `GET /party/1`

**Response:**

Success (200):
```json
{
  "id": 1,
  "name": "พรรคประชาธิปไตย",
  "imageurl": "https://example.com/logo.png",
  "policy": "นโยบายเพื่อประชาชน",
  "createdAt": "2026-02-09T10:30:00.000Z"
}
```

Error (404):
```json
{
  "message": "ไม่พบพรรคการเมืองที่ระบุ"
}
```

---

### 4. แก้ไขข้อมูลพรรค (Update Party)

**Endpoint:** `PUT /party/:id`

**Description:** แก้ไขข้อมูลพรรคการเมือง

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin role)

**Path Parameters:**
- `id` (number) - ID ของพรรค

**Request Body:**
```json
{
  "name": "string",           // ชื่อพรรค (required)
  "imageurl": "string",       // URL รูปภาพ (optional)
  "policy": "string"          // นโยบาย (optional)
}
```

**Example:** `PUT /party/1`

**Response:**

Success (200):
```json
{
  "id": 1,
  "name": "พรรคประชาธิปไตยใหม่",
  "imageurl": "https://example.com/new-logo.png",
  "policy": "นโยบายใหม่",
  "createdAt": "2026-02-09T10:30:00.000Z",
  "updatedAt": "2026-02-09T15:00:00.000Z"
}
```

Error (400):
```json
{
  "message": "ต้องระบุชื่อพรรคการเมือง"
}
```

---

### 5. ลบพรรค (Delete Party)

**Endpoint:** `DELETE /party/:id`

**Description:** ลบพรรคการเมือง

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin role)

**Path Parameters:**
- `id` (number) - ID ของพรรค

**Example:** `DELETE /party/1`

**Response:**

Success (204):
```
No Content
```

Error (400 - มีผู้สมัคร):
```json
{
  "message": "ไม่สามารถลบพรรคการเมืองได้ เนื่องจากมีผู้สมัครรับเลือกตั้ง"
}
```

---

## 🗺️ Constituency APIs

Base Path: `/constituency`

### 1. สร้างเขตเลือกตั้ง (Create Constituency)

**Endpoint:** `POST /constituency/create`

**Description:** สร้างเขตเลือกตั้งใหม่

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin role)

**Request Body:**
```json
{
  "consituencynumber": "number",    // หมายเลขเขต (required)
  "address": "string",              // ที่อยู่ (required)
  "district": "string",             // อำเภอ (required)
  "subdistrict": "string",          // ตำบล (required)
  "province": "string",             // จังหวัด (required)
  "zipcode": "string"               // รหัสไปรษณีย์ (required)
}
```

**Response:**

Success (201):
```json
{
  "status": "success",
  "message": "สร้างเขตเลือกตั้งสำเร็จ",
  "data": {
    "id": 1,
    "consituencynumber": 1,
    "address": "123 ถนนสุขุมวิท",
    "district": "คลองเตย",
    "subdistrict": "คลองเตย",
    "province": "กรุงเทพมหานคร",
    "zipcode": "10110",
    "isclosed": true,
    "createdAt": "2026-02-09T10:30:00.000Z"
  }
}
```

Error (400 - ข้อมูลซ้ำ):
```json
{
  "status": "error",
  "message": "เขตเลือกตั้งนี้มีอยู่ในระบบแล้ว"
}
```

---

### 2. ดึงรายชื่อเขตเลือกตั้งทั้งหมด (Get All Constituencies)

**Endpoint:** `GET /constituency/all`

**Description:** ดึงรายชื่อเขตเลือกตั้งทั้งหมด

**Authentication:** ไม่ต้องการ

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "consituencynumber": 1,
      "address": "123 ถนนสุขุมวิท",
      "district": "คลองเตย",
      "subdistrict": "คลองเตย",
      "province": "กรุงเทพมหานคร",
      "zipcode": "10110",
      "isclosed": false,
      "createdAt": "2026-02-09T10:30:00.000Z"
    }
  ]
}
```

---

### 3. ดึงข้อมูลเขตเลือกตั้งตาม ID (Get Constituency by ID)

**Endpoint:** `GET /constituency/:id`

**Description:** ดึงข้อมูลเขตเลือกตั้งตาม ID

**Authentication:** ไม่ต้องการ

**Path Parameters:**
- `id` (number) - ID ของเขตเลือกตั้ง

**Example:** `GET /constituency/1`

**Response:**

Success (200):
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "consituencynumber": 1,
    "address": "123 ถนนสุขุมวิท",
    "district": "คลองเตย",
    "subdistrict": "คลองเตย",
    "province": "กรุงเทพมหานคร",
    "zipcode": "10110",
    "isclosed": false,
    "createdAt": "2026-02-09T10:30:00.000Z"
  }
}
```

---

### 4. ลบเขตเลือกตั้ง (Delete Constituency)

**Endpoint:** `DELETE /constituency/:id`

**Description:** ลบเขตเลือกตั้ง

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin role)

**Path Parameters:**
- `id` (number) - ID ของเขตเลือกตั้ง

**Example:** `DELETE /constituency/1`

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "ลบเขตเลือกตั้งสำเร็จ",
  "data": {
    "id": 1,
    "consituencynumber": 1,
    "province": "กรุงเทพมหานคร"
  }
}
```

Error (500 - มีผู้ใช้ในเขต):
```json
{
  "status": "error",
  "message": "มีผู้มีสิทธิ์เลือกตั้งในเขตเลือกตั้งนี้ อยู่ในระบบ ไม่สามารถลบได้"
}
```

---

### 5. เปิดการเลือกตั้งทุกเขต (Open All Elections)

**Endpoint:** `PUT /constituency/open/all`

**Description:** เปิดการเลือกตั้งในทุกเขตเลือกตั้ง

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin/ECT role)

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "เปิดการเลือกตั้งในทุกเขตเลือกตั้งสำเร็จ"
}
```

---

### 6. ปิดการเลือกตั้งทุกเขต (Close All Elections)

**Endpoint:** `PUT /constituency/close/all`

**Description:** ปิดการเลือกตั้งในทุกเขตเลือกตั้ง

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin/ECT role)

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "ปิดการเลือกตั้งในทุกเขตเลือกตั้งสำเร็จ"
}
```

---

### 7. เปิดการเลือกตั้งเขตที่ระบุ (Open Specific Election)

**Endpoint:** `PUT /constituency/open/:id`

**Description:** เปิดการเลือกตั้งในเขตที่ระบุ

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin/ECT role)

**Path Parameters:**
- `id` (number) - ID ของเขตเลือกตั้ง

**Example:** `PUT /constituency/open/1`

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "เปิดการเลือกตั้งในจังหวัดกรุงเทพมหานคร เขตที่ 1 สำเร็จ"
}
```

---

### 8. ปิดการเลือกตั้งเขตที่ระบุ (Close Specific Election)

**Endpoint:** `PUT /constituency/close/:id`

**Description:** ปิดการเลือกตั้งในเขตที่ระบุ

**Authentication:** ไม่ต้องการ (แนะนำให้เพิ่ม Admin/ECT role)

**Path Parameters:**
- `id` (number) - ID ของเขตเลือกตั้ง

**Example:** `PUT /constituency/close/1`

**Response:**

Success (200):
```json
{
  "status": "success",
  "message": "ปิดการเลือกตั้งในจังหวัด กรุงเทพมหานคร เขตที่ 1 สำเร็จ"
}
```

---

## 🔑 Authorization & Roles

### User Roles
- `ROLE_VOTER` - ผู้มีสิทธิ์เลือกตั้ง (สามารถลงคะแนนได้)
- `ROLE_ADMIN` - ผู้ดูแลระบบ (จัดการข้อมูลทั้งหมด)
- `ROLE_ECT` - คณะกรรมการการเลือกตั้ง (จัดการการเลือกตั้ง)

### Authentication Header Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### JWT Token Structure
```json
{
  "nationalId": "1234567890123",
  "currentRole": "ROLE_VOTER",
  "consituencyId": 1,
  "iat": 1707472800,
  "exp": 1707559200
}
```

---

## 📝 Common Response Status Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success - GET, PUT, DELETE |
| 201 | Created - POST สำเร็จ |
| 204 | No Content - DELETE สำเร็จ |
| 400 | Bad Request - ข้อมูลไม่ถูกต้อง |
| 401 | Unauthorized - ไม่ได้ล็อกอิน |
| 403 | Forbidden - ไม่มีสิทธิ์เข้าถึง |
| 404 | Not Found - ไม่พบข้อมูล |
| 500 | Internal Server Error - เกิดข้อผิดพลาดในเซิร์ฟเวอร์ |

---

## 🧪 Testing with cURL Examples

### 1. Register
```bash
curl -X POST https://online-election-project.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nationalId": "1234567890123",
    "firstname": "สมชาย",
    "lastname": "ใจดี",
    "address": "123 ถนนสุขุมวิท",
    "province": "กรุงเทพมหานคร",
    "district": "คลองเตย",
    "subdistrict": "คลองเตย",
    "consituencyId": 1,
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }'
```

### 2. Login
```bash
curl -X POST https://online-election-project.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "nationalId": "1234567890123",
    "password": "Password123!"
  }'
```

### 3. Get All Users (Admin)
```bash
curl -X GET https://online-election-project.onrender.com/auth/users \
  -H "Content-Type: application/json"
```

### 4. Get Profile (with token)
```bash
curl -X GET https://online-election-project.onrender.com/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 5. Add Role (Admin)
```bash
curl -X POST https://online-election-project.onrender.com/auth/add-role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "userid": 3,
    "roleName": "ROLE_ADMIN"
  }'
```

### 6. Delete Role (Admin)
```bash
curl -X DELETE https://online-election-project.onrender.com/auth/delete-role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "userid": 3,
    "roleName": "ROLE_ADMIN"
  }'
```

### 7. Submit Vote
```bash
curl -X POST https://online-election-project.onrender.com/vote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "userId": 1,
    "consituencyId": 1,
    "candidateId": 3
  }'
```
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "userId": 1,
    "consituencyId": 1,
    "candidateId": 3
  }'
```

---

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="super-secret-election-key-2025"
PORT=3000
```

---

## 📮 Contact & Support

สำหรับข้อสงสัยหรือปัญหาเกี่ยวกับ API กรุณาติดต่อทีม Backend Developer

**Version:** 1.0.0  
**Last Updated:** February 9, 2026
