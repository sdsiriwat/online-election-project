-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'VOTER', 'ECT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nationalId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageurl" TEXT,
    "address" TEXT NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "consituencynumber" INTEGER NOT NULL,
    "roleName" "RoleName" NOT NULL DEFAULT 'VOTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "roleName" "RoleName" NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consituency" (
    "id" SERIAL NOT NULL,
    "province" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "consituency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageurl" TEXT,
    "policy" TEXT,

    CONSTRAINT "party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "imageurl" TEXT,
    "consituencyprovince" TEXT NOT NULL,
    "consituencynumber" INTEGER NOT NULL,
    "partyId" INTEGER NOT NULL,
    "isclosed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_consituencyTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_consituencyTousers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_nationalId_key" ON "users"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "consituency_province_number_key" ON "consituency"("province", "number");

-- CreateIndex
CREATE UNIQUE INDEX "party_name_key" ON "party"("name");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_consituencyprovince_consituencynumber_key" ON "candidate"("consituencyprovince", "consituencynumber");

-- CreateIndex
CREATE UNIQUE INDEX "vote_usersId_candidateId_key" ON "vote"("usersId", "candidateId");

-- CreateIndex
CREATE INDEX "_consituencyTousers_B_index" ON "_consituencyTousers"("B");

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_consituencyprovince_consituencynumber_fkey" FOREIGN KEY ("consituencyprovince", "consituencynumber") REFERENCES "consituency"("province", "number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consituencyTousers" ADD CONSTRAINT "_consituencyTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "consituency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consituencyTousers" ADD CONSTRAINT "_consituencyTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
