export default function AppReducer(state, action){
    switch(action.type){
        case "check":
            return state.map(person => 
                person.id === action.id 
                    ? { ...person, checked: !person.checked }
                    : person
            );
        case "rate":
            return state.map(person => 
                person.id === action.id 
                    ? { ...person, rating: action.rating }
                    : person
            );
        case "delete":
            return state.filter(person => person.id !== action.id);
        case "add": {
            const nextId = state.length ? Math.max(...state.map(p => Number(p.id) || 0)) + 1 : 1;
            const newItem = { id: nextId, checked: false, rating: 0, birthPlace: '', eyeColor: '', ...action.item };
            return [...state, newItem];
        }
        case "edit":
            return state.map(person =>
                person.id === (action.item?.id ?? action.id)
                    ? { ...person, ...action.item }
                    : person
            );
        default:
            return state;
    }
}
