# PLEX Media & Solutions Platform - 部署与域名绑定指南

本文档旨在为您解答关于如何将 PLEX 源码部署上线、绑定域名、生成 `dist` 编译文件夹以及在服务器上运行的全部疑问。

---

## 🛠️ 第一步：为什么下载的包里没有 `dist` 文件夹？

在现代前端开发（Vite + React）中，**`dist` 是编译后的静态部署文件夹，不属于源代码本身**，因此在下载的源码包中默认是不包含的（也被 `.gitignore` 排除在外）。

您需要通过以下两步来生成 `dist` 文件夹：

1. **安装项目依赖**：
   在项目根目录下打开终端，运行命令安装所有必需的开发包：
   ```bash
   npm install
   ```
2. **编译打包生成 `dist`**：
   运行编译命令，Vite 会自动将所有 TypeScript、React 和 CSS 代码压缩打包，在根目录下生成一个名为 **`dist`** 的文件夹：
   ```bash
   npm run build
   ```
   *此时，您就可以在项目根目录下看到崭新的 `dist` 文件夹了！*

---

## 🚀 第二步：测试环境如何发布上线？

针对您的服务器环境，我们为您提供了 **两种最简单、最主流的生产上线部署方案**：

### 方案 A：使用 Node.js 极简服务启动（推荐，已为您集成）
我们已经在根目录中为您编写好了专门的服务器启动脚本 `server.js`。您只需在服务器上依次运行：
```bash
# 1. 安装依赖
npm install

# 2. 编译打包生成 dist 目录
npm run build

# 3. 启动生产服务器 (监听 3000 端口)
npm start
```
该服务会自动监听服务器上的 `3000` 端口。

---

### 方案 B：使用 Nginx 直接部署静态网页（极致性能）
如果您使用的是轻量级的纯静态托管、宝塔面板或独立的 Nginx 网页服务，您可以直接将运行 `npm run build` 产生的 **`dist` 文件夹里的所有文件** 复制上传到您的网站根目录（如 `/www/wwwroot/yourdomain.com`）。

Nginx 配置示例：
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com; # 替换成您的域名

    root /www/wwwroot/yourdomain.com; # 指向您解压 dist 文件夹内容的绝对路径
    index index.html;

    # 支持 React 客户端路由跳转（防止刷新页面出现 404）
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🌐 第三步：如何将您的自定义域名绑定到 PLEX？

要在您的服务器上使用域名访问 PLEX，您需要完成以下操作：

### 1. 域名解析（DNS 解析）
登录您的域名注册商（如阿里云、腾讯云、Godaddy、Cloudflare 等），进入您的域名解析控制台，添加以下解析记录：

| 记录类型 | 主机记录 | 记录值 | 备注 |
| :--- | :--- | :--- | :--- |
| **A** | `@` | **您的服务器公网 IP 地址** | 用于绑定 `yourdomain.com` |
| **A** | `www` | **您的服务器公网 IP 地址** | 用于绑定 `www.yourdomain.com` |

> ⚠️ **关于“目前这个项目的 IP”**：
> 目前在 Google AI Studio 上的预览链接是动态托管在无服务器托管平台上的（Cloud Run），**不能直接解析其 IP 地址**。您需要将源码下载下来，部署在您自己购买的云服务器（如阿里云、腾讯云、华为云、AWS、Bandwagon 等）上。上述记录值中的“服务器公网 IP 地址”即为您自己云服务器的公网 IP。

### 2. 服务器反向代理（如果您使用的是 3000 端口）
如果您使用“方案 A（Node.js 服务监听 3000 端口）”运行，并且希望直接通过域名（不加端口号）访问，您需要在 Nginx 中添加一个反向代理：

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000; # 将请求转发到本地运行的 Node.js 服务
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

按照此步骤操作后，您就可以随时随地通过您绑定的专属域名访问您部署上线的 PLEX 平台了！
