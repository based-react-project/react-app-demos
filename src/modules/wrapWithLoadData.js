import React, { Component } from 'react'

/* export default (WrappedComponent) => { // 返回自身组件
  class newComponent extends Component {
    render() {
      return (
        <WrappedComponent/>
      );
    }
  }
  return newComponent;
} */

// export default (WrappedComponent, name) => {
//   class newComponent extends Component {
//     constructor() {
//       super()
//       this.state = {
//         data: null
//       }
//     }
//     componentWillMount() {
//       let data = localStorage.getItem(name)
//       this.setState({data: data})
//     }
//     render() {
//       return (
//         <WrappedComponent data={this.state.data}/>
//       );
//     }
//   }
//   return newComponent;
// }

export default (WrappedComponent, name) => {
  class LocalStorageActions extends Component {
    constructor() {
      super()
      this.state = {
        data: null
      }
    }
    componentWillMount() {
      let data = localStorage.getItem(name)
      try { // 数据解析为JSON对象
        this.setState({data: JSON.parse(data)})
      } catch (e) { // 出错，作为普通字符串保存
        this.setState({data: data})
      }
    }
    saveData (data) {
      try { // 数据解析为JSON对象
        localStorage.setItem(name, JSON.stringify(data))
      } catch (e) { // 出错，作为普通字符串保存
        localStorage.setItem(name, `${data}`)
      }
    }
    render() {
      return (
        <WrappedComponent data={this.state.data} saveData={this.saveData.bind(this)} {...this.props}/> 
        // 这里的意思是把其他的参数原封不动地传递给被包装的组件
      );
    }
  }
  return LocalStorageActions;
}