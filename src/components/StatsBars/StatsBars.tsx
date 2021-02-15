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
            <div>
                CPU Cores:
                {currentCPU}
                /
                {maxCPU}
            </div>

            <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: `${cpu}%`}}/>
        </div>

        <div className={styles.infoEntry}>
            <div>
                RAM (GB):
                {currentMemory}
                /
                {maxMemory}
            </div>

            <div className={[styles.bar, styles.memoryBar].join(' ')} style={{width: `${memory}%`}}/>
        </div>

        <div className={styles.infoEntry}>
            <div>
                Storage (GB):
                {currentStorage}
                /
                {maxStorage}
            </div>

            <div className={[styles.bar, styles.storageBar].join(' ')} style={{width: `${storage}%`}}/>
        </div>
    </div>
}