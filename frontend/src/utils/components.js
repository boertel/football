import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";

import Loading from "../ui/Loading";

export const withAsync = (async, options) => {
  options = {
    loader: Loading,
    ...options,
  };

  return (WrappedComponent) => {
    return class WithAsyncComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: !!props.load,
        };
      }

      done = () => {
        this.setState({ loading: false });
      };

      load = (props, refresh) => {
        if (!props.load) {
          return;
        }

        if (props.refresh === false) {
          this.done();
          return;
        }

        this.setState({ loading: true });
        return async(props)
          .then(this.done)
          .catch((error) => {
            this.done();
            this.setState({
              error,
            });
          });
      };

      componentDidMount() {
        //console.log(WrappedComponent.name, this.props);
        this.load(this.props);
      }

      componentWillReceiveProps(nextProps) {
        // TODO when should I re-load the data? refresh changed?
        //this.load(nextProps);
      }

      render() {
        const { loading } = this.state;

        if (loading && options.loader) {
          return React.createElement(options.loader);
        }

        return <WrappedComponent {...this.props} />;
      }
    };
  };
};

export const asyncConnect = (mapStateToProps, mapDispatchToProps, options) => {
  if (typeof mapDispatchToProps === "object" && mapDispatchToProps !== null) {
    if (Array.isArray(mapDispatchToProps.load)) {
      const loads = mapDispatchToProps.load;

      mapDispatchToProps = (dispatch) => {
        const load = (props) => {
          const promises = loads.map((action) => dispatch(action(props)));
          return Promise.all(promises);
        };
        return {
          load,
        };
      };
    }
  }
  return (WrappedComponent) => {
    return compose(
      connect(mapStateToProps, mapDispatchToProps),
      withAsync((props) => props.load(props), options)
    )(WrappedComponent);
  };
};

export function Loader({ load, children }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const promises = Object.values(load).map((l) => l());
    Promise.all(promises).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return children;
}

export function withParams(WrappedComponent) {
  return function WithParamsComponent(props) {
    const params = useParams();
    const competitions = useSelector(({ competition }) => competition);
    const competition = Object.values(competitions).find(
      ({ slug }) => slug === params.competition
    );
    return (
      <WrappedComponent
        params={params}
        competitionId={competition?.id}
        {...props}
      />
    );
  };
}
