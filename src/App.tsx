// Hooks
import { useEffect, useMemo } from "react"
import { useBudget } from "./hooks/useBudget"
// Components
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  const { state } = useBudget()

  // Validar que hay algo en el presupuesto para mostrar condicionalmente un componente u otro
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expense', JSON.stringify(state.expenses))
  }, [state]);

  return (
    <>
     <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="upeprcase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
     </header>

     <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm />}
     </div>

    {isValidBudget && (
      <main className="max-w-3xl mx-auto py-10">
        <FilterByCategory />

        <ExpenseList />

        <ExpenseModal />
      </main>
    )}
    </>
  )
}

export default App
