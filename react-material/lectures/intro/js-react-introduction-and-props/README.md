## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Intro to React.js

---

![react-logo](./images/react-white-logo.png)

---

### What is ReactJS?

First, let's think about where you might see a React.js app. Here are two quick and easy examples:

*   Facebook

    *   Facebook actually built React! It needed web pages that could change quickly based on a user's interaction — your Facebook feed, for example.

*   Instagram
    *   Instagram's public feed and internal system are entirely built on React.

For an intro to React, watch [this video](https://generalassembly.wistia.com/medias/lr8idjxtx8).

The React library was built to solve one problem: building large applications with data that changes over time.

Before React, re-rendering one thing meant re-rendering everything.
This had negative implications on processing power and ultimately user experience, which at times became glitchy and laggy.

React is "agnostic" to other tools in your front end. This means that React can 
co-exist with other Javascript frameworks, letting the other frameworks handle 
the models and controllers and having React sort out the views.

#### Some History

For a quick rundown, React was...

*   First used by Facebook in 2011.
*   Adopted by Instagram in 2012.
*   Made open source in May 2013.

This can be extrapolated to - both Facebook and Instagram are React apps!

To get more hands on and in-depth down the React rabbit hole, let's keep going!

_If you want to get an in-depth taste of what React is all about, [here's an introduction from React.js Conf 2015](https://www.youtube.com/watch?v=KVZ-P-ZI6W4&feature=youtu.be&t=510). We'd recommend starting around the 8:35 mark and watching until 16:30._

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Hello World exercise - You do!

### Preparation

*   Add [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to Chrome

### Learning Objectives

_After this lesson, students will be able to:_

* Build a React app using `codepen`   
* Build a React app using `create-react-app`

## CodePen Setup

An easy way to start using react is via CodePen.  This requires the following configuration: 

- Import react 
- Import react-dom
- Set preprocessor to Babel

## Create-React-Setup Setup

Another way to start React projects is to use a program called `create-react-app`. 
This excellent tool, maintained by the React team, sets up a bare-bones React app.

Let's use `npm` to install it globally so we'll always have it available in our terminal. Run:

```bash
npm install -g create-react-app
```

Once it's installed, create a new directory to store the app you're about to write 
and `cd` to the folder. Then, use the tool to create a new React app. 
You'll have to give your new app a name; we're calling the example app "hello_world", since that'll be our first project.

```sh
create-react-app hello_world
```

The tool creates a new directory for your app, so move into it...

```sh
cd hello_world
```

Use `npm start` to start a server that will serve your new React application:

```bash
npm start
```

You can view the app at `http://localhost:3000`

> You have now set up a Hello World app that you will continue working on during this lesson's exercises!

> Note: If you ever need to stop the server, you can hit `ctrl-c` in the terminal window.

You'll notice the web page automatically refreshes every time we save a file in the directory. 
This is an awesome feature called live reloading. that `create-react-app` comes with. No more hitting refresh!

You can look in the directory and see the structure that `create-react-app` provides for us. It looks like this:

```sh
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    └── logo.svg
```

Most of the important files are in the `src` directory. Specifically, we'll be using `src/App.js` and `src/index.js`.

---

### Stop / Catch Up / Investigate

Take some time and look at what's been generated. Specifically pay attention to `src/App.js` and `src/index.js`

Make small changes to the code in `src/App.js`, `src/index.js`, and `public/index.html` just to see what happens.

Your basic React app is up and running. Now you're ready to add complexity.

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Components and JSX

### Learning Objectives

_After this lesson, students will be able to:_

*   Identify and define React components
*   Describe why we use components in React
*   Build a React component
*   Describe what JSX is transpiled into

### Preparation

*   Have `create-react-app` installed

## Components

The basic unit you'll be working with in ReactJS is a **component**. Components are pieces of our application that we can define once and reuse all over the place.

> **Note!**
>
> For the next day or so, we'll be working with _functional components_. These are lightweight versions of the more robust class-based components we'll see later.
>
> _**Hint:**_ Functional components are functions; regular components are classes.

For an intro to components, watch [this video](https://generalassembly.wistia.com/medias/h64z7lp1ir) (note: right click to open in a new tab!).

If you're used to writing out all of a page's view in a single HTML file, using components is a very different way of approaching web development.

With components, there is more integration and less separation of HTML, CSS, and JavaScript.

*   Instead of creating a few large files, you will organize your web app into small, reusable components that encompass their own content, presentation, and behavior.

When using React, building components will be your main front-end task.

*   Because they're so encapsulated, components make it easy to reuse your code, test, and separate concerns.

### Identifying Components

Take a look at [CraigsList](https://boston.craigslist.org/search/aap) (note: right click to open in a new tab!).

![Components](images/craigslist.png)

Each listing is a component. How can you identify this?

*   Listings look identical in structure, but have different information populating them
*   Listings are dynamically generated based on the user's search

Now, go to [Amtrak.com](https://www.amtrak.com/home) (note: right click to open in a new tab!). We want to look at the listing page, so put in any "From" (for example, New York - Penn Station), any "To" (for example, Boston - South Station), and pick any date. Hit "Find Trains". Now look at the listing page:

![Amtrak](images/amtrak.png)

Scrolling down it, identify the visual "components" the website is comprised of. We suggest drawing this out on paper! So something like this...

![Component diagram](images/wireframe_deconstructed.png)

As you're drawing this out, think about the following questions...

*   Where do you see "nested components;" that is, where are there components inside another component? Where do you see just one "layer" instead?
*   Are there any components that share the same structure?
*   For components that share the same structure, what is different about them?

### So -

What does a component look like? Let's start with a simple "Hello World" example...

### Hello World exercise - You do!

#### Code along: A Very Basic Component

In this section, we'll walk through:

*   Creating a component that displays basic information.

To start, create a new component in `src/Event/index.js`

```js
// bring in React from react
import React, { Component } from "react";

// define our Hello component
class Event extends Component {
  render() {
    // what should the component render?
    // make sure to return some UI
    return (
      <div>
        <h2>Basketball Practice</h2>
        <p>7:45 - 9 pm</p>
      </div>
    );
  }
}

export default Event;
```

and then put it in the JSX of the `<App />` (`src/app.js`) component.

Let's break down the things we see here...

`import React from 'react'`

This imports React methods from the React library.

`class Event extends Component`

This is the component we're creating.

`return()`

Every functional component must return _**one**_ jsx tag. This is what renders the component to the screen, (i.e., it controls what is displayed for this component). From this function, we return what we want to display.

> Note!
>
> That heading tag above looks like it's straight out of HTML, but it's actually a special language called JSX, which you'll see on the next page. For now, know that JSX will act like HTML when it's rendered to the screen.

`export default Event`

This exposes the `Event` class to other files. This means that other files can `import` from the `App.js` file in order to use the `Event` class. In our case, we'll be importing it into `index.js` by calling an `import` to `App.js`.

When we try to import something from `App.js`, JavaScript will attempt to match a named export.

*   Our only named export in `App.js` is `Event`.

The `default` keyword means that if we try to import anything from this file that the app can't find, JavaScript will automatically revert to importing `Event` instead.

*   Only one default export is allowed per file.

### Check it out!

If you switch to your browser and navigate to http://localhost:3000, you can see your event heading. This app dynamically reloads each time you save, so you can check your changes at any point.

### Wait - What's that HTML doing in my Javascript?

Our JavaScript has...HTML in it? What is that? 

Try it yourself:

1.  Go here: [Babeljs.io](https://babeljs.io/repl/)
1.  Click on "try it out"
1.  You should now see a split screen similar to below
1.  Paste in `<h1>Hello World!</h1>` in the left panel.
1.  Write nested JSX elements and see what happens.
1.  You should see the resulting plain javascript on the right.
1.  Try any other HTML you might know and see what happens

![](images/babeljs.png)

So, JSX allows us to write code that strongly resembles HTML. It is eventually compiled to lightweight JavaScript function calls.

> React can be written without JSX. We won't be doing this, but if you want to learn more, [check out this blog post](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/) (note: open in new tab!).

## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) The Virtual DOM

### Learning Objectives

_After this lesson, students will be able to:_

*   [ ] Describe the Virtual DOM versus the standard DOM
*   [ ] Diagram how components are called, assembled and placed on the real DOM
*   [ ] Use .jsx file extentions for files containing JSX

## Virtual DOM Intro

You should be familiar with the DOM. The **Virtual DOM** is a key piece of how React works.

So, how is this different? Watch [this video](https://generalassembly.wistia.com/medias/v5qyqsir0s) to find out.

In React, the virtual DOM is React's representation of the DOM as a plain JavaScript object.

The JSX

```js
<h1>Hello World!</h1>
```

translates into

```js
React.createElement('h1', {}, 'Hello World!');
```

and React's virtual DOM representation of this is

```js
{
  type: 'h1',
  props: {
    children: 'Hello World!'
  }
}
```

Since React keeps this representation of what is on the page, it can be very
smart when it updates the page only to change the DOM that needs to be changed.
More on this later.

## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Props

### Learning Objectives

_After this lesson, students will be able to:_

*   [ ] Describe the role props plays in our applications
*   [ ] Create a component that renders props

### Component Data with Props

The React framework was built to handle data that changes over time.

So far, we have defined a `Event` component. The component returns a `div` with a few elements, written in JSX.

In `App.js`, we are importing this component.

This is great, but it doesn't involve any data yet, let alone data that changes over time!

Let's make it more interesting.

Rather than displaying the hardcoded data, let's change the event data dynamically.

The question is, how do we add a name to our `Event` component without hardcoding it?

Find out! Try it yourself alongside [this video](https://generalassembly.wistia.com/medias/gchiu63slo) in [this codepen](https://codepen.io/susir/pen/vxWypq) _(note: right click both for new tab!)_

### Hello World exercise - You do!

### Code along: Adding props to our component

Let's use **props** to make our "Hello World" app more flexible.

##### First, a single prop

We want to make a greeting that's reusable for many different users, so we'll have a `name` prop for the name of the user.

In your `src/App.js`, we'll change the line that renders the `Event` component to include this `title` prop. The new line will be:

`<Event title="Eric's Birthday Party" />`

> We pass in data wherever we are rendering our component. In rendering the `Event` component above, we pass in a prop called "title" with a value of "Eric's Birthday Party".

Now, every time we render our component, we will pass in data.

If you check your application now, nothing has changed. We're passing the `title` prop into the component, but the component isn't _using_ it yet.

In our component definition, we can use the `this.props.title` variable to access the value passed into the component.

```js
// bring in React from react
import React, { Component } from "react";

// define our Hello component
class Event extends Component {
  render() {
    // what should the component render?
    // make sure to return some UI
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>7:45 - 9 pm</p>
      </div>
    );
  }
}

export default Event;
```

> The `{}` syntax in JSX renders the result of any JavaScript expression inside it. It works even without props. If you wrote `{2+2}` in your JSX, `4` would be rendered.

> Check it out! You should be able to browse to http://localhost:3000 to view this change!

## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Multiple Props

### Learning Objectives

_After this lesson, students will be able to:_

*   [ ] Pass multiple individual props to a component
*   [ ] Pass multiple props as an object to a component

### What about... multiple props?

Of course, we often want components to display more complex information. To do so, we can pass multiple properties to our component! We'll use the same two steps we took to add the first prop.

First, add another prop to the component call: `<Event title="Eric's Birthday Party" />,` changes to `<Hello name="Eric's Birthday Party" time="7:45 - 9pm" />`.

Now, in our component definition we have access to both values. Try updating the component using `this.props.time` in the place we hardcoded the value previously.

> Check it out! You should be able to browse to http://localhost:3000 to view this change!

_[Read more about using props in JSX, if you'd like!](https://facebook.github.io/react/docs/jsx-in-depth.html) This link is also in the Further Reading page at the end of the React module, under the Facebook documentation._
