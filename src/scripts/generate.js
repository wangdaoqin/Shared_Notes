const fs = require('fs');
const path = require('path');

// 项目根目录
const rootDir = path.resolve(__dirname, '../../');
const dataDir = path.join(rootDir, 'src', 'data');
const publicDir = path.join(rootDir, 'public');

// 确保public目录存在
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 扫描目录获取分类和文件
function scanDirectories() {
  const categories = [];
  
  // 读取data目录下的所有子目录作为分类
  const categoryDirs = fs.readdirSync(dataDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  categoryDirs.forEach(category => {
    const categoryPath = path.join(dataDir, category);
    const files = [];
    
    // 读取分类目录下的所有文件
    const fileList = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => !dirent.isDirectory())
      .map(dirent => {
        const filePath = path.join(categoryPath, dirent.name);
        const stats = fs.statSync(filePath);
        return {
          name: dirent.name,
          path: filePath,
          relativePath: path.join('data', category, dirent.name).replace(/\\/g, '/'),
          mtime: stats.mtime,
          size: stats.size
        };
      });
    
    // 按修改时间排序，最新的在前
    fileList.sort((a, b) => b.mtime - a.mtime);
    
    files.push(...fileList);
    
    categories.push({
      name: category,
      files
    });
  });
  
  return categories;
}

// 生成HTML内容
function generateHTML(categories) {
  // 生成导航栏
  const navHTML = categories.map(category => `
    <li class="nav-item">
      <a href="#${category.name}" class="nav-link">${category.name}</a>
    </li>
  `).join('');
  
  // 生成内容区
  const contentHTML = categories.map(category => {
    const filesHTML = category.files.map(file => {
      const fileName = path.basename(file.name, path.extname(file.name));
      const fileExt = path.extname(file.name).toLowerCase();
      let fileType = 'other';
      let icon = '📄';
      let link = file.relativePath;
      
      // 根据文件类型设置图标和链接
      switch (fileExt) {
        case '.md':
          fileType = 'markdown';
          icon = '📝';
          break;
        case '.html':
          fileType = 'html';
          icon = '🌐';
          break;
        case '.pdf':
          fileType = 'pdf';
          icon = '� pdf';
          break;
        case '.txt':
          fileType = 'text';
          icon = '📃';
          break;
      }
      
      // 格式化修改时间
      const formattedDate = file.mtime.toLocaleString('zh-CN');
      
      return `
        <div class="file-card">
          <div class="file-header">
            <span class="file-icon">${icon}</span>
            <h3 class="file-title">
              <a href="${link}" target="_blank">${fileName}</a>
            </h3>
          </div>
          <div class="file-meta">
            <span class="file-type">${getFileTypeLabel(fileExt)}</span>
            <span class="file-date">${formattedDate}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <section id="${category.name}" class="category-section">
        <h2 class="category-title">${category.name}</h2>
        <div class="file-grid">
          ${filesHTML}
        </div>
      </section>
    `;
  }).join('');
  
  // 完整的HTML模板
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>个人知识库</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
    
    body {
      font-family: 'Noto Sans SC', sans-serif;
    }
    
    .nav-link {
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      background-color: rgba(76, 175, 80, 0.1);
    }
    
    .file-card {
      transition: all 0.3s ease;
    }
    
    .file-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .file-icon {
      font-size: 1.5rem;
    }
  </style>
</head>
<body class="bg-gray-50">
  <div class="flex h-screen overflow-hidden">
    <!-- 左侧导航栏 -->
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="p-4 border-b">
        <h1 class="text-xl font-bold text-green-600">个人知识库</h1>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          ${navHTML}
        </ul>
      </nav>
    </aside>
    
    <!-- 主内容区 -->
    <main class="flex-1 overflow-y-auto p-4 md:p-8">
      <div class="max-w-5xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">个人知识库</h1>
          <p class="text-gray-600 mt-2">管理和访问您的所有学习笔记和资料</p>
        </header>
        
        ${contentHTML}
        
        <footer class="mt-16 pt-8 border-t text-center text-gray-500">
          <p>© ${new Date().getFullYear()} 个人知识库 | 基于GitHub Pages构建</p>
        </footer>
      </div>
    </main>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // 移动端菜单切换
      const menuBtn = document.querySelector('.menu-btn');
      const nav = document.querySelector('aside');
      
      if (menuBtn) {
        menuBtn.addEventListener('click', function() {
          nav.classList.toggle('hidden');
        });
      }
    });
  </script>
</body>
</html>
  `;
}

// 辅助函数：获取文件类型标签
function getFileTypeLabel(ext) {
  const labels = {
    '.md': 'Markdown',
    '.html': 'HTML',
    '.pdf': 'PDF',
    '.txt': 'Text'
  };
  return labels[ext] || '其他';
}

// 辅助函数：格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 复制文件到public目录
function copyFilesToPublic() {
  // 复制data目录到public
  const sourceDataDir = path.join(dataDir);
  const targetDataDir = path.join(publicDir, 'data');
  
  // 递归复制目录
  function copyDir(source, target) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
    
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDir(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  }
  
  copyDir(sourceDataDir, targetDataDir);
}

// 主函数
function main() {
  console.log('开始生成网站...');
  
  // 扫描目录
  const categories = scanDirectories();
  console.log(`发现 ${categories.length} 个分类`);
  
  // 生成HTML
  const htmlContent = generateHTML(categories);
  
  // 写入index.html
  const indexPath = path.join(publicDir, 'index.html');
  fs.writeFileSync(indexPath, htmlContent);
  console.log('生成 index.html 成功');
  
  // 复制文件到public目录
  copyFilesToPublic();
  console.log('复制文件到public目录成功');
  
  console.log('网站生成完成！');
}

// 执行主函数
main();