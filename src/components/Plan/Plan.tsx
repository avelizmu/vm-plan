import Machine from "../Machine/Machine";
import VirtualMachine from "../VirtualMachine/VirtualMachine";
import {useState} from "react";
import styles from './Plan.module.css';

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

    return <div>
        <button onClick={() => {
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
                    }}/>
                })
            }
        </div>

        <button onClick={() => {
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
                VMs.filter(vm => !vm.machine).map(vm => <VirtualMachine vm={vm}/>)
            }
        </div>
    </div>
}