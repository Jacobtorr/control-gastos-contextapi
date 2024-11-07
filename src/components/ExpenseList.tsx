// Hooks
import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
// Components
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
    
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-3">
        {isEmpty ? <p className="text-gray-600 text-2xl text-center">No hay gastos</p> : (

            <>
                <p className="text-gray-600 text-2xl px-5 font-bold my-3.5">
                    Listado de Gastos
                </p>

                {filteredExpenses.map(expense => (
                    <ExpenseDetail 
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            
            </>
        )}
    </div>
  )
}
