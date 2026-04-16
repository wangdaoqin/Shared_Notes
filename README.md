# 个人笔记库

这是一个用于存放个人笔记的网站，支持Markdown、HTML和PDF等格式的笔记文件。

## 目录结构

```
Tutorial-to-vibe-coding/
├── index.html          # 网站主页
├── R语言教程.html       # R语言入门教程（HTML格式）
├── vibe coding心得.md  # Vibe Coding心得（Markdown格式）
└── README.md           # 项目说明文件
```

## 如何部署到GitHub Pages

### 步骤1：创建GitHub仓库
1. 登录GitHub账号
2. 点击右上角的"+"按钮，选择"New repository"
3. 填写仓库名称（例如：notes）
4. 选择"Public"（公开）
5. 勾选"Initialize this repository with a README"
6. 点击"Create repository"

### 步骤2：克隆仓库到本地
1. 复制仓库的URL（HTTPS或SSH）
2. 在本地打开命令行工具
3. 执行以下命令：
   ```bash
   git clone <仓库URL>
   ```
4. 进入克隆的目录：
   ```bash
   cd <仓库名称>
   ```

### 步骤3：上传文件
1. 将本目录中的所有文件复制到克隆的仓库目录中
2. 执行以下命令：
   ```bash
   # 添加所有文件
   git add .
   
   # 提交更改
   git commit -m "Initial commit"
   
   # 推送到GitHub
   git push origin main
   ```

### 步骤4：启用GitHub Pages
1. 进入GitHub仓库页面
2. 点击"Settings"选项卡
3. 向下滚动到"GitHub Pages"部分
4. 在"Source"下拉菜单中选择"main"分支
5. 点击"Save"
6. 稍等片刻，GitHub Pages会生成网站URL

## 如何更新网站

### 方法1：直接编辑文件
1. 在本地编辑Markdown或HTML文件
2. 执行以下命令：
   ```bash
   # 添加更改的文件
   git add <文件名>
   
   # 或添加所有更改
   git add .
   
   # 提交更改
   git commit -m "Update notes"
   
   # 推送到GitHub
   git push origin main
   ```
3. GitHub Pages会自动更新网站

### 方法2：使用GitHub Desktop（推荐）
1. 下载并安装[GitHub Desktop](https://desktop.github.com/)
2. 克隆仓库到GitHub Desktop
3. 在本地编辑文件
4. 在GitHub Desktop中查看更改
5. 输入提交信息，点击"Commit to main"
6. 点击"Push origin"

## 工具推荐

### Markdown编辑器
- [Typora](https://typora.io/) - 所见即所得的Markdown编辑器
- [VS Code](https://code.visualstudio.com/) + [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) 插件
- [Obsidian](https://obsidian.md/) - 支持双向链接的Markdown笔记应用

### 版本控制
- [GitHub Desktop](https://desktop.github.com/) - 图形化Git客户端
- [Git Bash](https://gitforwindows.org/) - 命令行Git工具

## 注意事项

1. 确保文件编码为UTF-8，以支持中文显示
2. 图片等资源文件请放在同一目录或子目录中
3. 定期备份本地文件，以防数据丢失
4. 遵守GitHub的使用条款和社区规范

## 示例文件

- **R语言教程.html**：R语言入门教程，包含基础语法、数据处理和可视化等内容
- **vibe coding心得.md**：关于Vibe Coding的学习心得和实践经验分享

## 联系方式

如有问题或建议，请通过GitHub Issues联系。