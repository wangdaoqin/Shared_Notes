# 静态化个人知识库托管系统

基于GitHub Pages的静态网站，能够自动索引本地指定文件夹中的多种格式文档（MD/HTML/PDF），并支持用户通过简单的文件操作来更新网站内容。

## 功能特点

### 核心功能
- **自动化目录生成**：系统自动扫描指定根目录下的所有子文件夹，每个子文件夹作为一个独立的“分类板块”
- **多格式文档支持**：支持 .md, .html, .pdf, .txt 等格式文件
- **动态内容管理**：用户在本地任意添加/删除/修改文件，网站自动同步更新
- **智能排序**：根据文件修改时间自动排序，最新更新的文件靠前显示

### 用户体验
- **现代化界面**：使用Tailwind CSS构建的简洁现代UI
- **左侧固定导航栏**：显示所有分类文件夹
- **响应式设计**：适配移动端和桌面端
- **文件卡片展示**：包含文件图标、名称、类型、修改时间和大小

### 技术实现
- **纯静态网站**：部署到GitHub Pages
- **自动化构建**：使用GitHub Actions实现自动构建
- **数据与代码分离**：用户文档与网站代码完全分离

## 项目结构

```
my-knowledge-base/
├── public/                    # 网站构建输出目录
├── src/
│   ├── data/                 # 用户文档目录（同步到GitHub）
│   │   ├── R语言/             # 分类文件夹
│   │   ├── 公共卫生/           # 分类文件夹
│   │   ├── 生活/              # 分类文件夹
│   │   └── CFETP/             # 分类文件夹
│   ├── scripts/
│   │   └── generate.js        # 自动生成网站索引的脚本
│   └── index.html             # 网站首页模板
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions配置
├── package.json               # 项目配置文件
└── README.md                  # 项目说明文档
```

## 快速开始

### 1. 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **运行开发服务器**
   ```bash
   npm run dev
   ```
   访问 http://localhost:3000 查看网站

3. **构建网站**
   ```bash
   npm run build
   ```
   构建结果会输出到 `public` 目录

### 2. 部署到GitHub Pages

1. **创建GitHub仓库**
   - 登录GitHub，点击"New repository"
   - 仓库名称建议使用 `yourusername.github.io`
   - 选择"Public"公开仓库

2. **推送代码**
   ```bash
   git init
   git add .
   git commit -m "初始化个人知识库"
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **启用GitHub Actions**
   - 进入仓库设置
   - 找到"Actions"选项，确保已启用

4. **配置GitHub Pages**
   - 进入仓库设置
   - 找到"Pages"选项
   - 选择"gh-pages"分支作为源
   - 点击"Save"

5. **访问网站**
   - 等待GitHub Actions完成构建（通常需要1-2分钟）
   - 访问 `https://yourusername.github.io` 查看网站

## 使用方法

### 添加新分类
只需在 `src/data` 目录下创建新文件夹，系统会自动将其识别为新的分类板块。

### 添加新文档
1. 在 `src/data` 目录下选择或创建对应分类文件夹
2. 将.md、.html、.pdf或.txt文件放入该文件夹
3. 推送更改到GitHub
4. GitHub Actions会自动构建并更新网站

### 删除文档
1. 在本地删除对应文件
2. 推送更改到GitHub
3. GitHub Actions会自动构建并更新网站

### 修改文档
1. 在本地编辑对应文件
2. 推送更改到GitHub
3. GitHub Actions会自动构建并更新网站

## 支持的文件格式

- **Markdown (.md)**：直接在浏览器中查看，支持语法高亮
- **HTML (.html)**：直接在浏览器中查看
- **PDF (.pdf)**：浏览器会自动打开或下载
- **Text (.txt)**：直接在浏览器中查看

## 技术栈

- **前端**：HTML5, Tailwind CSS, JavaScript
- **构建工具**：Node.js
- **Markdown渲染**：marked
- **代码高亮**：highlight.js
- **部署**：GitHub Pages, GitHub Actions

## 注意事项

1. **文件命名**：建议使用中文或英文文件名，避免使用特殊字符
2. **文件大小**：GitHub Pages对仓库大小有限制，建议单个文件不超过100MB
3. **构建时间**：每次推送后，GitHub Actions需要1-2分钟完成构建
4. **访问速度**：GitHub Pages的访问速度可能因地区而异

## 故障排除

### 网站不更新
- 检查GitHub Actions是否成功运行
- 检查文件路径是否正确
- 等待几分钟后刷新页面

### 构建失败
- 检查package.json中的依赖是否正确
- 检查generate.js脚本是否有语法错误
- 查看GitHub Actions的详细日志

### 文件无法访问
- 检查文件路径是否正确
- 检查文件是否已正确推送到GitHub
- 检查文件权限是否设置正确

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License
