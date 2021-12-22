const router = require('express').Router();
const { user } = require('../controllers');

// 일반 로그인
router.post('/login/general', user.login.general)

// 소셜 로그인
router.post('/login/social', user.login.social)

// 로그아웃
router.post('/logout', user.logout)

// 일반 회원 가입
router.post('/signup/general', user.signup.general)

// 소셜 회원 가입
router.post('/signup/social', user.signup.social)

// 회원 탈퇴
router.post('/withdrawal', user.withdrawal)

// 비밀번호 체크
router.post('/password/check', user.password.check)

// 비밀번호 변경
router.patch('/password/new', user.password.new)

// 이메일 중복 확인
router.post('/email/check', user.email.check)

// 소셜 로그인 확인
router.post('/social/check', user.social.check)

module.exports = router;
