const ora = require('ora')
const { getRepoList } = require('./https')
const path = require("path")
const inquirer = require('inquirer')




const util = require('util')
const exec = util.promisify(require('child_process').exec);
let timer = ""
class Generator {
  constructor(name, targetDir) {
    // 文件夹名称
    this.name = name

    // 位置
    this.targetDir = targetDir
  }
  async download() {
    // 拼接链接
    // const requestUrl = `direct:https://github.com/Weibienaole/zzy-react-project_webpack4/archive/refs/heads/main.zip`
    const requestUrl = `direct:https://github.com/Leexiaop/fe-react-h5-template#main`

    // 2min 之后弹出，显示超时
    timer = setTimeout(() => {
      clearTimeout(timer)
      throw ('模版下载超时，请重试！')
    }, 1000 * 60 * 2);
    // 调用下载方法，进行远程下载
    await wrapLoading(
      this.downloadGitRepo,
      '正在下载目标模版中...',
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    )
  }

  async create() {
    // 1）异步获取模板名称
    // const repo = await this.getRepo()
    // await this.download()
    await exec('git clone https://github.com/Leexiaop/fe-react-h5-template my-app')
    // console.log(repo);
    // clearTimeout(timer)
  }
  /*
  获取用户选择的模版
    1.远程拉取模版数据
    2.用户选择所要下载的模版名称
    3.return用户选择的名称
  */

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, '获取目标模版中...')
  	// 空则终止执行
    if (!repoList) return

    // 筛选指定项目，只要目标模版系列
    const repos = repoList.filter(item => item.name.indexOf('zzy-react-project') !== -1)

    // 2）用户选择需要下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos.map(item => item.description),
      message: '请选择一个模版进行创建'
    })

    // 3. return用户选择
    const selectRepos = repos.filter(item => item.description === repo)[0]
    return { name: selectRepos.name, branch: selectRepos.default_branch }
  }
}

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // ora初始化，传入提示 message
  const spinner = ora(message)
  // 开始
  spinner.start()
  try {
    // 执行fn
    const result = await fn(...args)
    // 成功
    spinner.succeed()
    return result
  } catch {
    // 失败
    spinner.fail('请求失败，请重试...')
    return null
  }
}

module.exports = Generator