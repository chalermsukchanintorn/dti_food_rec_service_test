/*
    ไฟล์ที่กำหนดการทำงานต่างๆ กับ table ใน database
    เช่น การเพิ่ม (insert/create), การแก้ไข (update),
    การลบ (delete), การค้นหา/ตรวจสอบ/ดึง/ดู (select/sead)
*/

//นำเข้าเพื่อเรียกใช้งาน module ต่างๆ ที่ต้องใช้งาน
const multer = require("multer"); //จัดการการอัปโหลดไฟล์
const path = require("path"); //จัดการ path หรือตำแหน่งที่อยู่ของไฟล์
const fs = require("fs"); //จัดการไฟล์

const { PrismaClient } = require("@prisma/client"); //จัดการการทำงานกับฐานข้อมูล
const prisma = new PrismaClient();

//การอัปโหลดไฟล์
//กำหนดค่าตำแหน่งที่อยู่ของไฟล์ และตั้งชื่อไฟล์ใหม่สำหรับไฟล์ที่อัปโหลดมา
const storage = multer.diskStorage({
  //กำหนดตำแหน่งที่อยู่ไฟล์
  destination: (req, file, cb) => {
    cb(null, "images/users");
  },
  //ตั้งชื่อไฟล์ใหม่
  filename: (req, file, cb) => {
    //ในที่นี้ชื่อไฟล์จะขึ้นต้นด้วย travel_ ตามด้วยเลขสุ่มที่ได้จาก Math.random() คูณด้วย Date.now() และต่อด้วยนามสกุลไฟล์
    cb(null, "user_" + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname));
  },
});

//ฟังก์ชันเพื่อการอัปโหลดไฟล์
exports.uploadUser = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only");
  },
}).single("userImage");

//ฟังก์ชันเพิ่มข้อมูลลงในตาราง user_tb
exports.createUser = async (req, res) => {
  try {
    const result = await prisma.user_tb.create({
      data: {       
        userFullname: req.body.userFullname,
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        userImage: req.file ? req.file.path.replace("images\\users\\", "") : "",
      },
    });

    res.status(201).json({
      message: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
