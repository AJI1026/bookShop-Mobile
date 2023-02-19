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
        return 'INSERT INTO user_list (tel, pwd, imgUrl, nickName, token) VALUES ("'+userTel+'", "'+userPwd+'", "1.png", "1", "1")';
    },
}
exports = module.exports = User;
