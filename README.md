# Shopstore2Hand

## ✨ เกี่ยวกับโปรเจคนี้

Shopstore2Hand เป็นเว็บไซต์สำหรับซื้อขายสินค้ามือสอง ที่พัฒนาโดยใช้ HTML, CSS, JavaScript และ Backend ด้วย Node.js และ MySQL

## 📝 คุณสมบัติหลัก

- 🛒 แสดงรายการสินค้ามือสอง
- ✔️ เพิ่มและแก้ไขสินค้า
- 🔍 ค้นหาสินค้าตามหมวดหมู่
- 📦 ระบบตะกร้าสินค้า
- 📄 ระบบจัดการคำสั่งซื้อ

## 📖 วิธีติดตั้ง

### 1. **Clone Repository**

```sh
git clone https://github.com/xaviousfelix/Shopstore2Hand.git
cd Shopstore2Hand
```

### 2. **ติดตั้ง Dependencies**

```sh
npm install
```

### 3. **ตั้งค่าการเชื่อมต่อ MySQL (XAMPP)**

ตรวจสอบให้แน่ใจว่า MySQL ทำงานอยู่บน XAMPP และสร้างฐานข้อมูลที่ต้องการ จากนั้นแก้ไขไฟล์ `config.js` หรือ `database.js` ให้เป็นดังนี้:

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // ค่าเริ่มต้นของ XAMPP ไม่มีรหัสผ่าน
    password: '',   // หากมีรหัสผ่านให้ใส่ตรงนี้
    database: 'your_database_name'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = connection;
```

### 4. **รันเซิร์ฟเวอร์**

```sh
npm start
```

หากมีข้อสงสัยเพิ่มเติม สามารถติดต่อหรือเปิด Issue ใน Repository ได้เลย! 🚀

# Shopstore2Hand

## ✨ เกี่ยวกับโปรเจคนี้

Shopstore2Hand เป็นเว็บไซต์สำหรับซื้อขายสินค้ามือสอง ที่พัฒนาโดยใช้ HTML, CSS, JavaScript และ Backend ด้วย Node.js และ MySQL

## 📝 คุณสมบัติหลัก

- 🛒 แสดงรายการสินค้ามือสอง
- ✔️ เพิ่มและแก้ไขสินค้า
- 🔍 ค้นหาสินค้าตามหมวดหมู่
- 📦 ระบบตะกร้าสินค้า
- 📄 ระบบจัดการคำสั่งซื้อ

## 📖 วิธีติดตั้ง

### 1. **Clone Repository**

```sh
git clone https://github.com/xaviousfelix/Shopstore2Hand.git
cd Shopstore2Hand
```

### 2. **ติดตั้ง Dependencies**

```sh
npm install
```

### 3. **ตั้งค่าการเชื่อมต่อ MySQL (XAMPP)**

ตรวจสอบให้แน่ใจว่า MySQL ทำงานอยู่บน XAMPP และสร้างฐานข้อมูลที่ต้องการ จากนั้นแก้ไขไฟล์ `config.js` หรือ `database.js` ให้เป็นดังนี้:

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // ค่าเริ่มต้นของ XAMPP ไม่มีรหัสผ่าน
    password: '',   // หากมีรหัสผ่านให้ใส่ตรงนี้
    database: 'your_database_name'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = connection;
```

### 4. **รันเซิร์ฟเวอร์**

```sh
npm start
```

หากมีข้อสงสัยเพิ่มเติม สามารถติดต่อหรือเปิด Issue ใน Repository ได้เลย! 🚀

---

## 📸 ตัวอย่างหน้าจอของโปรเจค

### 🏠 Home Page
![หน้าแรกของเว็บไซต์](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/30f0f1b1-41d7-4c3b-930e-c87a4da7f861)

### 🔑 Login Page
![หน้าล็อกอิน](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/e0f97b1f-26ca-4a8f-a0d9-9eaea5f0fe5b)

### 📝 Register Page
![หน้าสมัคร](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/bd063646-62e8-4a94-89ec-ea07c81a4b4c)

### 📊 Dashboard Page
![หน้าหลังบ้าน](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/73c93d2d-339c-48d4-897b-f7b538e65441)

### ✏️ Edit Page
![หน้าแก้ไขหลังบ้าน](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/f91a7175-bcdc-4c50-95a7-03468c95ea1d)

### 🔑 Login Admin Page
![หน้าล็อกอิน Admin](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/2cefabb8-cc96-4855-867d-9a43e2bce8d6)

### ➕ Add Product Page
![หน้าเพิ่มรายการสินค้า](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/e6440756-1eaf-442b-b8aa-3f67530ab399)

### 🛍️ Product Page
![หน้าสินค้า](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/0083616c-33c1-4829-a8ac-811566eb1c90)

### 🛒 Order Page
![หน้าสั่งซื้อ](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/0f8c3eab-c553-4da3-babe-89b5fe5ba60c)

### 💳 Payment Page
![หน้าชำระเงิน](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/49945f88-8731-43f2-90f4-598d84071909)

### 📄 Detail Order Page
![หน้ารายละเอียดการสั่งซื้อ](https://github.com/xaviousfelix/Shopstore2Hand/assets/118479639/e6aa5c68-5aec-42f9-8669-0a65ff19dfdc)




