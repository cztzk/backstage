// 文件路径 @/echarts/index.js 自行配置

// 加载echarts，注意引入文件的路径
// 旧版本写法
// import echarts from 'echarts/lib/echarts'
// 新版本写法
import echarts from 'echarts'
// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default echarts