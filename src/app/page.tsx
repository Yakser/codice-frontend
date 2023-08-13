import styles from './page.module.scss'
import PasteForm from "@/app/components/PasteForm";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.main__wrapper}>
                <h1 className={styles.main__title}>codice - paste tool</h1>
                <PasteForm/>
            </div>
        </main>
    )
}
