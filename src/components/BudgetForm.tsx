import { useMemo, useState, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget";

function BudgetForm() {

    const { dispatch } = useBudget()

    const [ budget, setBudget ] = useState(0);

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        setBudget(e.target.valueAsNumber);
    }

    const isValid = useMemo (() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch({type: 'add-budget', payload: {budget}})
    }

  return (
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                DefinirPresupuesto
            </label>


            <input 
                type="number" 
                name="budget" 
                id="budget" 
                className="w-full bg-white border border-gray-200 p-2 rounded-2xl"
                placeholder="Define tu Presupuesto"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            value="Definir Presupuesto" 
            className="bg-blue-600 text-white font-black uppercase p-2 w-full rounded-lg hover:bg-blue-800 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-default disabled:hover:bg-blue-600"
            disabled={isValid}
        />
    
    </form>
  )
}

export default BudgetForm