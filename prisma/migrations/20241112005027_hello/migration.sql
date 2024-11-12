-- DropForeignKey
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_bookId_fkey";

-- DropForeignKey
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_memberId_fkey";

-- AddForeignKey
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
