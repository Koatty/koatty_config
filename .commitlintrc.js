/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-18 20:53:46
 * @LastEditTime: 2022-02-21 17:50:34
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['init', 'feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
    'type-empty': [2, 'never'],
    'scope-enum': [0], // 不校验scope类型
    'scope-empty': [0], // 不校验scope是否设置
    'subject-case': [0], // 不校验描述的字符格式
    'subject-min-length': [2, 'always', 2], // 描述至少2个字符
  },
};
