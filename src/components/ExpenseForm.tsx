// Dependencies
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
// Hooks & Types
import { useState, useEffect, ChangeEvent} from 'react';
import { useBudget } from '../hooks/useBudget';
import { DraftExpense, Value } from '../types';
// Datos
import { categories } from "../data/categories"
import ErrorMessage from './ErrorMessage';

function ExpenseForm() {

    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [ error, setError ] = useState('')
    const [ previousAmount, setPreviousAmount ] = useState(0)

    // useBudget
    const { dispatch, state, remainingBudget } = useBudget();

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId )[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId]);

    // Escribir en los inputs (state)
    function handleChange (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        // Detectar si estamos escribiendo en amount
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    // Escribir solo en el input fecha (state)
    function handleChangeDate (value : Value) {
        setExpense({
            ...expense,
            date: value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault();

        // Validar formulario
        if(Object.values(expense).includes('')){
            // Mostrar mensaje de error
            setError('Todos los campos son Obligatorios')

            // Eliminar mensaje de error a los 3 segundos
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }

        // Valida que no me pase del limite
        if((expense.amount - previousAmount) > remainingBudget){
            // Mostrar mensaje de error
            setError('Ese gasto se sale del presupuesto')

            // Eliminar mensaje de error a los 3 segundos
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }

        // Agregar o actualizar el gasto
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', payload: { expense }})
        }
        
        
        // Reiniciar el State
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }


  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        <legend className="uppercase text-center text-2xl font-black border-b-2 border-blue-500">
            {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Nombre Gasto: 
            </label>

            <input 
                type="text" 
                name="expenseName" 
                id="expenseName" 
                placeholder="Añade el Nombre del Gasto"
                className="bg-slate-200 p-2 rounded-lg"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Cantidad: 
            </label>

            <input 
                type="number" 
                name="amount" 
                id="amount" 
                placeholder="Añade la cantidad del gasto"
                className="bg-slate-200 p-2 rounded-lg"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Categoria: 
            </label>

           <select 
            name="category" 
            id="category"
            className="bg-slate-200 p-2 rounded-lg"
            value={expense.category}
            onChange={handleChange}
           >
            <option value="">-- Seleccione --</option>
            {categories.map( category => (

                <option 
                    value={category.id} 
                    key={category.id}
                >
                    {category.name}
                </option>
            ))}
           </select>

           <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Fecha Gasto: 
            </label>

           <DatePicker 
            className="bg-slate-200 p-2 border-0 rounded-lg"
            value={expense.date}
            onChange={handleChangeDate}
           />
          </div>
        </div>

        <input 
            type="submit" 
            value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            className="bg-blue-600 text-white w-full p-2 rounded-lg uppercase font-bold hover:bg-blue-800 transition-all cursor-pointer"
        />
    </form>

  )
}

export default ExpenseForm