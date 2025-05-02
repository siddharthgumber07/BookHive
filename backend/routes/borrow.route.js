import express from 'express'
import { borrowedBooks, getBorrowedBooksForAdmin, recordBorrowedBook, returnBorrowBook } from '../controllers/borrow.controller.js'
import { Borrow } from '../models/borrow.model.js'
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';

const router=express.Router();
router.post('/record-borrow-book/:id',isAuthenticated,isAuthorized("Admin"),recordBorrowedBook);
router.get('/borrowed-books-by-users',isAuthenticated,isAuthorized("Admin"),getBorrowedBooksForAdmin);

router.get('/my-borrowed-books',isAuthenticated,borrowedBooks);

router.put('/return-borrowed-book/:bookId',isAuthenticated,isAuthorized("Admin"),returnBorrowBook);

export default router;