# React, State, and Lifecycle Methods

### Prerequisites

Students should be familiar with:

- React and React components
- Props and unidirectional data flow
- The immutability of props

### Learning Objectives

- Review React state
- Describe the React component lifecycle
- Explain the most important lifecycle methods
- Implement a react component that fetches some data from the web
- Discuss React events

# React State

- **Props** are properties that one component passes to one of its child components. They only go in one direction, and they are _immutable_.
- **State** allows us to add dynamic content to our components. Components can have local state that we can **set**. Every time a component's state changes, the component will re-render.

> Note: scaffold the `App.js` first, pass props to Quotes List and Quote from it.

We declare state in our constructor, like this:

```js
import React, { Component } from 'react';
import QuotesList from './QuotesList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bgColor: '#ffffff',
    };

  render() {
    console.log('App rendering');
    return (
      <div>
        <QuotesList
          hello="Hello, Quotes!"
          bgColor={this.state.bgColor}
          />
      </div>
    )
  }
}

export default App;
```

We update `state` with the built-in method `setState`. So, if we wanted to update the background color of our `App` component, we would say:


```js
    this.setState({
      bgColor: color,
    })
```

Let's add this to a function and pass it as props to the QuotesList component.

```js
import React, { Component } from 'react';
import QuotesList from './QuotesList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bgColor: '#ffffff'
    };
    /* don't forget to bind out new method to the constructor */
    this.changeBgColor = this.changeBgColor.bind(this);
  }

  changeBgColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    /* get random hex color */
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    /*finally, set state */
    this.setState({
      bgColor: color,
    })
  }

  render() {
    console.log('APP rendering', this.state);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> Welcome to Dresselhaus Quotes </h2>
        </div>
        <QuotesList
            hello="Hello, Quotes!"
            bgColor={this.state.bgColor}
            />
      </div>
    );
  }
}
```

(Note that we have to use `bind` to preserve the context of `this`.)

#### SIDEBAR: React Events

Take a look at the docs to see a list of all of the events React has access to. You basically have access to all of the same events that the browser DOM gives you. Under the hood, React is taking care of all the `addEventListener()` stuff. We're using `onClick` in this example.

Here is some reading about the handling events in react:
* [react-docs-events](https://facebook.github.io/react/docs/handling-events.html)
* [react-events-blog](https://appendto.com/2017/01/react-events-101/)


### VERY IMPORTANT: How *NOT* to update `state`

Never, ever, ever, _ever_ update `state` by saying something like:

```js
/*  🚨🚨🚨🚨 DO NOT DO THIS!!!!!!! 🚨🚨🚨🚨🚨🚨🚨 */
this.state.bgColor = 'black';
```

![boromir](./assets/updating-state.jpg)

Instead, you **MUST USE** the `setState` method, like we did above.

```js
this.setState({ bgColor: 'purple' });
```

<details>
<summary>What if you have a state property being an *array* in that you need to push to? </summary>
If we want to add items to an array in our state, we CAN'T use `push`, since `push` mutates the original array. Instead, we need to use `concat`, which returns a new array with the new value on the end. Like so:

```js
concatToStateColors() {
  this.setState({
    bgColors: this.state.bgColors.concat('purple');
  })
}
```
</details>



Note that we also **ABSOLUTELY CANNOT** set a new variable equal to `this.state` and then mutate that object.

```jsx
/*  🚨🚨🚨🚨 DO NOT DO THIS!!!!!!! 🚨🚨🚨🚨🚨🚨🚨 */
const newState = this.state;
newState.bgColors = ['red','pink', 'blue'];
this.setState(newState);
```

This is because JavaScript doesn't make _copies_ of objects, it makes _references to_ the original object. This is called "passing by reference".

![pass by reference](./assets/passbyreference.gif).

The other way we can update `state` is by passing `setState` a callback function rather than an object. Doing this can be helpful if you're running into bugs, since it explicitly references the _previous_ version of the state.

```jsx
concatToStateColors() {
  this.setState(prevState => {
    return {
      bgColors: prevState.bgColors.concat('purple');  
    }
  })
}
```

# React Component Lifecycle

### Docs:
* [React Docs](https://facebook.github.io/react/docs/react-component.html)
* [Great Blog](http://busypeoples.github.io/post/react-component-lifecycle/)

![lifecycle Methods](./assets/lifecycle.png)

Lifecycle methods describe the timeline of a React component's existence. They allow us to do things based on how the page loads. Let's add a lifecycle method to our colorful quotes app:

Let's add a few more lifecycle methods:

```js
  /* triggered before rendering, but will be overwritten by "didMount" */
  componentWillMount() {
    console.log('App will mount');
    this.setState({
      bgColor: 'red',
    })
  }
  /*
  is rendered last right before rendering
  hence we should do last state manipulations here
  */
  componentDidMount() {
    console.log('App did mount');
    this.setState({
      bgColor: '#f3d8de',
    })
  }
  /* is triggered right after the state change */
  componentWillUpdate() {
    console.log('APP will update');
  }
  /*
  triggered right after rendering
  use case: posting to database after the form submission

  */
  componentDidUpdate() {
    console.log('APP did update');
  }
```

Let's inspect Chrome Dev Tools and se what's what!
Now when we run our app, we can see at what point each lifecycle method is fired. As you can see `componentDidMount` surely fires last!

#### NOTE: In your react classes, the constructor should appear up top, followed by lifecycle methods, then your own methods, then the render method. This is a best practice.



### Fetching data within a React component

If you need to fetch data when the component loads, you'd do it in the `componentDidMount` lifecycle method. This ensures that the component loads quickly, without waiting for data -- for example, if the request loads slowly.

Let's add an API call to our quotes app:
> Note: make sure to set initial state in the App.js first

In `App.js`:

```js
  componentDidMount() {
    console.log('APP did mount');
    axios('https://dresselhaus-quotes-api.herokuapp.com/api/quotes')
      .then(res => {
        this.setState({
          apiData: res.data.quotesData,
          apiDataLoaded: true,
        })
      })
  }
```

Then we can use that data in the component's render method.

#### Done!
Now we need to pass down the props to the smallest component, Quote, to be rendered there:

```js
  render() {
    console.log('APP rendering', this.state);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> Welcome to Dresselhaus Quotes </h2>
        </div>
        <QuotesList
            hello="Hello, Quotes!"
            data={this.state.apiData}
            bgColor={this.state.bgColor}
          />

      </div>
    );
  }
}
```

Then pass the props down from the **QuotesList** to the `Quote.js`:

```js
  render() {
    console.log('QL rendering', this.props.data);
    return (
      <div style={{ backgroundColor: this.props.bgColor }}> {this.props.hello}, {this.props.bgColor} color!
        <button onClick={this.changeBgColor}>  Change Color !</button>
       {this.props.data.map(quote => {
         return
         <Quote
            quote={quote} key={quote.id}
            bgColor={this.props.bgColor} />
       })}
      </div>
    )
  }
```

Finally, render the Quote:
```js
class Quote extends Component {

  render() {
    console.log('Q rendering');
    return (
      <div>
        <h2>{this.props.quote.content} </h2>
      </div>
    )
  }
}
export default Quote;
```

Oh, look our `Quote` component is being rendered every time the color changes. As it does not change anything related to quote, we don't want this component to render.
Let's add some `componentShouldUpdate` lifecycle method to the `Quote.js`. See what happens.

```js
  shouldComponentUpdate(nextProps, nextState) {
    /*
    will check 23 times, but NOT render 23 times
     add later, to demonstrate the lifecycle
     */
    console.log('Q should update');
    return nextProps.quote.content !== this.props.quote.content;
  }

```

### 🚀 LAB: giphy-react

# Recap!

![state](./assets/state.jpg)

- `state` is an object that React watches to decide when to rerun the `render` method.
- Every time `state` changes, unless we specifically tell it not to, the component will re-render.
- We change `state` by using the `setState` method that React provides us.
- The page does not refresh when `state` changes.

![lifecycle](./assets/component-lifecycle.png)

- Lifecycle methods describe the flow of a react component's existence.
- Sometimes we can call `setState` within lifecycle methods and not trigger a re-render. This occurs during cycles where the `render` method is already present within the cycle, such as `componentDidUpdate` and `componentWillReceiveProps`.
- If we want data to initially be present when our app loads, we should make that call within `componentDidMount`
