import { Store } from "@tanstack/store";

export const ACTION_TYPE = {
  EXPLORER: "EXPLORER",
};

// You can use @tanstack/store outside of React components too!
export const store = new Store({
  [ACTION_TYPE.EXPLORER]: [],
});

// This will only re-render when `state[type]` changes. If an unrelated store property changes, it won't re-render

export const updateState = (type: string, action?: any) => {
  store.setState((state: any) => {
    switch (type) {
      case ACTION_TYPE.EXPLORER:
        return {
          ...state,
          [type]: action,
        };
    }
  });
};
