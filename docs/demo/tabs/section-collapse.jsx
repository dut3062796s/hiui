import Tabs from '../../../components/tabs'
import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
const prefix = 'tabs-collapse'
const desc = '标签数量增多时的边界处理'

const code = `import Tabs from '@hi-ui/hiui/es/tabs'
import React from 'react'\n
class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      panes: [{
        tabTitle: '我的订单',
        tabId: 'tabId-1'
      },
      {
        tabTitle: '团购订单',
        tabId: 'tabId-2',
        closeable: false
      },
      {
        tabTitle: '以旧换新订单',
        tabId: 'tabId-3'
      },
      {
        tabTitle: <span>消息通知</span>,
        tabId: 'tabId-4'
      },
      {
        tabTitle: '购买资格',
        tabId: 'tabId-5'
      },
      {
        tabTitle: '团购通知',
        tabId: 'tabId-6'
      },
      {
        tabTitle: '订单详情',
        tabId: 'tabId-7'
      },
      {
        tabTitle: '订单详情',
        tabId: 'tabId-8'
      },
      {
        tabTitle: '订单详情',
        tabId: 'tabId-9'
      },
      {
        tabTitle: '订单详情',
        tabId: 'tabId-10'
      }]
    }
  }
  render () {
    return (
      <Tabs onTabClick={(tab,e)=>console.log(tab)}>
        {
          this.state.panes.map((pane, index) => {
            return (
              <Tabs.Pane
                tabTitle={pane.tabTitle}
                tabId={pane.tabId}
                closeable={pane.closeable}
                key={index}
              >
                <div style={{padding: '16px'}}>{pane.tabTitle}</div>
              </Tabs.Pane>
            )
          })
        }
      </Tabs>
    )
  }
}`

const Demo = () => (
  <DocViewer code={code} scope={{ Tabs }} desc={desc} prefix={prefix} />
)
export default Demo
