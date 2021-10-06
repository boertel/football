import { Component } from "react";
import { isEqual, mapValues, get } from "lodash";

export const createProxify = (mapping) => {
  return (obj) => {
    const proxified = mapValues(mapping, (dest, src) => {
      let id = get(obj, src);
      if (typeof id === "object" && id !== null) {
        id = id.id;
      }
      return {
        id,
        _type: dest,
      };
    });
    return {
      ...obj,
      ...proxified,
    };
  };
};

export const proxy = (obj, state, exclude = []) => {
  const handler = {
    get: (target, key) => {
      const value = target[key];
      if (value !== null && typeof value === "object") {
        const child = get(state, [value._type, value.id]);
        if (child) {
          if (exclude.indexOf(key) === -1) {
            return proxy(child, state);
          } else {
            return child;
          }
        }
        return {};
      }
      return value;
    },
  };
  return new Proxy(obj, handler);
};

export class ProxyComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let equality = false;
    for (let key in nextProps) {
      const prop = nextProps[key];
      if (typeof prop === "object" && prop !== null) {
        equality = isEqual(this.props[key], prop);
      } else {
        equality = this.props[key] === nextProps[key];
      }
    }
    if (!isEqual(this.state, nextState)) {
      equality = false;
    }
    return !equality;
  }
}

export const getStatus = (score_a, score_b, bet) => {
  if (score_a !== null && score_b !== null) {
    if (score_a === bet.score_a && score_b === bet.score_b) {
      return "perfect";
    }
    if (
      (score_a > score_b && bet.score_a > bet.score_b) ||
      (score_a === score_b && bet.score_a === bet.score_b) ||
      (score_a < score_b && bet.score_a < bet.score_b)
    ) {
      return "win";
    }
    return "loss";
  }
  return "unknow";
};
