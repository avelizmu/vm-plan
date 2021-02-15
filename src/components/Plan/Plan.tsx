import Machine from "../Machine/Machine";
import VirtualMachine from "../VirtualMachine/VirtualMachine";
import {useState} from "react";
import styles from './Plan.module.css';
import StatsBars from "../StatsBars/StatsBars";

export type VMType = {
    name: string,
    cpu: number,
    memory: number,
    storage: number,
    machine?: string
}

export type MachineType = {
    name: string,
    maxCpu: number,
    maxMemory: number,
    maxStorage: number
}


export default function Plan() {
    const [VMs, setVMs] = useState<VMType[]>([]);
    const [machines, setMachines] = useState<MachineType[]>([{
        name: 'zero',
        maxCpu: 24,
        maxMemory: 72,
        maxStorage: 800
    }]);

    const maxCpu = machines.reduce((acc, curr) => acc + curr.maxCpu, 0)
    const maxMemory = machines.reduce((acc, curr) => acc + curr.maxMemory, 0)
    const maxStorage = machines.reduce((acc, curr) => acc + curr.maxStorage, 0)

    const currentCpu = maxCpu - VMs.filter(vm => !!vm.machine).reduce((acc, curr) => acc + curr.cpu, 0)
    const currentMemory = maxMemory - VMs.filter(vm => !!vm.machine).reduce((acc, curr) => acc + curr.memory, 0)
    const currentStorage = maxStorage - VMs.filter(vm => !!vm.machine).reduce((acc, curr) => acc + curr.storage, 0)

    return <div>
        <div className={styles.totalUsageLabel}>
            Total Resource Usage:
        </div>
        <StatsBars currentCPU={currentCpu} maxCPU={maxCpu} currentMemory={currentMemory} maxMemory={maxMemory} currentStorage={currentStorage} maxStorage={maxStorage}/>
        <button className={styles.addButton} onClick={() => {
            const name = prompt('Name of machine:');
            if(!name)
                return;

            const cpu = prompt('Max CPU cores:');
            if(!cpu || !parseInt(cpu)) {
                return;
            }

            const memory = prompt('Max RAM in GB:');
            if(!memory || !parseInt(memory)){
                return;
            }

            const storage = prompt('Max storage in GB:');
            if(!storage || !parseInt(storage)){
                return;
            }

            setMachines([...machines, {
                name,
                maxCpu: parseInt(cpu),
                maxMemory: parseInt(memory),
                maxStorage: parseInt(storage)
            }])
        }}>
            Add Machine
        </button>
        <div className={styles.machines}>
            {
                machines.map(machine => {
                    return <Machine machine={machine} vms={VMs.filter(vm => vm.machine === machine.name)} onDrop={(item)=>{
                        setVMs([
                            ...VMs.filter(vm => vm.name !== item.name),
                            {
                                ...item,
                                machine: machine.name
                            }
                        ])
                    }} onDeleteVm={(vm) => {
                        setVMs(VMs.filter(v => v.name !== vm.name))
                    }} onRemoveVMFromContainer={(vm) => {
                        setVMs([...VMs.filter(v => v.name !== vm.name), {
                            ...vm,
                            machine: undefined
                        }])
                    }}/>
                })
            }
        </div>

        <button className={styles.addButton} onClick={() => {
            const name = prompt('Name of VM:');
            if(!name)
                return;

            const cpu = prompt('CPU cores taken:');
            if(!cpu || !parseInt(cpu)) {
                return;
            }

            const memory = prompt('RAM in GB taken:');
            if(!memory || !parseInt(memory)){
                return;
            }

            const storage = prompt('Storage in GB taken:');
            if(!storage || !parseInt(storage)){
                return;
            }

            setVMs([...VMs, {
                name,
                cpu: parseInt(cpu),
                memory: parseInt(memory),
                storage: parseInt(storage)
            }])
        }}>
            Add VM
        </button>
        <div className={styles.initialVmZone}>
            {
                VMs.filter(vm => !vm.machine).map(vm => <VirtualMachine vm={vm} onDelete={() => setVMs(VMs.filter(v => v.name !== vm.name))} onRemoveFromContainer={() => {}}/>)
            }
        </div>
    </div>
}