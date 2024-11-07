import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import 'react-circular-progressbar/dist/styles.css'

function BudgetTracker() {

    const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar 
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 90 ? '#dc2626' : '#3b82f6',
                    trailColor: '#EEEEEE',
                    textSize: 10,
                    textColor: percentage === 90 ? '#dc2626' : '#3b82f6'
                })}
                text={`${percentage}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button 
                type="button" 
                className="bg-pink-600 w-full text-white font-bold uppercase p-2 rounded-lg hover:bg-pink-800"
                onClick={() => dispatch({type: 'reset-app'})}
            >
                Resetear App
            </button>

            <AmountDisplay 
                label="Presupuesto"
                amount={state.budget}
            />
            <AmountDisplay 
                label="Disponible"
                amount={remainingBudget}
            />
            <AmountDisplay 
                label="Gastado"
                amount={totalExpenses}
            />
        </div>
    </div>

  )
}

export default BudgetTracker