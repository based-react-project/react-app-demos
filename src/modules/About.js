import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/about.css';

// import wrapWithLoadData from './wrapWithLoadData'; // 可复用 高阶组件【法一：外部引用】

class TimeNow extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  constructor() {
    super()
    this.state = {
      date: new Date()
    }
  }
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({date: new Date()}) // setState只能在正在挂载、已经挂载的组件上调用，clock隐藏,没有清除定时器会报错。
    }, 1000)
  } 
  render() {
    return (
      <div>
        <h4>
          <p style={{color: this.context.themeColor}}>现在的时间是：{this.state.date.toLocaleTimeString()}</p>
        </h4>
      </div>
    );
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
}
class DomHandle extends Component {
  componentDidMount() {
    this.input.focus()
  }
  render() {
    return (
      <input type="text" ref={(input)=> this.input = input}/> // ref属性：获取已经挂载的元素的 DOM 节点
    );
  }
}
class Card extends Component {
  render() {
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>React.js小书</h1>'
    }
  }
  render() {
    return (
      <div className='editor-wrapper' dangerouslySetInnerHTML={{__html: this.state.content}}/> // 设置innerHTML可能会导致跨站攻击，避免滥用
    );
  }
}
class Main extends Component{
  static childContextTypes = {
    themeColor: PropTypes.string
  }
  constructor() {
    super()
    this.state = {
      showClockBtn: true,
      color: '',
      themeColor: 'red'
    }
  }
  getChildContext() {
    return {themeColor: this.state.themeColor}
  }
  componentWillMount() {
    this.setState({color: 'blue'})
    this.setState({themeColor: 'orange'})
  }
  handleClock() {
    this.setState({showClockBtn: !this.state.showClockBtn})
  }
  render() {
    return (
      <div className='main'>
        <h2>组件生命周期/React.js的context</h2>
        <button onClick={this.handleClock.bind(this)}>切换显示、隐藏Clock时间</button>
        {this.state.showClockBtn ? <TimeNow/> : null}
        <h2>DOM操作和ref属性</h2>
        <DomHandle/>
        <h2>props.children和容器类组件</h2>
        <Card>
          <h4 style={{fontSize: '20px', color: this.state.color}}>React.js 小书</h4>
          <div>开源、免费、专业、简单</div>
          订阅：<input />
        </Card>
        <h2>dangerouslySetHTML设置动态HTML结构</h2>
        <Editor/>
        <h2>PropType和组件参数验证</h2>
      </div>
    )
  }
}

/* 高阶组件使用 - begin 【法二：内部引用】 */
function wrapWithAjaxData (WrappedComponent, name) {
  class newComponent extends Component {
    constructor() {
      super()
      this.state = {
        data: null
      }
    }
    componentWillMount() {
      let data = localStorage.getItem(name)
      this.setState({
        data: data
      })
      // ajax.get('/data/' + name, (data) => {
      //   var data = 'Tom'
      //   this.setState({data})
      // })
    }
    render() {
      return (
        <WrappedComponent data={this.state.data}/>
      );
    }
  }
  return newComponent;
}
class InputWithUserName extends Component {
  render() {
    return (
      <input value={this.props.data} readOnly/>
    );
  }
}
InputWithUserName = wrapWithAjaxData (InputWithUserName, 'username') // 传入参数【组件 InputWithUserName】：子组件，返回新组建。
class TextareaWithContent extends Component {
  state = {  }
  render() {
    return (
      <textarea value={this.props.data} readOnly/>
    );
  }
}
TextareaWithContent = wrapWithAjaxData (TextareaWithContent, 'username') // 传入参数【组件 InputWithUserName】：子组件，返回新组建。
/* 高阶组件使用 - end */

class Advanced extends Component {
  render() {
    return (
      <div className='advanced'>
        <h2>高阶组件：组件之间代码复用</h2>
        <InputWithUserName/>
        <hr/>
        <TextareaWithContent/>
      </div>
    );
  }
}

class About extends Component {
  state = {  }
  render() {
    return (
      <div className="About">
        <Main/>
        <Advanced/>
      </div>
    );
  }
}

export default About;