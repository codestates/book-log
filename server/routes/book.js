const router = require('express').Router();
const { book, review } = require('../controllers');

// 도서 목록
router.get('/', book.list);

// 도서 감상 목록
router.get('/:book_id/review', book.reviews);

// 감상 작성
router.post('/new', review.new);

// 도서 검색
router.get('/search', book.search);

// 감상 수정
router.patch('/edit', review.edit);

// 감상 삭제
router.post('/remove/:review_id', review.remove);

module.exports = router;
