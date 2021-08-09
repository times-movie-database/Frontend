import Card from "./Card.js";
import './HomeScreen.css';
export default function HomeScreen(){
    return(
        <div>
            <div className='center'>
            <label htmlFor="menu1" className='fn'>Top 10 in </label>
            <select id='menu1'>
            <option>Genre</option>
            <option>All</option>
        </select>
            </div>
        <div className='grid-container'>
            
        <Card className="card" title="Tenet" rating="4" count='1'>TENET</Card>
        <Card className="card" title="Interstellar" rating="3" count='2'>INTERSTELLAR</Card>
        <Card className="card" title="Tenet" rating="4" count='3'>TENET</Card>
        <Card className="card" title="Interstellar" rating="3" count='4'>INTERSTELLAR</Card>
        <Card className="card" title="Tenet" rating="4" count='5'>TENET</Card>
        <Card className="card" title="Tenet" rating="4" count='6'>TENET</Card>
        <Card className="card" title="Interstellar" rating="3" count='7'>INTERSTELLAR</Card>
        <Card className="card" title="Tenet" rating="4" count='8'>TENET</Card>
        <Card className="card" title="Interstellar" rating="3" count='9'>INTERSTELLAR</Card>
        <Card className="card" title="Tenet" rating="4" count='10'>TENET</Card>
        </div>
        </div>
        
    )
}