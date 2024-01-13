-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "confirmAccount" BOOLEAN DEFAULT false,
    "confirmCode" TEXT,
    "confirmAccountExpires" TIMESTAMP(3),
    "type" TEXT NOT NULL DEFAULT 'client',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminProfiles" (
    "id" TEXT NOT NULL,
    "paymentPlan" TEXT NOT NULL DEFAULT 'free',
    "cnpj" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "adminProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "gender" TEXT,
    "cpf" TEXT,
    "birth" TIMESTAMP(3),
    "phone" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventInfoId" TEXT NOT NULL,
    "adminProfileId" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventMembers" (
    "id" TEXT NOT NULL,
    "km" INTEGER NOT NULL,
    "shirtSize" TEXT NOT NULL DEFAULT 'M',
    "eventsId" TEXT,
    "profileId" TEXT,

    CONSTRAINT "eventMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventInformations" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shirtSizes" TEXT[],
    "contactPhone" TEXT,
    "contactMail" TEXT,
    "subscribeDate" TIMESTAMP(3) NOT NULL,
    "open" BOOLEAN NOT NULL,

    CONSTRAINT "eventInformations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventPragraphs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eventInformationId" TEXT,

    CONSTRAINT "eventPragraphs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventContents" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "eventParagraphId" TEXT,

    CONSTRAINT "eventContents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagesParagraph" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventParagraphContentId" TEXT,

    CONSTRAINT "imagesParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_id_key" ON "adminProfiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_cnpj_key" ON "adminProfiles"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "adminProfiles_userId_key" ON "adminProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cpf_key" ON "profiles"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "events_id_key" ON "events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "events_eventInfoId_key" ON "events"("eventInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "eventMembers_id_key" ON "eventMembers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "eventInformations_id_key" ON "eventInformations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "eventPragraphs_id_key" ON "eventPragraphs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "eventContents_id_key" ON "eventContents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_userId_key" ON "images"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "images_eventId_key" ON "images"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "imagesParagraph_id_key" ON "imagesParagraph"("id");

-- AddForeignKey
ALTER TABLE "adminProfiles" ADD CONSTRAINT "adminProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_eventInfoId_fkey" FOREIGN KEY ("eventInfoId") REFERENCES "eventInformations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_adminProfileId_fkey" FOREIGN KEY ("adminProfileId") REFERENCES "adminProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventMembers" ADD CONSTRAINT "eventMembers_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventMembers" ADD CONSTRAINT "eventMembers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventPragraphs" ADD CONSTRAINT "eventPragraphs_eventInformationId_fkey" FOREIGN KEY ("eventInformationId") REFERENCES "eventInformations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventContents" ADD CONSTRAINT "eventContents_eventParagraphId_fkey" FOREIGN KEY ("eventParagraphId") REFERENCES "eventPragraphs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagesParagraph" ADD CONSTRAINT "imagesParagraph_eventParagraphContentId_fkey" FOREIGN KEY ("eventParagraphContentId") REFERENCES "eventContents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
