import { createContext, useContext, useEffect, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
  loading: false,
  error: null,
};

const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "Add_Expense":
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "Delete_Expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id,
        ),
      };

    case "Update_Expense":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense,
        ),
      };

    case "Set_Expenses":
      return {
        ...state,
        expenses: action.payload,
      };

    case "Set_Loading":
      return {
        ...state,
        loading: action.payload,
      };

    case "Set_Error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, initialState);

  // save expenses to local storage whenever it changes

  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    } catch (error) {
      console.log("Failed to save expenses in local storage", error);
      dispatch({ type: "Set_Error", payload: error });
    }
  }, [state.expenses]);

  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
      };

      dispatch({ type: "Add_Expense", payload: newExpense });
    },

    deleteExpense: (id) => {
      dispatch({ type: "Delete_Expense", payload: { id } });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>
      {" "}
      {children}{" "}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (context === undefined) {
    throw new Error("useExpenses must be within  an ExpenseProvider");
  }

  return context;
};
