const { createStore } = require("redux");

//action constants
//管理 types
const ActionTypes = {
    ADD_TODO:'add_todo',
    DELETE_TODO:'delete_todo'
}
let todoId = 0;

const initialState = {
  email: "12345",
  todos: [],
};

// 創建 Reducer
function counterReducer(state = initialState, action) {
  console.log(`action type`, action.type);

  // 當 type 很多的時候並不適合使用 if...else
  // 用 switch loop 會比較好
  switch (action.type) {
    case ActionTypes.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, { id: todoId++, name: action.payload.name }],
      };
    }

    case ActionTypes.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        }),
      };
    }
    default: {
      return state;
    }
  }

  //   if (action.type === "plus") {
  //     return {
  //       ...state,
  //       value: state.value + 1,
  //     };
  //   } else if (action.type === "minus") {
  //     return {
  //       ...state,
  //       value: state.value - 1,
  //     };
  //   }
}
let store = createStore(counterReducer);

// 當 store 有改變就觸發
// 執行順序 dispatch -> Reducer -> 回傳更新後的 state 給 store
store.subscribe(() => {
  console.log("changed", store.getState());
});

// action creator
// ! 改良寫法
function addTodo(name){
    return {
      type: ActionTypes.ADD_TODO,
      payload: {
        name: "todo0",
      },
    };
}

function deleteTodo(id) {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: {
      id,
    },
  };
}
// ! 原本寫法
// store.dispatch({
//   type: ActionTypes.ADD_TODO,
//   payload: {
//     name: "todo0",
//   },
// });
// ! 改良寫法
store.dispatch(addTodo("todo0"))
store.dispatch(addTodo("todo1"))

// ! deleteTodo 原本寫法
// store.dispatch({
//   type: ActionTypes.DELETE_TODO,
//   payload: {
//     id: 0,
//   },
// });

// ! deleteTodo 改良寫法

store.dispatch(deleteTodo(0))
// // 創建 store
// let store = createStore(counterReducer);

// console.log("first state", store.getState());

// store.dispatch({
//   type: "plus",
// });

// store.dispatch({
//   type: "plus",
// });

// // 呼叫 getState() 可以顯示現在的 state
// console.log("second state", store.getState());

// store.dispatch({
//   type: "minus",
// });

// console.log("third state", store.getState());
