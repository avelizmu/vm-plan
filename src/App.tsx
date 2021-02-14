import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import Plan from "./components/Plan/Plan";

export default function App() {
    return <DndProvider backend={HTML5Backend}>
        <Plan/>
    </DndProvider>

}