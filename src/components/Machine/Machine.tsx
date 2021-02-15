import {useDrop} from 'react-dnd'
import {DropTargetMonitor} from "react-dnd/lib/interfaces/monitors";
import styles from './Machine.module.css';
import {MachineType as MachineType, VMType} from "../Plan/Plan";
import VirtualMachine from "../VirtualMachine/VirtualMachine";

type MachineProps = {
    machine: MachineType
    onDrop: (item: any, monitor: DropTargetMonitor) => any,
    vms: VMType[],
    onDeleteVm: (vm: VMType) => void,
    onRemoveVMFromContainer: (vm: VMType) => void
}

export default function Machine({machine, onDrop, vms, onDeleteVm, onRemoveVMFromContainer}: MachineProps) {
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
        <div className={styles.title}>
            {machine.name}
        </div>

        <div className={styles.info}>
            <div className={styles.infoEntry}>
                <div>
                    CPU Cores:
                    {currentCPU}
                    /
                    {machine.maxCpu}
                </div>

                <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: `${(currentCPU / machine.maxCpu) * 100}%`}}/>
            </div>

            <div className={styles.infoEntry}>
                <div>
                    RAM (GB):
                    {currentMemory}
                    /
                    {machine.maxMemory}
                </div>

                <div className={[styles.bar, styles.memoryBar].join(' ')} style={{width: `${(currentMemory / machine.maxMemory) * 100}%`}}/>
            </div>

            <div className={styles.infoEntry}>
                <div>
                    Storage (GB):
                    {currentStorage}
                    /
                    {machine.maxStorage}
                </div>

                <div className={[styles.bar, styles.storageBar].join(' ')} style={{width: `${(currentStorage / machine.maxStorage) * 100}%`}}/>
            </div>
        </div>

        <div className={styles.vms}>
            {
                vms.map(vm => <VirtualMachine vm={vm} onDelete={() => onDeleteVm(vm)} onRemoveFromContainer={() => onRemoveVMFromContainer(vm)}/>)
            }
        </div>
    </div>
}