//引入类库
let fs = require('fs');
let path = require('path');

//定义常量 对应uikit版本的路径
const uikitPath = 'E:/PUBLIC/uikit/3.0.0-rc.16/custom/';

//获取当前执行目录的名称，既对应的项目名称
let currentDirectoryName = path.basename(process.cwd());
console.log('当前执行路径：' + process.cwd());
console.log('当前执行目录名：' + currentDirectoryName);

//获取modular目录文件列表
let modular = fs.readdirSync(process.cwd() + '/modular');

//把modular目录文件名后缀.html，修改为.less
modular = modular.map((item) => {
    item = item.replace('.html', '.less');
    return item;
});

//获取less目录文件列表
let less = fs.readdirSync(uikitPath + 'modular');

//查找modular 和 less中相同的文件名，并写入新数组中
let lesslist = [];
for (let i = 0; i < modular.length; i++) {
    for (let x = 0; x < less.length; x++) {
        if (modular[i] == less[x]) {
            lesslist.push(less[x]);
        }
    }
}

//创建写入流
let ws = fs.createWriteStream(uikitPath + currentDirectoryName + '/_modular.less');

//建立通道
ws.once('open', () => {
    console.log('通道已经打开');
});

ws.once('close', () => {
    console.log('通道已经关闭');
});

//将引入内容写入到对应项目目录中的_modular.less文件中
for (let i = 0; i < lesslist.length; i++) {
    ws.write('@import "modular/' + lesslist[i] + '";' + '\r\n');
    console.log('成功写入第' + (i + 1) + '条，共：' + lesslist.length + '条');
}

//关闭通道
ws.end();