import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Rate from '../../../components/rate'
import smile1Png from '../../../site/static/img/docs/logo-1@2x.png'
import smile2Png from '../../../site/static/img/docs/logo-2@2x.png'
import smile3Png from '../../../site/static/img/docs/logo-3@2x.png'
import smile4Png from '../../../site/static/img/docs/logo-4@2x.png'
import smile5Png from '../../../site/static/img/docs/logo-5@2x.png'
const desc = '可以使用 renderCharacter()=>ReactNode 自定义渲染。'
const prefix = 'rate-advanced'
const code = `import React from 'react'
import Rate from '@hi-ui/hiui/es/rate'\n

class Demo extends React.Component {

  constructor() {
    super() 
  }

  renderCharacter (value, index) {
    const Emojis = [
      smile1Png,
      smile2Png,
      smile3Png,
      smile4Png,
      smile5Png
    ]
  
    return <img src={Emojis[Math.ceil(value)-1]} style={{width:24,height:24}}/>
   }

  render() {
    return (
      <Rate count={5}  defaultValue={1} renderCharacter={this.renderCharacter} />  
    )
  }
}

`
const DemoAdvanced = () => (
  <DocViewer
    code={code}
    scope={{
      Rate,
      smile1Png,
      smile2Png,
      smile3Png,
      smile4Png,
      smile5Png
    }}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoAdvanced
