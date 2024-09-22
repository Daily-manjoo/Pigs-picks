const { PrismaClient } = require("@prisma/client");
const data = require("../src/data/store_data.json");

const prisma = new PrismaClient();

async function seedData() {
  for (const store of data?.["DATA"] || []) {
    const storeData = {
      phone: store?.tel_no,
      address: store?.rdn_code_nm,
      lat: store?.y_dnts,
      lng: store?.x_cnts,
      name: store?.upso_nm,
      category: store?.bizcnd_code_nm,
      storeType: store?.cob_code_nm,
      foodCertifyName: store?.crtfc_gbn_nm,
    };

    try {
      const res = await prisma.store.create({
        data: storeData,
      });
      console.log("Inserted:", res);
    } catch (error) {
      console.error("Error inserting store:", storeData, error);
    }
  }
}

async function main() {
  await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
