#查找所在模板目录下(modular目录中)，所引入的.html模块在uikit的custom/modular目录中有没有对应同名的.less文件。

#如果有则把这个.less文件写入到custom/项目模板目录名/_modular.less当中。

#这样在前端uikit前端文件构建时只需引入一个入口文件_modular.less，即可有针对的引入相应的.less代码了。