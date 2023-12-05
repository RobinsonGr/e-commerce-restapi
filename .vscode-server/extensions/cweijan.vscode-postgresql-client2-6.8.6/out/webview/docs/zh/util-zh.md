# 辅助

## 笔记本

可通过新建sqlbook后缀的文件来创建SQL笔记本, 用于对多个连接的SQL进行归档操作.

![1657031313683](https://doc.database-client.com/image/util/1657031313683.png)

## 表定义

你可通过以下方式来显示表的定义语句:

1. 将鼠标移动到表的上面时
2. 通过"跳转到定义"到功能: 即通过ctrl+鼠标单击的方式

注意: 只有非隐藏表可以显示, 且只对付费用户开放

![](https://doc.database-client.com/image/sql/1647176834109.png)

## 控制台

通过点击这个按钮打开控制台, 可在控制台内修改扩展设置, 导出导入设置, 和进行连接设置云同步.

![](https://doc.database-client.com/image/console/1646791881361.png)

### 云同步

通过云端同步你的连接信息, 可以指定一个加密密钥, 在同步时会通过该密钥进行DES加解密, 确保数据安全.

![](https://doc.database-client.com/image/console/1646792025769.jpg)

## Mock数据

快速生成用于测试的数据, 通过以下步骤进行生成:

![mockData](https://doc.database-client.com/image/minor/mockData.jpg)

生成配置文件

- mockStartIndex: 用于填充主键, auto表示取当前的表数据总数+1.
- mockCount: 想要生成的测试数据总数
