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
    return <div className={styles.info}>
        <div className={styles.infoEntry}>
            <div>
                CPU Cores:
                {currentCPU}
                /
                {maxCPU}
            </div>

            <div className={[styles.bar, styles.cpuBar].join(' ')} style={{width: `${(currentCPU / maxCPU) * 100}%`}}/>
        </div>

        <div className={styles.infoEntry}>
            <div>
                RAM (GB):
                {currentMemory}
                /
                {maxMemory}
            </div>

            <div className={[styles.bar, styles.memoryBar].join(' ')} style={{width: `${(currentMemory / maxMemory) * 100}%`}}/>
        </div>

        <div className={styles.infoEntry}>
            <div>
                Storage (GB):
                {currentStorage}
                /
                {maxStorage}
            </div>

            <div className={[styles.bar, styles.storageBar].join(' ')} style={{width: `${(currentStorage / maxStorage) * 100}%`}}/>
        </div>
    </div>
}