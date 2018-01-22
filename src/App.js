import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component {
  /*render() {
    const usersElement = []
    for (let user of users) {
      usersElement.push(
        <p>
          <span>姓名：{user.username}</span>
          <span>年龄：{user.age}</span>
          <span>性别：{user.gender}</span>
          <hr/>
        </p>
        )
    }
    return (
      <div>{usersElement}</div>
    )*/
  render () {
    return (
      <div>
      {users.map((user) => {
        return (
          <p>
            <span>姓名：{user.username}</span>
            <span>年龄：{user.age}</span>
            <span>性别：{user.gender}</span>
            <hr/>
          </p>
          )
      })}
      </div>
      )
  }
}
class LikeButton extends Component {
  constructor () {
    super()
    this.state = {
      isLiked: false,
      count: 0
    }
  }
  handleClick() {
    // React.js 的 setState 把你的传进来的状态缓存起来，稍后才会帮你更新到 state 上
    this.setState({isLiked: !this.state.isLiked})
    // 你想在 setState 之后使用新的 state 来做后续运算
    this.setState((prevState) => {
      return {count: prevState.count + 1}
    })
    if(this.props.onClick) {
      this.props.onClick()
    }
  }
  render() {
    const likedText = this.props.likedText || '取消'
    const unlikedText = this.props.unlikedText || '点赞'
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>
        {this.state.isLiked ? likedText : unlikedText} 点击次数：{this.state.count}
        </button>
      </div>
      )
  }
}
class Title extends Component{
  handleClickOnTitle(word, e) {
    console.log(this, word)
    console.log(e.target.innerHTML)
  }
  render() {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, 'word')}>React小书</h1>
    )
  }
}
class Header extends Component{
  render() {
    const isGood = true
    return (
      <header className="App-header">
        <Title/>
        <img src={logo} className="App-logo" alt="logo" />
        <h6 className="App-title">Hello React {isGood ? <strong>is good</strong> : <strong>is not good</strong>}</h6>
      </header>
    )
  }
}
class Main extends Component{
  render() {
    return (
      <div>
        <h2>This is main content.</h2>
        <LikeButton likedText='已赞' unlikedText='赞' onClick={()=>console.log('clickLike button')}/>
        <User/>
      </div>
    )
  }
}
class Footer extends Component{
  render() {
    return (
      <h2>This is Footer.</h2>
    )
  }
}
class App extends Component {
  render() {
    const isGood = true
    return (
      <div className="App">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
