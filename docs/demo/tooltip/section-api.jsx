import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Button from '../../../components/button'
import Tooltip from '../../../components/tooltip'
const prefix = 'tooltip-api'
const code = `import React from 'react'
import Button from '@hi-ui/hiui/es/button'
import Tooltip from '@hi-ui/hiui/es/tooltip'
class Demo extends React.Component {
  constructor() {
    super()
    Object.assign(this, {
      state: {
        showTooltip: false,
      },
      closure: undefined,
      toggleTooltip: () => {
        !this.state.showTooltip ?
          Tooltip.open(this.node, { title: 'Click again to hide me.',  placement: 'right', key:123}) :
          Tooltip.close(123)
        this.setState(({ showTooltip }) => ({
          showTooltip: !showTooltip
        }))
      }
    })
  }

  render() {
    return (
      <div>
        <Button type="line" onClick={this.toggleTooltip}>{this.state.showTooltip ? 'Hide' : 'Show'} tooltip</Button>
        <br/>
        <span ref={node => this.node = node} style={{marginTop:'10px',display:'inline-block'}}>
          <Button disabled>Show tooltip on me</Button>
        </span>
      </div>
    )
  }
}`

const DemoApi = () => (
  <DocViewer code={code} scope={{ Button, Tooltip }} prefix={prefix} />
)
export default DemoApi
