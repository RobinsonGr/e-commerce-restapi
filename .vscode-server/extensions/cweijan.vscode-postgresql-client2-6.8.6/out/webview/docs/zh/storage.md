# 私人云盘

从版本5.5.4后支持连接到兼容aws s3协议的服务, 常见的有[七牛云Kodo](#七牛云), [阿里云OSS](#阿里云)等等, 通过该扩展连接对象存储服务, 就可视为连接到一个私人云盘.

使用步骤:

* 开通对象存储服务, 存储成本一般是0.12元/G/月左右, 下载带宽费用0.5元/G, 七牛云价格最低(或者用开源的minio搭建完全免费的私人服务器)
* 获取对象存储服务的access key和secret key.
* 打开连接界面, 创建一个s3连接.

![1657031919263](https://doc.database-client.com/image/storage/1657031919263.png)

连接效果

![1657031975400](https://doc.database-client.com/image/storage/1657031975400.png)

# 对象存储服务开通帮助

## 七牛云

[七牛云](https://s.qiniu.com/YJBJnm)的价格是最低的, 存储费用10G费用, 超出10G部分0.98/G/月, 下载费用0.26/G, 优先推荐

开通步骤:

1. 开通[对象存储服务Kodo](https://s.qiniu.com/YJBJnm), 选择空间管理, 新建一个空间![1657078698991](https://doc.database-client.com/image/storage/1657078698991.png)
2. 移动到右上角用户图标, 进入密钥管理, 就可创建和获取密钥了 ![1657078749223](https://doc.database-client.com/image/storage/1657078749223.png)

## 阿里云

开通步骤:

1. 开通[OSS服务](https://oss.console.aliyun.com/), 选择Bucket列表, 创建一个Bucket ![1657070829618](https://doc.database-client.com/image/storage/1657070829618.png)
2. 进入子账号管理, [RAM 访问控制 (aliyun.com)](https://ram.console.aliyun.com/users), 创建一个用户, 选择Open API调用访问 , 创建完成后保存**AccessKey**和**Secret**![1657070266443](https://doc.database-client.com/image/storage/1657070266443.png)
3. 为这个用户配置AliyunOSSFullAccess的权限![1657070352708](https://doc.database-client.com/image/storage/1657070352708.png)

## 腾讯云

开通步骤:

1. 开通[COS服务](https://console.cloud.tencent.com/cos), 选择存储桶列表, 创建一个存储桶
2. 进入子账号管理, [用户 - 控制台 (tencent.com)](https://console.cloud.tencent.com/cam), 创建一个用户, 选择快速新建用户, 配置访问方式为**编程访问**, 用户权限为**QcloudCOSFullAccess**, 创建完成后保存**AccessKey**和**Secret![1657071002407](https://doc.database-client.com/image/storage/1657071002407.png)**
