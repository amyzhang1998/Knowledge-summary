function createConnect() {
  return function connect(mapStateToProps, mapDispatchToProps) {
    return connectHoc(factory, {
      mapStateToProps,
      mapStateToProps
    });
  };
}

function connectHoc(factory, {}) {
  return function wrapWithConnect(element) {
    class Connect extends Component {
      constructor(props, context) {
        this.initSelector();
        this.initSubscriber();
      }
      //处理了ref
      addProps() {
        return {};
      }
      initSelector() {
        this.selector = {
          run: function(props) {
            // 不想等就等新;
          },
          props: props
        };
      }
      initSubscriber() {
        subscription.onStateChange = function() {
          // ...
          this.selector.run();
        };
      }
      componentDidMount() {
        //订阅store
        this.selector.run(this.props);
      }
      componentWillReceiveProps() {
        //监听store 里面的数据变化
        this.selector.run(this.nextPprops);
      }

      render() {
        const selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return createElement(
            WrappedComponent,
            this.addExtraProps(selector.props)
          );
        }
        return createElement(elemtn, this.addProps());
      }
    }
  };
}

connect(
  mapstate,
  mapProps
)(reactLink);
