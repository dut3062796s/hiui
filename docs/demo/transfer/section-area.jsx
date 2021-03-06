import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Transfer from '../../../components/transfer'
const prefix = 'transfer-area'
const desc = '可通过拖拽的形式对目标区域内进行排序'
const code = `import React from 'react'
import Transfer from '@hi-ui/hiui/es/transfer'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      datas: this.randomDatas(),
      targetKeys: [2, 3, 4, 6, 9]
    }
  }
  randomDatas () {
    const arr = []
    for (let i=1;i<16; i++) {
      arr.push({
        id: i,
        content: '选项'+i
      })
    }
    return arr
  }
  onChange (movedKeys) {
    this.setState({
      targetKeys: movedKeys
    })
  }
  render () {
    return (
      <Transfer
        type='multiple'
        showCheckAll
        draggable
        targetKeys={this.state.targetKeys}
        data={this.state.datas}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}`
const DemoArea = () => <DocViewer code={code} scope={{ Transfer }} prefix={prefix} desc={desc} />
export default DemoArea
