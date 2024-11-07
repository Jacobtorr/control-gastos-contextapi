import { useReducer, useMemo, createContext, Dispatch, ReactNode } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

// Type para el state y Dispatch
type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

// Type para el children
type BudgetProviderProps = {
    children: ReactNode
}

// Crear Context
export const BudgetContext = createContext<BudgetContextProps>(null!);

// Funcion del Provider
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [ state, dispatch ] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
      <BudgetContext.Provider
        value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget
        }}
      >
        {children}
      </BudgetContext.Provider>
    )
}