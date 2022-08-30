// 账号权限
export enum UserRole {
  ROOTADMIN = 0, // 超级管理员
  ADMIN = 1, // 管理员
  EDITOR = 2, // 开发&测试&运营
  USER = 3 // 普通用户（只能查看）
}

// 账号状态
export enum UserStatus {
  INVALID = 0, // 无效
  EFFECTIVE = 1, // 有效
  DELETE = 2, // 删除
}
