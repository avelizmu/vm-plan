import styles from "./StatsBars.module.css";

type StatsBarsProps = {
    currentCPU: number,
    maxCPU: number,
    currentMemory: number,
    maxMemory: number,
    currentStorage: number,
    maxStorage: number
}

export default function StatsBars({currentCPU, maxCPU, currentMemory, maxMemory, currentStorage, maxStorage}: StatsBarsProps) {
    let cpu = (currentCPU / maxCPU) * 100;
    if(isNaN(cpu)) {
        cpu = 0;
    }

    let memory = (currentMemory / maxMemory) * 100;
    if(isNaN(memory)) {
        memory = 0;
    }

    let storage = (currentStorage / maxStorage) * 100;
    if(isNaN(storage)) {
        storage = 0;
    }


    return <div className={styles.info}>
        <div className={styles.infoEntry}>
            {
                currentCPU >= 0 ? <>
                    <div>
                        CPU Cores:
                        {currentCPU}
                        /
                        {maxCPU}
                    </div>

                    <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: `${cpu}%`}}/>
                </> : <div>
                    <div>
                        CPU Error: Usage of {maxCPU - currentCPU} cores exceeds maximum of {maxCPU} cores
                    </div>
                    <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: '100%', background: 'red'}}/>
                </div>

            }
        </div>

        <div className={styles.infoEntry}>
            {
                currentMemory >= 0 ? <>
                    <div>
                        RAM (GB):
                        {currentMemory}
                        /
                        {maxMemory}
                    </div>

                    <div className={[styles.bar, styles.memoryBar].join(' ')} style={{width: `${memory}%`}}/>
                </> : <div>
                    <div>
                        Memory Error: Usage of {maxMemory - currentMemory}GB exceeds maximum of {maxMemory}GB
                    </div>
                    <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: '100%', background: 'red'}}/>
                </div>
            }
        </div>

        <div className={styles.infoEntry}>
            {
                currentStorage >= 0 ? <>
                    <div>
                        Storage (GB):
                        {currentStorage}
                        /
                        {maxStorage}
                    </div>

                    <div className={[styles.bar, styles.storageBar].join(' ')} style={{width: `${storage}%`}}/>
                </> : <div>
                    <div>
                        Storage Error: Usage of {maxStorage - currentStorage}GB exceeds maximum of {maxStorage}GB
                    </div>
                    <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: '100%', background: 'red'}}/>
                </div>
            }
        </div>
    </div>
}