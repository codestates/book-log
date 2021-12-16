const router = require('express').Router();
const { user } = require('../controllers');

// 로그인
router.post('/login', user.login)

// 로그아웃
router.post('/logout', user.logout)

// 회원 가입
router.post('/signup', user.signup)

// 회원 탈퇴
router.post('/withdrawal', user.withdrawal)

// 비밀번호 체크
router.post('/password/check', user.password.check)

// 비밀번호 변경
router.patch('/password/new', user.password.new)

// 이메일 중복 확인
router.post('/email/check', user.email.check)

module.exports = router;
