import { prisma } from "../src/lib/prisma";

async function main() {
  console.log('Start seeding constituencies...')

  await prisma.consituency.deleteMany()
  console.log('Deleted old constituency data.')


  const constituencies = [
    // --- กรุงเทพมหานคร ---
    {
      province: 'กรุงเทพมหานคร',
      consituencynumber: 1,
      district: 'พระนคร',
      subdistrict: 'พระบรมมหาราชวัง',
      zipcode: '10200',
      isclosed: true,
    },
    {
      province: 'กรุงเทพมหานคร',
      consituencynumber: 2,
      district: 'ปทุมวัน',
      subdistrict: 'รองเมือง',
      zipcode: '10330',
      isclosed: true,
    },
    {
      province: 'กรุงเทพมหานคร',
      consituencynumber: 3,
      district: 'บางรัก',
      subdistrict: 'สีลม',
      zipcode: '10500',
      isclosed: true, 
    },
    // --- เชียงใหม่ ---
    {
      province: 'เชียงใหม่',
      consituencynumber: 1,
      district: 'เมืองเชียงใหม่',
      subdistrict: 'สุเทพ',
      zipcode: '50200',
      isclosed: true,
    },
    {
      province: 'เชียงใหม่',
      consituencynumber: 2,
      district: 'แม่ริม',
      subdistrict: 'ดอนแก้ว',
      zipcode: '50180',
      isclosed: true,
    },
  ]

  for (const event of constituencies) {
    const constituency = await prisma.consituency.create({
      data: event,
    })
    console.log(`Created constituency with id: ${constituency.id}`)
  }

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