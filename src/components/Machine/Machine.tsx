import {useDrop} from 'react-dnd'
import {DropTargetMonitor} from "react-dnd/lib/interfaces/monitors";
import styles from './Machine.module.css';
import {MachineType as MachineType, VMType} from "../Plan/Plan";
import VirtualMachine from "../VirtualMachine/VirtualMachine";
import StatsBars from "../StatsBars/StatsBars";

type MachineProps = {
    machine: MachineType
    onDrop: (item: any, monitor: DropTargetMonitor) => any,
    vms: VMType[],
    onDeleteVm: (vm: VMType) => void,
    onRemoveVMFromContainer: (vm: VMType) => void,
    onDelete: () => void,
    onUpdate: () => void
}

export default function Machine({machine, onDrop, vms, onDeleteVm, onRemoveVMFromContainer, onDelete, onUpdate}: MachineProps) {
    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'vm',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    const currentCPU = machine.maxCpu - vms.reduce((acc, curr) => acc + curr.cpu, 0);
    const currentMemory = machine.maxMemory - vms.reduce((acc, curr) => acc + curr.memory, 0);
    const currentStorage = machine.maxStorage - vms.reduce((acc, curr) => acc + curr.storage, 0);

    return <div ref={drop} className={styles.machine}>
        <div className={styles.topBar}>
            <div className={styles.title}>
                {machine.name}
            </div>
            <div className={["material-icons", styles.editButton].join(' ')} onClick={onUpdate}>edit</div>
        </div>

        <StatsBars currentCPU={currentCPU} maxCPU={machine.maxCpu} currentMemory={currentMemory} maxMemory={machine.maxMemory} currentStorage={currentStorage} maxStorage={machine.maxStorage}/>

        <div className={styles.vms}>
            {
                vms.map(vm => <VirtualMachine vm={vm} onDelete={() => onDeleteVm(vm)} onRemoveFromContainer={() => onRemoveVMFromContainer(vm)}/>)
            }
        </div>
        <button className={styles.deleteButton} onClick={onDelete}>X</button>
    </div>
}