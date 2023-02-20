// 验证数据库中的用户相关内容
const User = {
    // 查询用户手机号
    queryUserTel(option) {
        return 'select * from user_list where tel = '+option.userTel+'';
    },
    // 查询用户密码
    queryUserPwd(option) {
        return 'select * from user_list where (tel = '+option.userTel+') and pwd = '+option.userPwd+'';
    },
    // 新增用户
    insertData(option) {
        let userTel = option.userTel;
        let userPwd = option.userPwd || '000000';
        // 引入jwt
        let jwt = require('jsonwebtoken');
        // 用户信息
        let payload = {tel : userTel};
        // 口令
        let secret = 'AJIDEXIAOWU';
        // 生成token
        let token = jwt.sign(payload, secret);

        return 'INSERT INTO user_list (tel, pwd, imgUrl, nickName, token) VALUES ("'+userTel+'", "'+userPwd+'", "./images/default0.jpg", "初始用户", "'+token+'")';
    },
}
exports = module.exports = User;
