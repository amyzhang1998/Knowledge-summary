# Node
## mySql
## sql语句
创建： CREATE DATABASE test
删除：DROP DATABASE test2;
### 默认端口
1. < 1024
2. > 1024
mySql :
## 数据库技术基础
### 修改和删除表
1. 修改表
语句格式：
ALTER TABLE <表名>[ADD<新列名><数据类型>[完整性约束条件]]
                    [DROP[完整性约束名]]
                    [MODIFY<列名><数据类型>
2. 删除表
DROP TABLE<表名>
## SQL数据查询 （SELECT，INSERT，DELETE,UPDATE）
SELECT[ALL|DISTINCT]<目标列表表达式>[,<目标列表表达式>]...
        FROM<表名或视图名>[,<表名或视图名>]...
        [WHERE<条件表达式>]
        [GROUP BY<列名1][HAVING<条件表达式>]]
        [ORDER BY<列名2][ASC|DESC]...]
>select其输出可以是列名，表达式，集函数（AVG/COUNT/MAX/MIN/SUM）,DISTINCT选项可以保证查询的结果集中不存在重复元祖。
