import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log('Start seeding constituencies...')

  await prisma.vote.deleteMany()
  await prisma.role.deleteMany()
  await prisma.users.deleteMany()
  await prisma.candidate.deleteMany()
  await prisma.party.deleteMany()

  await prisma.subdistrict.deleteMany()
  await prisma.district.deleteMany()
  await prisma.province.deleteMany()

  await prisma.consituency.deleteMany()
  await prisma.electionsetting.deleteMany()

  console.log('Cleared existing data')
  console.log('Start seeding locations...')

  // จังหวัดเชียงใหม่
  await prisma.province.create({
    data: {
      code: "50",
      nameTh: "เชียงใหม่",
      nameEn: "Chiang Mai",
      isActive: true,
    },
  })

  // อำเภอเมืองเชียงใหม่
  await prisma.district.create({
    data: {
      code: "5001",
      nameTh: "เมืองเชียงใหม่",
      nameEn: "Mueang Chiang Mai",
      isActive: true,
      provinceCode: "50",
    },
  })

  // ตำบลสุเทพ
  await prisma.subdistrict.create({
    data: {
      code: "500101",
      nameTh: "สุเทพ",
      nameEn: "Suthep",
      zipcode: "50200",
      isActive: true,
      provinceCode: "50",
      districtCode: "5001",
    },
  })

  console.log('Created Locations')

  await prisma.electionsetting.create({
    data: {
      electionname: "การเลือกตั้งทั่วไป 2026",
      startdate: new Date('2026-01-24T08:00:00Z'),
      enddate: new Date('2026-01-24T17:00:00Z'),
      starttime: "08:00",
      endtime: "17:00",
      isopen: true // เปิดระบบ
    }
  })
  console.log('Created Election Settings')

  const bkk1 = await prisma.consituency.create({
    data: { province: 'กรุงเทพมหานคร', consituencynumber: 1, district: 'บางรัก', subdistrict: 'สี่พระยา', zipcode: '10500', isclosed: false }
  })
  const bkk2 = await prisma.consituency.create({
    data: { province: 'กรุงเทพมหานคร', consituencynumber: 2, district: 'ปทุมวัน', subdistrict: 'รองเมือง', zipcode: '10330', isclosed: false }
  })
  const cm1 = await prisma.consituency.create({
    data: { province: 'เชียงใหม่', consituencynumber: 1, district: 'เมืองเชียงใหม่', subdistrict: 'สุเทพ', zipcode: '50200', isclosed: false }
  })

  console.log('Created Constituencies')

  const partyA = await prisma.party.create({
    data: {
      name: "พรรคก้าวไกล",
      imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Move_Forward_Party_Logo.svg/1200px-Move_Forward_Party_Logo.svg.png",
      policy: "นโยบาย: สวัสดิการถ้วนหน้า, กระจายอำนาจ, ปฏิรูประบบราชการ"
    }
  })
  const partyB = await prisma.party.create({
    data: {
      name: "พรรคเพื่อไทย",
      imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pheu_Thai_Party_Logo.svg/1200px-Pheu_Thai_Party_Logo.svg.png",
      policy: "นโยบาย: กระตุ้นเศรษฐกิจ, Digital Wallet, ค่าแรงขั้นต่ำ 600 บาท"
    }
  })
  const partyC = await prisma.party.create({
    data: {
      name: "พรรคภูมิใจไทย",
      imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bhumjaithai_Party_Logo.svg/1200px-Bhumjaithai_Party_Logo.svg.png",
      policy: "นโยบาย: พักหนี้ 3 ปี, โซลาร์รูฟฟรี, ลดค่าไฟ"
    }
  })

  console.log('reated Parties')

  await prisma.candidate.create({
    data: {
      candidatenumber: 1, firstname: "สมชาย", lastname: "รักชาติ",
      imageurl: "https://ui-avatars.com/api/?name=Somchai&background=random",
      policy: "มุ่งมั่นพัฒนาเขตบางรักให้น่าอยู่",
      consituencyId: bkk1.id, consituencyprovince: bkk1.province, partyId: partyA.id
    }
  })
  await prisma.candidate.create({
    data: {
      candidatenumber: 2, firstname: "วิภา", lastname: "ใจดี",
      imageurl: "https://ui-avatars.com/api/?name=Wipa&background=random",
      policy: "เน้นเศรษฐกิจชุมชนและการท่องเที่ยว",
      consituencyId: bkk1.id, consituencyprovince: bkk1.province, partyId: partyB.id
    }
  })

  // เขต 1 เชียงใหม่
  await prisma.candidate.create({
    data: {
      candidatenumber: 1, firstname: "เหนือ", lastname: "ชายดอย",
      imageurl: "https://ui-avatars.com/api/?name=Nuea&background=random",
      policy: "แก้ปัญหาฝุ่น PM 2.5 อย่างยั่งยืน",
      consituencyId: cm1.id, consituencyprovince: cm1.province, partyId: partyA.id
    }
  })

  console.log('Created Candidates')
  const passwordHash = bcrypt.hashSync('123456', 10); // รหัสผ่าน default: 123456

  // 6.1 User with 1 Role (VOTER) - ประชาชนทั่วไป
  await prisma.users.create({
    data: {
      nationalId: "1111111111111",
      firstname: "สมศักดิ์", lastname: "พลเมือง",
      password: passwordHash,
      address: "123 ถ.สีลม", district: "บางรัก", subdistrict: "สี่พระยา", province: "กรุงเทพมหานคร",
      consituencyID: bkk1.id,
      role: { create: { roleName: 'ROLE_VOTER' } }
    }
  })

  // 6.2 User with 1 Role (ADMIN) - ผู้ดูแลระบบ
  await prisma.users.create({
    data: {
      nationalId: "2222222222222",
      firstname: "Admin", lastname: "System",
      password: passwordHash,
      address: "Server Room", district: "ปทุมวัน", subdistrict: "รองเมือง", province: "กรุงเทพมหานคร",
      consituencyID: bkk2.id, // Admin อาจจะผูกหรือไม่ผูกเขตก็ได้ แต่ใส่ไว้กัน Null
      role: { create: { roleName: 'ROLE_ADMIN' } }
    }
  })

  // 6.3 User with 2 Roles (ECT + VOTER) - กกต. ที่มีสิทธิ์เลือกตั้งด้วย
  await prisma.users.create({
    data: {
      nationalId: "3333333333333",
      firstname: "กรรมการ", lastname: "เที่ยงธรรม",
      password: passwordHash,
      address: "สำนักงาน กกต.", district: "เมืองเชียงใหม่", subdistrict: "สุเทพ", province: "เชียงใหม่",
      consituencyID: cm1.id,
      role: {
        create: [
          { roleName: 'ROLE_ECT' },
          { roleName: 'ROLE_VOTER' }
        ]
      }
    }
  })

  // 6.4 User with 3 Roles (ADMIN + ECT + VOTER) - Super User
  await prisma.users.create({
    data: {
      nationalId: "4444444444444",
      firstname: "Super", lastname: "User",
      password: passwordHash,
      address: "Cloud", district: "บางรัก", subdistrict: "สี่พระยา", province: "กรุงเทพมหานคร",
      consituencyID: bkk1.id,
      role: {
        create: [
          { roleName: 'ROLE_ADMIN' },
          { roleName: 'ROLE_ECT' },
          { roleName: 'ROLE_VOTER' }
        ]
      }
    }
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })