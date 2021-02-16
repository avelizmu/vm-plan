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
    const [machines, setMachines] = useState<MachineType[]>([]);

    const maxCpu = machines.reduce((acc, curr) => acc + curr.maxCpu, 0)
    const maxMemory = machines.reduce((acc, curr) => acc + curr.maxMemory, 0)
    const maxStorage = machines.reduce((acc, curr) => acc + curr.maxStorage, 0)

    const currentCpu = maxCpu - VMs.filter(vm => !!vm.machine).reduce((acc, curr) => acc + curr.cpu, 0)
    const currentMemory = maxMemory - VMs.filter(vm => !!vm.machine).reduce((acc, curr) => acc + curr.memory, 0)
    const currentStorage = maxStorage - VMs.filter(vm => !!vm.machine).reduce((acc, curr) => acc + curr.storage, 0)

    /**
     * Prompt user input to add a new machine
     */
    function addMachine() {
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
    }

    /**
     * Move the given VM into the given machine
     *
     * @param vm Virtual machine to move
     * @param machine Machine to move it into
     */
    function addVmToMachine(vm: VMType, machine: MachineType) {
        setVMs([
            ...VMs.filter(v => v.name !== vm.name),
            {
                ...vm,
                machine: machine.name
            }
        ])
    }

    /**
     * Delete a VM
     *
     * @param vm VM to delete
     */
    function deleteVm(vm: VMType) {
        setVMs(VMs.filter(v => v.name !== vm.name))
    }

    /**
     * Remove a VM from its machine and return it to the unallocated pool
     *
     * @param vm The VM to remove
     */
    function removeVmFromMachine(vm: VMType) {
        setVMs([...VMs.filter(v => v.name !== vm.name), {
            ...vm,
            machine: undefined
        }])
    }

    /**
     * Delete a machine
     *
     * @param machine Machine to delete
     */
    function deleteMachine(machine: MachineType) {
        setMachines(machines.filter(m => m.name !== machine.name))
    }

    /**
     * Prompt the user to update the parameters of a machine
     *
     * @param machine Machine to update
     */
    function updateMachine(machine: MachineType) {
        const name = prompt('Name of machine:', machine.name);
        if(!name)
            return;

        const cpu = prompt('Max CPU cores:', machine.maxCpu.toString());
        if(!cpu || !parseInt(cpu)) {
            return;
        }

        const memory = prompt('Max RAM in GB:', machine.maxMemory.toString());
        if(!memory || !parseInt(memory)){
            return;
        }

        const storage = prompt('Max storage in GB:', machine.maxStorage.toString());
        if(!storage || !parseInt(storage)){
            return;
        }

        setMachines([...machines.filter(m => m.name !== machine.name), {
            name,
            maxCpu: parseInt(cpu),
            maxMemory: parseInt(memory),
            maxStorage: parseInt(storage)
        }])
    }

    /**
     * Prompt user input to add a new vm
     */
    function addVm() {
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
    }

    return <div>
        <div className={styles.totalUsageLabel}>
            Total Resource Usage:
        </div>
        <StatsBars currentCPU={currentCpu} maxCPU={maxCpu} currentMemory={currentMemory} maxMemory={maxMemory} currentStorage={currentStorage} maxStorage={maxStorage}/>
        <button className={styles.addButton} onClick={addMachine}>
            Add Machine
        </button>
        <div className={styles.machines}>
            {
                machines.map(machine => {
                    return <Machine
                        machine={machine}
                        vms={VMs.filter(vm => vm.machine === machine.name)}
                        onDrop={(vm)=> addVmToMachine(vm, machine)}
                        onDeleteVm={deleteVm}
                        onRemoveVMFromContainer={removeVmFromMachine}
                        onDelete={() => deleteMachine(machine)}
                        onUpdate={() => updateMachine(machine)}/>
                })
            }
        </div>

        <button className={styles.addButton} onClick={addVm}>
            Add VM
        </button>
        <div className={styles.initialVmZone}>
            {
                VMs.filter(vm => !vm.machine).map(vm => <VirtualMachine vm={vm} onDelete={() => setVMs(VMs.filter(v => v.name !== vm.name))} onRemoveFromContainer={() => {}}/>)
            }
        </div>
    </div>
}