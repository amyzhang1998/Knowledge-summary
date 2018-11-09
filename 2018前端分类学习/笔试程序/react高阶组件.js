// 什么是 HOC，你能用它做什么，它有哪些局限，如何实现它。
// Props Proxy： HOC 对传给 WrappedComponent W 的 porps 进行操作，
// Inheritance Inversion： HOC 继承 WrappedComponent W。

// props Proxy
// 使用 Props Proxy 可以做什么？

// 操作 props
// 通过 Refs 访问到组件实例
// 提取 state
// 用其他元素包裹 WrappedComponent

function ppHoc(wrappComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = { user: currentObser };
      return <wrappComponent {...this.props} {...newProps} />;
    }
  };
}
// Inheritance Inversion 允许 HOC 通过 this 访问到 WrappedComponent，意味着它可以访问到 state、props、组件生命周期方法和 render 方法。
// 这很重要，意味着 Inheritance Inversion 的高阶组件不一定会解析完整子树
// 渲染劫持（Render Highjacking）
// 操作 state

function iiHoc(wrappComponet){https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
    return class Enhance extends wrappComponet{
        render(){
            return super.render();
        }
    }
}

@ppHoc
class A extends Component {}

export default ppHoc(A)


// 1,高阶组件由于可嵌套，如果有一环高阶组件没有将内部 wrappedComponent 暴露出来，会导致后续叠加的高阶组件都无法获取、注入到原始组件。

// 2,另外就算所有高阶组件都遵循了规范，组件也难以察觉被注入的数据是由哪些高阶组件提供的，而且高阶组件之间互相隔离，导致可能存在覆盖 props 的危险情况，这些问题高阶组件都束手无策。这体现出约定比约束更加效率，但约定的可维护性低于约束

import React, { Component } from "react";
import PropTypes from "prop-types";
class Caffeinate extends Component {
  propTypes = {
    children: PropTypes.func.isRequired
  };
  state = {
    coffee: "Amerivan"
  };
  render() {
    return this.props.children(this.state.coffee);
  }
}

render(
  <Caffeinate>
    {params => {
      <div>dddd</div>;
    }}
  </Caffeinate>
);

<Caffeinate ref={(ref) => {this.xxref = ref;}} />

///

class FancyButton extends React.Component {
    focus() {
      // ...
    }
  
    // ...
  }
  
  // Rather than exporting FancyButton, we export LogProps.
  // It will render a FancyButton though.
  export default logProps(FancyButton);
  
const ref = React.createRef();

// The FancyButton component we imported is the LogProps HOC.
// Even though the rendered output will be the same,
// Our ref will point to LogProps instead of the inner FancyButton component!
// This means we can't call e.g. ref.current.focus()
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;


function logProps(Component) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
        const {forwardedRef, ...rest} = this.props;
  
        // Assign the custom prop "forwardedRef" as a ref
        return <Component ref={forwardedRef} {...rest} />;
      }
    }
  
    // Note the second param "ref" provided by React.forwardRef.
    // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
    // And it can then be attached to the Component.
    function forwardRef(props, ref) {
      return <LogProps {...props} forwardedRef={ref} />;
    }
  
    // These next lines are not necessary,
    // But they do give the component a better display name in DevTools,
    // e.g. "ForwardRef(logProps(MyComponent))"
    const name = Component.displayName || Component.name;
    forwardRef.displayName = `logProps(${name})`;
  
    return React.forwardRef(forwardRef);
  }
